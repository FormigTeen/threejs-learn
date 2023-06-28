import { GUI } from 'lil-gui';
import type IHasProvider from '../../../Interfaces/IHasProvider';

class Menu implements IHasProvider<GUI> {
  protected _provider: GUI;

  protected _title = 'Sistema Solar';
  constructor(aMenu: IHasProvider<GUI>) {
    this._provider = aMenu.getProvider().addFolder(this._title);
    this._provider.hide();
  }

  getProvider(): GUI {
    return this._provider;
  }
}

export default Menu;
