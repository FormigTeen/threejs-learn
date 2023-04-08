import  { Scene } from 'three'
import IScene from '../../Interfaces/IScene'
import Table from './Objects/Table/Table'
import Camera from './Objects/Camera'
import Application from '../../Application'
import IHasMenu from '../../Interfaces/IHasMenu'
import { IHasProvider } from '../../Interfaces/IHasProvider'
import { GUI } from 'lil-gui'
import Menu from './Objects/Menu'

export default class TableScene implements IScene, IHasMenu {

    protected _provider: Scene;

    protected _table: Table;
    protected _camera: Camera;

    protected _menu?: Menu;

    public constructor() {
        this._provider = new Scene();
        this._provider.name = "Tabuleiro"

        this._table = new Table();
        this._provider.add(this._table.getProvider())

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
            this._table.onMenu(this._menu)
            this._camera.onMenu(this._menu)
        }
        return this._menu;
    }

}
