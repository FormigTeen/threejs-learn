import { AxesHelper, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three'
import VertexScript from './Scripts/vertex.glsl'
import CircleFragment from './Scripts/circle.glsl'
import SquareFragment from './Scripts/square.glsl'
import { IHasProvider } from '../../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../../Interfaces/IHasMenu'
import Menu from '../Menu'
import { IUniforms } from '../../../../Interfaces/IUniforms'

interface IVertexConfig {
    aVertex: Vector2;
    isActive: boolean;
}

const LIMIT_POW = 16

export default class Table implements IHasProvider<Mesh>, IHasUpdate, IHasMenu {

    protected _material: ShaderMaterial;
    protected _geometry: PlaneGeometry;
    protected _provider: Mesh;

    protected _controls = {
        Raio: 2.5,
        Potencia: 1,
        Modo: 'Circulo',
        'Modo Tabuleiro': false
    }

    protected _modes: Record<string, string> = {
        'Circulo': CircleFragment,
        'Quadrado': SquareFragment
    };

    constructor() {
        this._material = this.getMaterial()
        this._geometry = this.getGeometry();
        this._provider = new Mesh(this._geometry, this._material)

    }

    protected getGeometry()
    {
        return new PlaneGeometry(
            100,
            100,
            10, 10
        )
    }

    protected getMaterial()
    {
        const centers = this.getCenters();
        const uniforms: IUniforms = {
            uRaio: {
                type: 'f',
                value: this.getRaio()
            },
            iPotencia: {
                type: 'f',
                value: this._controls.Potencia
            },
            aCenters: {
                value: [
                    ...centers,
                    ...[...Array(LIMIT_POW * LIMIT_POW - centers.length).keys()].map(() => ({ aVertex: new Vector2(), isActive: false }))
                ]
            }
        }
        return new ShaderMaterial(
            {
                uniforms: uniforms,
                vertexShader: VertexScript,
                fragmentShader: this._modes[this._controls.Modo],
                side: DoubleSide
            }
        );
    }

    getProvider() {
        return this._provider
    }

    onUpdate() {
        this._provider.rotateZ(0.001)
        this._provider.updateMatrix()
        return this;
    }

    getUuid(): string {
        return this._provider.uuid
    }

    onMenu(aMenu: Menu): Menu {
        aMenu.getProvider().add(this._controls, 'Raio', 0.1, 5.0).onChange(
            () => this.onChange()
        )
        aMenu.getProvider().add(this._controls, 'Modo', Object.keys(this._modes)).onChange(
            () => this.onChange()
        )
        aMenu.getProvider().add(this._controls, 'Modo Tabuleiro').onChange(
            () => this.onChange()
        )
        aMenu.getProvider().add(this._controls, 'Potencia', [...Array(LIMIT_POW).keys()].map(_ => _ + 1)).onChange( () => this.onChange())
        return aMenu;
    }

    onChange() {
        this._provider.material = this.getMaterial()
        this._provider.geometry = this.getGeometry()
    }

    public getRaio() {
        return this._controls.Raio / this._controls.Potencia
    }

    public getCenters(): IVertexConfig[] {

        const centers: IVertexConfig[] = [];
        const offSetCircle = this.getRaio() * 2.0;

        const modePair = this._controls.Potencia % 2;


        const getConfigVertex = (x: number, y: number): IVertexConfig => {
            const getOffsetPair = () => this._controls.Potencia % 2 == 0 ? this.getRaio() : 0;
            const isActive = (ownX: number, ownY: number) => {
                if ( !this._controls['Modo Tabuleiro'] )
                    return true;

                if ( this._controls.Potencia % 2 == 0 ) {
                    return Math.abs(ownX + y) % 2 == (ownX * ownY >= 0 ? 1 : 0);
                } else {
                       return (ownX + ownY) % 2 == 0;
                }
                return true;
            }

            const offsetVertexX = x == 0 ? 0 : (Math.abs(x)/x * -1);
            const offsetVertexY = y == 0 ? 0 : (Math.abs(y)/y * -1);
            return {
                aVertex: new Vector2(
                    offSetCircle * x + (offsetVertexX * getOffsetPair()),
                    offSetCircle * y + (offsetVertexY * getOffsetPair()),
                    ),
                isActive: isActive(x, y)
            }
        };

        for (let aPhaseX = 0; aPhaseX < Math.floor(this._controls.Potencia / 2) ; aPhaseX++) {
            if (modePair == 1) {
                centers.push(getConfigVertex(aPhaseX + 1, 0))
                centers.push(getConfigVertex(-(aPhaseX + 1), 0))
                centers.push(getConfigVertex(0, aPhaseX + 1))
                centers.push(getConfigVertex(0, -(aPhaseX + 1)))
            }

            for (let aPhaseY = 0; aPhaseY < Math.floor(this._controls.Potencia / 2) ; aPhaseY++) {
                centers.push(getConfigVertex((aPhaseX + 1), (aPhaseY + 1)))
                centers.push(getConfigVertex(-(aPhaseX + 1), (aPhaseY + 1)))
                centers.push(getConfigVertex(-(aPhaseX + 1), -(aPhaseY + 1)))
                centers.push(getConfigVertex((aPhaseX + 1), -(aPhaseY + 1)))
            }
        }

        if (this._controls.Potencia % 2 == 1) {
            centers.push(getConfigVertex(0, 0));
        }

        return centers;
    }

}
