import {BufferGeometry, DoubleSide, Line, Mesh, PlaneGeometry, ShaderMaterial, Vector2, Vector3} from 'three'
import VertexScript from './Scripts/vertex.glsl'
import BezierFragment from './Scripts/bezier.glsl'
import { IHasProvider } from '../../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../../Interfaces/IHasMenu'
import { IUniforms } from '../../../../Interfaces/IUniforms'
import Menu from './../MainSceneMenu'

interface IVertexConfig {
    aVertex: Vector2;
    isActive: boolean;
}

export default class BezierShader implements IHasProvider<Line>, IHasUpdate, IHasMenu {

    protected _material: ShaderMaterial;
    protected _geometry: BufferGeometry;
    protected _provider: Line;
    protected _vectors: Array<Vector3> = [
        new Vector3(),
        new Vector3(),
        new Vector3(),
        new Vector3()
    ];

    constructor() {
        this._material = this.getMaterial()
        this._geometry = this.getGeometry();
        this._provider = new Line(this._geometry, this._material)

    }

    protected getGeometry()
    {
        return new BufferGeometry().setFromPoints(this.getVectors())
    }

    getVectors() {
        return this._vectors
    }
    protected getMaterial()
    {
        const uniforms: IUniforms = {
            controls: {
                value: this.getVectors()
            }
        }
        return new ShaderMaterial(
            {
                uniforms: uniforms,
                vertexShader: VertexScript,
                fragmentShader: BezierFragment,
            }
        );
    }

    getProvider() {
        return this._provider
    }

    onUpdate() {
        this._provider.geometry = this.getGeometry()
        return this;
    }

    getUuid(): string {
        return this._provider.uuid
    }

    onMenu(aMenu: Menu): Menu {
        return aMenu;
    }

    onChange() {
        this._provider.material = this.getMaterial()
        this._provider.geometry = this.getGeometry()
    }

    setVectors(aVectors: Vector3[]) {
        this._vectors = [
            ...aVectors
        ];
        return this
    }



}
