import { GUI } from 'lil-gui';
import type IHasProvider from '../Interfaces/IHasProvider';

export default class Menu implements IHasProvider<GUI> {
  protected _provider: GUI;
  constructor() {
    this._provider = new GUI();
    this._provider.title('Configurações');
    this._provider.open();
  }

  getProvider(): GUI {
    return this._provider;
  }
}
