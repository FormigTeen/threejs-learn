import { OrthographicCamera, PerspectiveCamera, WebGLRenderer } from 'three';
import type IHasProvider from './Interfaces/IHasProvider';
import { isHasUpdate, type IUpdateProp } from './Interfaces/IHasUpdate';
import type IHasUpdate from './Interfaces/IHasUpdate';
import { isHasMenu } from './Interfaces/IHasMenu';
import type IHasMenu from './Interfaces/IHasMenu';
import { Controller, GUI } from 'lil-gui';
import type IScene from './Interfaces/IScene';
import Menu from './Objects/Menu';

export default class Application implements IHasMenu {
  protected _provider: WebGLRenderer;
  protected _scene?: IScene;
  protected _scenes: Array<IScene> = [];
  protected _menu?: Menu;

  protected _sceneOption?: Controller;

  protected _controls = {
    Cena: '',
    BackupCena: '',
  };

  protected _camera?:
    | IHasProvider<PerspectiveCamera>
    | IHasProvider<OrthographicCamera>;

  protected _updatesStack: Record<string, (_: IUpdateProp) => unknown> = {};

  public constructor() {
    this._provider = new WebGLRenderer();
    this._provider.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this._provider.domElement);
    window.addEventListener('resize', () => this.onResize(), false);
  }

  onBoot(): void {
    this.onRender();
    requestAnimationFrame((_) => this.onAnimate(_));
  }
  onAnimate(clock: number): void {
    this.onUpdate(clock);
    requestAnimationFrame((_) => this.onAnimate(_));
  }
  onResize(): void {
    this._provider.setSize(window.innerWidth, window.innerHeight);
    this.onRender();
  }

  addScene(aScene: IScene): Application {
    if (isHasMenu(aScene) && this._menu) {
      aScene.onMenu(this._menu);
    }
    this._scenes = [...this._scenes, aScene];
    if (!this._controls.Cena) {
      this._controls.Cena = aScene.getProvider().name;
      this.onChangeScene();
      this._controls.BackupCena = this._controls.Cena;
    }
    if (isHasUpdate(aScene)) {
      this.registerUpdate(aScene);
    }
    return this;
  }

  setCamera(
    aCamera: IHasProvider<PerspectiveCamera> | IHasProvider<OrthographicCamera>,
  ): Application {
    this._camera = aCamera;
    return this;
  }

  onRender(): Application {
    if (!!this._scene && !!this._camera) {
      this.getProvider().render(
        this._scene.getProvider(),
        this._camera.getProvider(),
      );
    }
    return this;
  }

  getProvider(): WebGLRenderer {
    return this._provider;
  }

  registerUpdate(aObject: IHasUpdate): Application {
    const key = aObject.getUuid();
    this._updatesStack = {
      ...this._updatesStack,
      [key]: (_: IUpdateProp) => aObject.onUpdate(_),
    };
    return this;
  }

  onUpdate(aClock: number): void {
    Object.keys(this._updatesStack)
      .map((_) => this._updatesStack[_])
      .map((_) =>
        _({
          getApplication: () => this,
          getClock: () => aClock,
        }),
      );
    this._scene = this._scenes.find(
      (_) => _.getProvider().name === this._controls['Cena'],
    );
    this.onRender();
  }

  onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
    if (!this._sceneOption) {
      this._sceneOption = aMenu
        .getProvider()
        .add(
          this._controls,
          'Cena',
          this._scenes.map((_) => _.getProvider().name),
        )
        .onChange(() => this.onChangeScene());
    } else {
      this._sceneOption.options(this._scenes.map((_) => _.getProvider().name));
    }
    return aMenu;
  }

  public onChangeScene(): void {
    this._scenes
      .find((_) => _.getProvider().name === this._controls['BackupCena'])
      ?.onUnload(this);
    this._controls.BackupCena = this._controls.Cena;
    this._scenes
      .find((_) => _.getProvider().name === this._controls['Cena'])
      ?.onLoad(this);
  }

  public useMenu(): Application {
    if (!this._menu) this._menu = new Menu();
    return this;
  }

  public onFuncMenu(
    aCallable: (aMenu: Menu, aApp: Application) => unknown,
  ): Application {
    if (this._menu) aCallable(this._menu, this);
    return this;
  }
}
