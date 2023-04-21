import  { Scene } from 'three'
import { IHasProvider } from '../../Interfaces/IHasProvider'
import IHasMenu from '../../Interfaces/IHasMenu'
import MainSceneMenu from './Objects/MainSceneMenu'
import { GUI } from 'lil-gui'
import Ground from './Objects/Ground/Ground'
import { IHasUpdate } from '../../Interfaces/IHasUpdate'
import IScene from '../../Interfaces/IScene'
import Application from '../../Application'
import Camera from './Objects/Camera'

export default class BezierScene implements IScene, IHasMenu, IHasUpdate {

    protected _provider: Scene;
    protected _menu?: MainSceneMenu;
    protected _camera: Camera;


    public constructor() {

        this._provider = new Scene();
        this._provider.name = "Bezier";
        this._camera = new Camera()


    }

    public getProvider()
    {
        return this._provider;
    }

    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
        if ( !this._menu ) {
            this._menu = new MainSceneMenu(aMenu);
            this._camera.onMenu(this._menu)
        }
        return this._menu;
    }

    getUuid(): string {
        return this.getProvider().uuid;
    }

    onUpdate(): unknown {
        return this
    }

    onUnload() {
        this._menu?.getProvider().hide();
        return this;
    }

    onLoad(aLoader: unknown) {
        this._menu?.getProvider().show();
        if ( aLoader instanceof Application )
            aLoader.setCamera(this._camera)
        return this;
    }

}
