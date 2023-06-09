import { Scene } from 'three';
import type IHasProvider from '../../Interfaces/IHasProvider';
import type IHasMenu from '../../Interfaces/IHasMenu';
import MainSceneMenu from './Objects/MainSceneMenu';
import { GUI } from 'lil-gui';
import Ground from './Objects/Ground/Ground';
import type IHasUpdate from '@/Interfaces/IHasUpdate';
import type IScene from '../../Interfaces/IScene';
import Application from '../../Application';
import Camera from './Objects/Camera';

export default class GroundScene implements IScene, IHasMenu, IHasUpdate {
  protected _provider: Scene;
  protected _menu?: MainSceneMenu;
  protected _camera: Camera;

  protected _ground: Ground;

  public constructor() {
    this._provider = new Scene();
    this._provider.name = 'Malha';
    this._camera = new Camera();

    this._ground = new Ground();
    this._provider.add(this._ground.getProvider());
  }

  public getProvider(): Scene {
    return this._provider;
  }

  onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
    if (!this._menu) {
      this._menu = new MainSceneMenu(aMenu);
      this._ground.onMenu(this._menu);
      this._camera.onMenu(this._menu);
    }
    return this._menu;
  }

  getUuid(): string {
    return this.getProvider().uuid;
  }

  onUpdate(): unknown {
    return this._ground.onUpdate();
  }

  onUnload(): GroundScene {
    this._menu?.getProvider().hide();
    return this;
  }

  onLoad(aLoader: unknown): GroundScene {
    this._menu?.getProvider().show();
    if (aLoader instanceof Application) aLoader.setCamera(this._camera);
    return this;
  }
}
