import { GUI } from 'lil-gui'
import Menu from './Menu'

export default class ScenesMenu {


    protected _provider: GUI;

    protected _title: string = "Cenas";
    constructor(aMenu: Menu) {
        this._provider = aMenu.getProvider().addFolder(this._title)
        this._provider.open();
    }

    getProvider() {
        return this._provider
    }
}
