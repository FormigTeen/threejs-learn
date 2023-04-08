import { GUI } from 'lil-gui'
import { IHasProvider } from '../../../Interfaces/IHasProvider'

export default class Menu implements IHasProvider<GUI> {


    protected _provider: GUI;

    protected _title: string = "Tabuleiro";
    constructor(aMenu: IHasProvider<GUI>) {
        this._provider = aMenu.getProvider().addFolder(this._title)
        this._provider.open();
    }

    getProvider() {
        return this._provider
    }
}
