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
export default class BezierGeometry implements IHasProvider<Line>, IHasUpdate, IHasMenu {

    protected _provider: Line;

    protected _vectors: Array<Vector3> = [];

    constructor() {
        this._provider 	= new Line(
            this.getGeometry(),
            new LineBasicMaterial( {color: 0xff0000})
        );
    }

    getProvider() {
        return this._provider
    }

    getVectors() {
        return this._vectors;
    }

    getCurve() {
        return new CubicBezierCurve3(
            this.getVectors()[0],
            this.getVectors()[1],
            this.getVectors()[2],
            this.getVectors()[3]
        );
    }
    getGeometry() {
        return new BufferGeometry().setFromPoints(this.getCurve().getPoints(50))
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
