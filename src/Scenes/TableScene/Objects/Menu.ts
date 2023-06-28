import { GUI } from 'lil-gui';
import type IHasProvider from '@/Interfaces/IHasProvider';

export default class Menu implements IHasProvider<GUI> {
  protected _provider: GUI;

  protected _title = 'Tabuleiro';
  constructor(aMenu: IHasProvider<GUI>) {
    this._provider = aMenu.getProvider().addFolder(this._title);
    this._provider.hide();
  }

  getProvider(): GUI {
    return this._provider;
  }
}
