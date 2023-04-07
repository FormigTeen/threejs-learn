import { GUI } from 'lil-gui'

export default class Menu {


    protected _provider: GUI;
    constructor() {
        this._provider = new GUI()
        this._provider.open();
    }

    getProvider() {
        return this._provider
    }
}
