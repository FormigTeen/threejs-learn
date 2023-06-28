import {
  BufferGeometry,
  CubicBezierCurve3,
  Line,
  LineBasicMaterial,
  Vector3,
} from 'three';
import type IHasProvider from '../../../Interfaces/IHasProvider';
import type IHasUpdate from '@/Interfaces/IHasUpdate';
import type IHasMenu from '../../../Interfaces/IHasMenu';
import MainSceneMenu from './MainSceneMenu';
class BezierGeometry implements IHasProvider<Line>, IHasUpdate, IHasMenu {
  protected _provider: Line;

  protected _vectors: Array<Vector3> = [];

  constructor() {
    this._provider = new Line(
      this.getGeometry(),
      new LineBasicMaterial({ color: 0xff0000 }),
    );
  }

  getProvider(): Line {
    return this._provider;
  }

  getVectors(): Vector3[] {
    return this._vectors;
  }

  getCurve(): CubicBezierCurve3 {
    return new CubicBezierCurve3(
      this.getVectors()[0],
      this.getVectors()[1],
      this.getVectors()[2],
      this.getVectors()[3],
    );
  }
  getGeometry(): BufferGeometry {
    return new BufferGeometry().setFromPoints(this.getCurve().getPoints(50));
  }

  onUpdate(): BezierGeometry {
    this._provider.geometry = this.getGeometry();
    return this;
  }

  getUuid(): string {
    return this._provider.uuid;
  }

  onMenu(aMenu: MainSceneMenu): MainSceneMenu {
    return aMenu;
  }

  setVectors(aVectors: Vector3[]): BezierGeometry {
    this._vectors = [...aVectors];
    return this;
  }
}

export default BezierGeometry;
