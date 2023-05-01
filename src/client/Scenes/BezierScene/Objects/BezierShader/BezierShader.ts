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
        return new BufferGeometry().setFromPoints(this.getVertices())
    }

    getVectors() {
        return this._vectors.map(_ => _.clone()).map(_ => {
            _.y = _.y * -1;
            return _;
        })
    }

    getVertices(quantity: number = 20) {
        const groupVertices = [...Array(quantity + 1).keys()]
            .map(_ => [
                this.getVector(this.getVectors()[0], this.getVectors()[1]).multiplyScalar(_ / quantity).add(this.getVectors()[0]),
                this.getVector(this.getVectors()[1], this.getVectors()[2]).multiplyScalar(_ / quantity).add(this.getVectors()[1]),
                this.getVector(this.getVectors()[2], this.getVectors()[3]).multiplyScalar(_ / quantity).add(this.getVectors()[2])
            ])
        return [
            ...groupVertices.map(_ => _[0]),
            ...groupVertices.map(_ => _[1]),
            ...groupVertices.map(_ => _[2]),
        ];
    }

    getVector(origin: Vector3, end: Vector3) {
        return end.clone().sub(origin)
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
        this._provider.material = this.getMaterial()
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
