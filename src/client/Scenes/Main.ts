import  { Scene } from 'three'

export default class Main {

    protected _provider: Scene;

    public constructor() {
        this._provider = new Scene();
    }

    public getProvider()
    {
        return this._provider;
    }

}
