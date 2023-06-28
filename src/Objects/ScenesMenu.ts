import { GUI } from 'lil-gui';
import Menu from './Menu';

export default class ScenesMenu {
  protected _provider: GUI;

  protected _title = 'Cenas';
  constructor(aMenu: Menu) {
    this._provider = aMenu.getProvider().addFolder(this._title);
    this._provider.open();
  }

  getProvider(): GUI {
    return this._provider;
  }
}
