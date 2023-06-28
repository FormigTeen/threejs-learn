import {
  AxesHelper,
  DoubleSide,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
} from 'three';
import VertexScript from './Scripts/vertex.glsl';
import GradientFragmentScript from './Scripts/gradientFragment.glsl';
import FragmentScript from './Scripts/fragment.glsl';
import IrregularVertexScript from './Scripts/irregularVertex.glsl';
import type IHasProvider from '../../../../Interfaces/IHasProvider';
import type IHasUpdate from '@/Interfaces/IHasUpdate';
import type IHasMenu from '../../../../Interfaces/IHasMenu';
import MainSceneMenu from '../MainSceneMenu';
import { type IUniforms } from '../../../../Interfaces/IUniforms';
class Ground implements IHasProvider<Mesh>, IHasUpdate, IHasMenu {
  protected _material: ShaderMaterial;
  protected _geometry: PlaneGeometry;
  protected _provider: Mesh;
  protected _axes: AxesHelper;

  protected _controls = {
    Amplitude: 1.0,
    Segmentos: 50,
    'Modo Malha': true,
    'Modo Irregular': false,
    'Modo Gradiente': false,
    'Altura Gradiente': 10.0,
    'Centro Gradiente': 0.0,
  };

  constructor() {
    this._material = this.getMaterial();
    this._geometry = this.getGeometry();
    this._provider = new Mesh(this._geometry, this._material);
    this._provider.rotateX((-90.0 * Math.PI) / 180.0);

    this._axes = new AxesHelper(8.0);
    this._axes.position.y = 0.2;
    this._axes.updateMatrix();
    this._provider.add(this._axes);
  }

  protected getGeometry(): PlaneGeometry {
    return new PlaneGeometry(
      100,
      100,
      Math.round(this._controls.Segmentos),
      Math.round(this._controls.Segmentos),
    );
  }

  protected getMaterial(): ShaderMaterial {
    const uniforms: IUniforms = {
      uAmp: {
        type: 'f',
        value: this._controls.Amplitude,
      },
      fHeight: {
        type: 'f',
        value: this._controls['Altura Gradiente'],
      },
      fCenter: {
        type: 'f',
        value: this._controls['Centro Gradiente'],
      },
    };
    return new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: this._controls['Modo Irregular']
        ? IrregularVertexScript
        : VertexScript,
      fragmentShader: this._controls['Modo Gradiente']
        ? GradientFragmentScript
        : FragmentScript,
      wireframe: this._controls['Modo Malha'],
      side: DoubleSide,
    });
  }

  getProvider(): Mesh {
    return this._provider;
  }

  onUpdate(): Ground {
    this._provider.rotateZ(0.001);
    this._provider.updateMatrix();
    return this;
  }

  getUuid(): string {
    return this._provider.uuid;
  }

  onMenu(aMenu: MainSceneMenu): MainSceneMenu {
    aMenu
      .getProvider()
      .add(this._controls, 'Amplitude', 0.1, 20.0)
      .onChange(() => this.onChange());
    aMenu
      .getProvider()
      .add(this._controls, 'Segmentos', 50, 1000)
      .onChange(() => this.onChange());

    aMenu
      .getProvider()
      .add(this._controls, 'Modo Malha')
      .onChange(() => this.onChange());

    aMenu
      .getProvider()
      .add(this._controls, 'Modo Gradiente')
      .onChange(() => this.onChange());

    aMenu
      .getProvider()
      .add(this._controls, 'Modo Irregular')
      .onChange(() => this.onChange());

    aMenu
      .getProvider()
      .add(this._controls, 'Altura Gradiente', 1, 20)
      .onChange(() => this.onChange());

    aMenu
      .getProvider()
      .add(this._controls, 'Centro Gradiente', -10, 10)
      .onChange(() => this.onChange());
    return aMenu;
  }

  onChange(): void {
    this._provider.material = this.getMaterial();
    this._provider.geometry = this.getGeometry();
  }
}

export default Ground;
