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

class Moon implements IHasProvider<Object3D>, IHasUpdate, IHasMenu {
  protected _provider: Object3D;
  protected _entity: Mesh;
  protected _axis: AxesHelper;
  protected _controls = {
    velocity: 0.05,
  };

  constructor() {
    this._entity = new Mesh(
      new SphereGeometry(0.5, 5, 5),
      new MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true }),
    );
    this._provider = new Object3D();
    this._axis = new AxesHelper(10);

    this._provider.add(this._entity);
    this._provider.add(this._axis);
    this._entity.rotateOnAxis(new Vector3(-1, 1, 1).normalize(), -Math.PI / 4);
  }

  getProvider(): Object3D {
    return this._provider;
  }

  onUpdate(): Moon {
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

export default Moon;
