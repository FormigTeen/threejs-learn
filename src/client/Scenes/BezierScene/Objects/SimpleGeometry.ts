import {
    AxesHelper,
    BufferGeometry,
    CubicBezierCurve3,
    Line, LineBasicMaterial,
    Vector3
} from 'three'
import { IHasProvider } from '../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../Interfaces/IHasMenu'
import MainSceneMenu from './MainSceneMenu'
export default class SimpleGeometry implements IHasProvider<Line>, IHasUpdate, IHasMenu {

    protected _provider: Line;

    protected _controls = {}

    protected _vectors: Array<Vector3> = [];

    constructor() {
        this._provider 	= new Line(
            this.getGeometry(),
            new LineBasicMaterial( {color: 0xFFFFFF})
        );
    }

    getProvider() {
        return this._provider
    }

    getVectors() {
        return this._vectors;
    }

    getGeometry() {
        return new BufferGeometry().setFromPoints(this.getVectors())
    }

    onUpdate() {
        this._provider.geometry = this.getGeometry()
        return this;
    }

    getUuid(): string {
        return this._provider.uuid
    }

    onMenu(aMenu: MainSceneMenu): MainSceneMenu {
        return aMenu;
    }

    onChange() {
    }

    setVectors(aVectors: Vector3[]) {
        this._vectors = [
            ...aVectors
        ];
        return this
    }

}
