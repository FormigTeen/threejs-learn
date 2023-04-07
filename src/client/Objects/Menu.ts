import { GUI } from 'lil-gui'

export default class Menu {


    protected _provider: GUI;
    protected _controls = {
        Amplitude 	: 1.0
    }
    constructor() {
        this._provider = new GUI()
        this._provider.add(this._controls, 'Amplitude', 0.1, 20.0)
        this._provider.open();
    }

    getProvider() {
        return this._provider
    }
}
