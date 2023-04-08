import { AxesHelper, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three'
import VertexScript from './Scripts/vertex.glsl'
import FragmentScript from './Scripts/fragment.glsl'
import { IHasProvider } from '../../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../../Interfaces/IHasMenu'
import MainSceneMenu from '../MainSceneMenu'
import { IUniforms } from '../../../../Interfaces/IUniforms'
export default class Table implements IHasProvider<Mesh>, IHasUpdate, IHasMenu {

    protected _material: ShaderMaterial;
    protected _geometry: PlaneGeometry;
    protected _provider: Mesh;

    protected _controls = {
        Raio: 1.5,
    }

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
        const uniforms: IUniforms = {
            uRaio: {
                type: 'f',
                value: this._controls.Raio
            },
        }
        return new ShaderMaterial(
            {
                uniforms: uniforms,
                vertexShader: VertexScript,
                fragmentShader: FragmentScript,
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

    onMenu(aMenu: MainSceneMenu): MainSceneMenu {
        aMenu.getProvider().add(this._controls, 'Raio', 0.1, 20.0).onChange(
            () => this.onChange()
        )


        return aMenu;
    }

    onChange() {
        this._provider.material = this.getMaterial()
        this._provider.geometry = this.getGeometry()
    }

}
