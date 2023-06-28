import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from 'three';
import type IHasProvider from '../../../Interfaces/IHasProvider';
import type IHasUpdate from '@/Interfaces/IHasUpdate';
import type IHasMenu from '../../../Interfaces/IHasMenu';
import MainSceneMenu from './MainSceneMenu';
class SimpleGeometry implements IHasProvider<Line>, IHasUpdate, IHasMenu {
  protected _provider: Line;

  protected _vectors: Array<Vector3> = [];

  constructor() {
    this._provider = new Line(
      this.getGeometry(),
      new LineBasicMaterial({ color: 0xffffff }),
    );
  }

  getProvider(): Line {
    return this._provider;
  }

  getVectors(): Vector3[] {
    return this._vectors;
  }

  getGeometry(): BufferGeometry {
    return new BufferGeometry().setFromPoints(this.getVectors());
  }

  onUpdate(): SimpleGeometry {
    this._provider.geometry = this.getGeometry();
    return this;
  }

  getUuid(): string {
    return this._provider.uuid;
  }

  onMenu(aMenu: MainSceneMenu): MainSceneMenu {
    return aMenu;
  }

  setVectors(aVectors: Vector3[]): SimpleGeometry {
    this._vectors = [...aVectors];
    return this;
  }
}

export default SimpleGeometry;
