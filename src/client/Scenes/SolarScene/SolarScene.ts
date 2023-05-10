import  { Scene } from 'three'
import IScene from '../../Interfaces/IScene'
import Camera from './Objects/Camera'
import Application from '../../Application'
import IHasMenu from '../../Interfaces/IHasMenu'
import { IHasProvider } from '../../Interfaces/IHasProvider'
import { GUI } from 'lil-gui'
import Menu from './Objects/Menu'
import Sun from "./Objects/Sun";

export default class SolarScene implements IScene, IHasMenu {

    protected _provider: Scene;

    protected _sun: Sun;

    protected _camera: Camera;

    protected _menu?: Menu;

    public constructor() {
        this._provider = new Scene();
        this._provider.name = "Sistema Solar"

        this._sun = new Sun();
        this._provider.add(this._sun.getProvider())

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

}
