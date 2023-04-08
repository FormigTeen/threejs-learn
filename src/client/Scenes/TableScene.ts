import  { Scene } from 'three'
import { IHasProvider } from '../Interfaces/IHasProvider'
import IScene from '../Interfaces/IScene'

export default class TableScene implements IScene {

    protected _provider: Scene;

    public constructor() {
        this._provider = new Scene();
        this._provider.name = "Tabuleiro"
    }

    public getProvider()
    {
        return this._provider;
    }

    onLoad() {
        return this;
    }

    onUnload() {
        return this;
    }

}
