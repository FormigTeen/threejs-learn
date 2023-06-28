import { PerspectiveCamera } from 'three';
import type IHasProvider from '../../../Interfaces/IHasProvider';
import type IHasMenu from '../../../Interfaces/IHasMenu';
import { GUI } from 'lil-gui';

class Camera implements IHasProvider<PerspectiveCamera>, IHasMenu {
  protected _provider: PerspectiveCamera;

  protected _controls = {
    Distancia: 100,
  };

  public constructor() {
    this._provider = new PerspectiveCamera(
      70.0,
      window.innerWidth / window.innerHeight,
      0.01,
      1000.0,
    );
    this._provider.position.y = 2.0;
    this._provider.position.z = this._controls.Distancia;
    this._provider.updateProjectionMatrix();
    window.addEventListener('resize', () => this.onResize(), false);
  }

  getProvider(): PerspectiveCamera {
    return this._provider;
  }

  onResize(): void {
    this.onUpdate();
    this._provider.updateProjectionMatrix();
  }

  onUpdate(): void {
    this._provider.aspect = window.innerWidth / window.innerHeight;
    this._provider.position.z = this._controls.Distancia;
  }

  onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
    aMenu
      .getProvider()
      .add(this._controls, 'Distancia', 0, 100)
      .onChange(() => this.onUpdate());
    return aMenu;
  }
}

export default Camera;
