import { PerspectiveCamera } from 'three';
import type IHasProvider from '../../../Interfaces/IHasProvider';
import type IHasMenu from '../../../Interfaces/IHasMenu';
import { GUI } from 'lil-gui';

class Camera implements IHasProvider<PerspectiveCamera>, IHasMenu {
  protected _provider: PerspectiveCamera;

  protected _size = 10.0;

  public constructor() {
    this._provider = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      200,
    );
    this._provider.position.z = 30;
    this._provider.position.y = 30;
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
    this._provider.updateProjectionMatrix();
  }

  onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
    return aMenu;
  }
}

export default Camera;
