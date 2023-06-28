import { AxesHelper, Vector3, Object3D } from 'three';
import type IHasProvider from '../../../../../../Interfaces/IHasProvider';
import type IHasUpdate from '@/Interfaces/IHasUpdate';
import type IHasMenu from '../../../../../../Interfaces/IHasMenu';
import Menu from '../../../Menu';
import Earth from './Objects/Earth';
import Moon from './Objects/Moon';

class EarthSystem implements IHasProvider<Object3D>, IHasUpdate, IHasMenu {
  protected _provider: Object3D;
  protected _axis: AxesHelper;
  protected _earth: Earth;
  protected _moon: Moon;
  protected _controls = {
    velocity: 0.03,
  };

  constructor() {
    this._provider = new Object3D();
    this._axis = new AxesHelper(50);
    this._earth = new Earth();
    this._moon = new Moon();

    this._provider.add(this._earth.getProvider());
    this._provider.add(this._moon.getProvider());
    this._provider.add(this._axis);
    this._moon.getProvider().position.x = 3;
    this._provider.rotateOnAxis(
      new Vector3(-0.5, -1, -1).normalize(),
      -Math.PI / 4,
    );
  }

  getProvider(): Object3D {
    return this._provider;
  }

  onUpdate(): EarthSystem {
    this._moon.onUpdate();
    this._earth.onUpdate();
    this._provider.rotateY(this._controls.velocity);
    return this;
  }

  getUuid(): string {
    return this._provider.uuid;
  }

  onMenu(aMenu: Menu): Menu {
    return aMenu;
  }
}

export default EarthSystem;
