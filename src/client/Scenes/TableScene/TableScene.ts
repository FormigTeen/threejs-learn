import  { Scene } from 'three'
import IScene from '../../Interfaces/IScene'
import Table from './Objects/Table/Table'
import Camera from './Objects/Camera'
import Application from '../../Application'

export default class TableScene implements IScene {

    protected _provider: Scene;

    protected _table: Table;
    protected _camera: Camera;

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
        if ( aLoader instanceof Application )
            aLoader.setCamera(this._camera)
        return this;
    }

    onUnload() {
        return this;
    }

}
