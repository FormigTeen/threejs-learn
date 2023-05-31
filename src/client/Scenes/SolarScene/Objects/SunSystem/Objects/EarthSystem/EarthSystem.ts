import {
    AxesHelper,
    Mesh,
    MeshBasicMaterial, Object3D,
    SphereGeometry, Vector3,
} from 'three'
import { IHasProvider } from '../../../../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../../../../Interfaces/IHasMenu'
import Menu from '../../../Menu'
import Earth from "./Objects/Earth";
import Moon from "./Objects/Moon";

export default class EarthSystem implements IHasProvider<Object3D>, IHasUpdate, IHasMenu {

    protected _provider: Object3D;
    protected _axis: AxesHelper;
    protected _earth: Earth;
    protected _moon: Moon;
    protected _controls = {
        velocity: 0.030
    }

    constructor() {
        this._provider = new Object3D();
        this._axis = new AxesHelper( 50 );
        this._earth = new Earth()
        this._moon = new Moon()

        this._provider.add(this._earth.getProvider())
        this._provider.add(this._moon.getProvider())
        this._provider.add(this._axis)
        this._moon.getProvider().position.x = 3
        this._provider.rotateOnAxis(new Vector3(-0.5, -1, -1).normalize(), -Math.PI/4);
    }

    getProvider() {
        return this._provider
    }

    onUpdate() {
        this._moon.onUpdate()
        this._earth.onUpdate()
        this._provider.rotateY(this._controls.velocity)
        return this;
    }

    getUuid(): string {
        return this._provider.uuid
    }

    onMenu(aMenu: Menu): Menu {
        return aMenu;
    }

    onChange() {
    }

}
