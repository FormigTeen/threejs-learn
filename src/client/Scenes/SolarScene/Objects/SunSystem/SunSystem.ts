import {
    AxesHelper, Object3D, Vector3
} from 'three'
import { IHasProvider } from '../../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../../Interfaces/IHasMenu'
import Menu from './../Menu'
import EarthSystem from "./Objects/EarthSystem/EarthSystem";
import Sun from "./Objects/Sun";

export default class SunSystem implements IHasProvider<Object3D>, IHasUpdate, IHasMenu {

    protected _provider: Object3D;
    protected _axis: AxesHelper;
    protected _sun: Sun;
    protected _earthSystem: EarthSystem;
    protected _controls = {
        velocity: 0.001
    }

    constructor() {
        this._provider = new Object3D();
        this._axis = new AxesHelper( 50 );
        this._earthSystem = new EarthSystem()
        this._sun = new Sun()

        this._provider.add(this._earthSystem.getProvider())
        this._provider.add(this._sun.getProvider())
        this._provider.add(this._axis)
        this._earthSystem.getProvider().position.x = 35
        this._provider.rotateOnAxis(new Vector3(-0.5, -0.5, 1).normalize(), -Math.PI/4);
    }

    getProvider() {
        return this._provider
    }

    onUpdate() {
        this._earthSystem.onUpdate()
        this._sun.onUpdate()
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
