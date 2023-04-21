import { GUI } from 'lil-gui'
import Menu from '../../../Objects/Menu'
import { IHasProvider } from '../../../Interfaces/IHasProvider'

export default class MainSceneMenu implements IHasProvider<GUI> {


    protected _provider: GUI;

    protected _title: string = "Malha";
    constructor(aMenu: IHasProvider<GUI>) {
        this._provider = aMenu.getProvider().addFolder(this._title)
        this._provider.hide();
    }

    getProvider() {
        return this._provider
    }
}
