import { AxesHelper, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three'
import VertexScript from './Scripts/vertex.sdx'
import FragmentScript from './Scripts/fragment.sdx'
import { IHasProvider } from '../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../Interfaces/IHasUpdate'
import IHasMenu from '../../Interfaces/IHasMenu'
import Menu from '../Menu'
export default class Ground implements IHasProvider<Mesh>, IHasUpdate, IHasMenu {

    protected _material: ShaderMaterial;
    protected _geometry: PlaneGeometry;
    protected _provider: Mesh;
    protected _axes: AxesHelper;

    protected _controls = {
        Amplitude 	: 1.0
    }

    constructor() {
        this._material = this.getMaterial()
        this._geometry = new PlaneGeometry(
            100,
            100,
            30, 30
        )
        this._provider = new Mesh(this._geometry, this._material)
        this._provider.rotateX(-90.0 * Math.PI / 180.0);

        this._axes = new AxesHelper(8.0)
        this._axes.position.y = 0.2;
        this._axes.updateMatrix();
        this._provider.add(this._axes)
    }

    protected getMaterial()
    {
        const uAmp = {
            type: 'f',
            value: this._controls.Amplitude
        };
        return new ShaderMaterial(
            {
                uniforms: {
                    uAmp: uAmp
                },
                vertexShader: VertexScript,
                fragmentShader: FragmentScript,
                wireframe: true,
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
        aMenu.getProvider().add(this._controls, 'Amplitude', 0.1, 20.0).onChange(
            () => this.onChange()
        )
        return aMenu;
    }

    onChange() {
        this._provider.material = this.getMaterial()
    }

}
