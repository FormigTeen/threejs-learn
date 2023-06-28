import { BufferGeometry, Line, ShaderMaterial, Vector3 } from 'three';
import VertexScript from './Scripts/vertex.glsl';
import BezierFragment from './Scripts/bezier.glsl';
import type IHasProvider from '../../../../Interfaces/IHasProvider';
import type IHasUpdate from '@/Interfaces/IHasUpdate';
import type IHasMenu from '../../../../Interfaces/IHasMenu';
import { type IUniforms } from '@/Interfaces/IUniforms';
import Menu from '../MainSceneMenu';

class BezierShader implements IHasProvider<Line>, IHasUpdate, IHasMenu {
  protected _material: ShaderMaterial;
  protected _geometry: BufferGeometry;
  protected _provider: Line;
  protected _vectors: Array<Vector3> = [
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
  ];

  constructor() {
    this._material = this.getMaterial();
    this._geometry = this.getGeometry();
    this._provider = new Line(this._geometry, this._material);
  }

  protected getGeometry(): BufferGeometry {
    return new BufferGeometry().setFromPoints(this.getVertices());
  }

  getVectors(): Vector3[] {
    return this._vectors
      .map((_) => _.clone())
      .map((_) => {
        _.y = _.y * -1;
        return _;
      });
  }

  getVertices(quantity = 20): Vector3[] {
    const groupVertices = [...Array(quantity + 1).keys()].map((_) => [
      this.getVector(this.getVectors()[0], this.getVectors()[1])
        .multiplyScalar(_ / quantity)
        .add(this.getVectors()[0]),
      this.getVector(this.getVectors()[1], this.getVectors()[2])
        .multiplyScalar(_ / quantity)
        .add(this.getVectors()[1]),
      this.getVector(this.getVectors()[2], this.getVectors()[3])
        .multiplyScalar(_ / quantity)
        .add(this.getVectors()[2]),
    ]);
    return [
      ...groupVertices.map((_) => _[0]),
      ...groupVertices.map((_) => _[1]),
      ...groupVertices.map((_) => _[2]),
    ];
  }

  getVector(origin: Vector3, end: Vector3): Vector3 {
    return end.clone().sub(origin);
  }
  protected getMaterial(): ShaderMaterial {
    const uniforms: IUniforms = {
      controls: {
        value: this.getVectors(),
      },
    };
    return new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: VertexScript,
      fragmentShader: BezierFragment,
    });
  }

  getProvider(): Line {
    return this._provider;
  }

  onUpdate(): BezierShader {
    this._provider.geometry = this.getGeometry();
    this._provider.material = this.getMaterial();
    return this;
  }

  getUuid(): string {
    return this._provider.uuid;
  }

  onMenu(aMenu: Menu): Menu {
    return aMenu;
  }

  onChange(): void {
    this._provider.material = this.getMaterial();
    this._provider.geometry = this.getGeometry();
  }

  setVectors(aVectors: Vector3[]): BezierShader {
    this._vectors = [...aVectors];
    return this;
  }
}

export default BezierShader;
