import  { Scene } from 'three'
import IScene from '../../Interfaces/IScene'
import Camera from './Objects/Camera'
import Application from '../../Application'
import IHasMenu from '../../Interfaces/IHasMenu'
import { IHasProvider } from '../../Interfaces/IHasProvider'
import { GUI } from 'lil-gui'
import Menu from './Objects/Menu'
import Sun from "./Objects/SunSystem/Objects/Sun";
import {IHasUpdate} from "../../Interfaces/IHasUpdate";
import EarthSystem from "./Objects/SunSystem/Objects/EarthSystem/EarthSystem";
import SunSystem from "./Objects/SunSystem/SunSystem";

export default class SolarScene implements IScene, IHasMenu, IHasUpdate {

    protected _provider: Scene;

    protected _sunSystem: SunSystem;

    protected _camera: Camera;

    protected _menu?: Menu;

    public constructor() {
        this._provider = new Scene();
        this._provider.name = "Sistema Solar"

        this._sunSystem = new SunSystem();

        this._provider.add(this._sunSystem.getProvider())

        this._camera = new Camera()
    }

    public getProvider()
    {
        return this._provider;
    }

    onLoad(aLoader: unknown) {
        this._menu?.getProvider().show();
        if ( aLoader instanceof Application )
            aLoader.setCamera(this._camera)
        return this;
    }

    onUnload() {
        this._menu?.getProvider().hide();
        return this;
    }

    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
        if ( !this._menu ) {
            this._menu = new Menu(aMenu);
            this._camera.onMenu(this._menu)
        }
        return this._menu;
    }

    onUpdate(): unknown {
        this._sunSystem.onUpdate()
        return this
    }

    getUuid(): string {
        return this._provider.uuid
    }

}
