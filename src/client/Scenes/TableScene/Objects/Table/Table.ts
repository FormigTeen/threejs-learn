import { AxesHelper, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three'
import VertexScript from './Scripts/vertex.glsl'
import CircleFragment from './Scripts/circle.glsl'
import SquareFragment from './Scripts/square.glsl'
import { IHasProvider } from '../../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../../Interfaces/IHasMenu'
import Menu from '../Menu'
import { IUniforms } from '../../../../Interfaces/IUniforms'
export default class Table implements IHasProvider<Mesh>, IHasUpdate, IHasMenu {

    protected _material: ShaderMaterial;
    protected _geometry: PlaneGeometry;
    protected _provider: Mesh;

    protected _controls = {
        Raio: 2.5,
        Potencia: 1,
        Modo: 'Circulo'
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

    protected getCenters()
    {
        return [...Array(Math.pow(2, this._controls.Potencia))]
            .keys()
    }
    protected getMaterial()
    {
        const uniforms: IUniforms = {
            uRaio: {
                type: 'f',
                value: this._controls.Raio / (this._controls.Potencia)
            },
            iPotencia: {
                type: 'f',
                value: this._controls.Potencia
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
        aMenu.getProvider().add(this._controls, 'Potencia', [...Array(16).keys()].map(_ => _ + 1)).onChange( () => this.onChange())
        return aMenu;
    }

    onChange() {
        this._provider.material = this.getMaterial()
        this._provider.geometry = this.getGeometry()
    }

}
