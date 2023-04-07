import  { Scene } from 'three'
import { IHasProvider } from '../Interfaces/IHasProvider'

export default class Main implements IHasProvider<Scene> {

    protected _provider: Scene;

    public constructor() {
        this._provider = new Scene();
    }

    public getProvider()
    {
        return this._provider;
    }

}
