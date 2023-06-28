import {
  AxesHelper,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  SphereGeometry,
  Vector3,
} from 'three';
import type IHasProvider from '../../../../../../../Interfaces/IHasProvider';
import type IHasUpdate from '@/Interfaces/IHasUpdate';
import type IHasMenu from '../../../../../../../Interfaces/IHasMenu';
import Menu from '../../../../Menu';

class Earth implements IHasProvider<Object3D>, IHasUpdate, IHasMenu {
  protected _provider: Object3D;
  protected _axis: AxesHelper;
  protected _entity: Mesh;
  protected _controls = {
    velocity: 0.03,
  };

  constructor() {
    this._entity = new Mesh(
      new SphereGeometry(1.0, 10, 10),
      new MeshBasicMaterial({ color: 0x0000ff, wireframe: true }),
    );
    this._provider = new Object3D();
    this._axis = new AxesHelper(10);

    this._provider.add(this._entity);
    this._provider.add(this._axis);
    this._provider.rotateOnAxis(
      new Vector3(-1, -1, -1).normalize(),
      -Math.PI / 4,
    );
  }

  getProvider(): Object3D {
    return this._provider;
  }

  onUpdate(): Earth {
    this._provider.rotateX(this._controls.velocity);
    return this;
  }

  getUuid(): string {
    return this._provider.uuid;
  }

  onMenu(aMenu: Menu): Menu {
    return aMenu;
  }
}

export default Earth;
