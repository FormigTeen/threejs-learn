import {
  type IKS,
  CCDIKSolver,
  CCDIKHelper,
} from 'three/examples/jsm/animation/CCDIKSolver';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  Color,
  Scene,
  Skeleton,
  SkeletonHelper,
  Float32BufferAttribute,
  Uint16BufferAttribute,
  CylinderGeometry,
  SkinnedMesh,
  DoubleSide,
  MeshPhongMaterial,
  Bone,
  Vector3,
} from 'three';
import type IHasProvider from '../../Interfaces/IHasProvider';
import type IHasMenu from '../../Interfaces/IHasMenu';
import MainSceneMenu from './Objects/MainSceneMenu';
import { GUI } from 'lil-gui';
import type IHasUpdate from '@/Interfaces/IHasUpdate';
import type IScene from '../../Interfaces/IScene';
import Application from '../../Application';
import Camera from './Objects/Camera';

interface IGeometryConfiguration {
  segmentHeight: number;
  segmentCount: number;
  height: number;
  halfHeight: number;
}

export default class KinematicScene implements IScene, IHasMenu, IHasUpdate {
  protected _provider: Scene;
  protected _menu?: MainSceneMenu;
  protected _camera: Camera;
  protected _controller?: OrbitControls;
  protected _teta = 0.0;
  protected _ikSolver?: CCDIKSolver;

  protected _controls = {
    Velocidade: 0.01,
    Escala: 8,
    Amplitude: 10,
    'Altura dos Segments': 8,
    Segmentos: 3,
    'Modo Escuro': 'Ativado',
    'Controlador Ativo': false,
  };

  public constructor() {
    this._provider = new Scene();
    this._provider.name = 'Kinematics';
    this.updateBackground();
    this._camera = new Camera();
    this._controller = new OrbitControls(
      this._camera.getProvider(),
      window.document.body,
    );
    this.initBones();
  }

  protected updateBackground(): void {
    if (this._controls['Modo Escuro'] === 'Ativado')
      this._provider.background = new Color('black');
    else this._provider.background = new Color('white');
  }

  protected getGeometryConfiguration(): IGeometryConfiguration {
    return {
      segmentHeight: this._controls['Altura dos Segments'],
      segmentCount: this._controls['Segmentos'],
      height:
        this._controls['Altura dos Segments'] * this._controls['Segmentos'],
      halfHeight:
        this._controls['Altura dos Segments'] *
        this._controls['Segmentos'] *
        0.5,
    };
  }

  initBones(): void {
    const mesh = this.createMesh();
    this.getProvider().add(mesh);

    //
    // ikSolver
    //

    const iks: IKS[] = [
      {
        maxAngle: 180,
        minAngle: 0,
        iteration: 1,
        target: 5,
        effector: 4,
        links: [
          { index: 3, enabled: true },
          { index: 2, enabled: true },
          { index: 1, enabled: true },
        ],
      },
    ];
    this._ikSolver = new CCDIKSolver(mesh, iks);
    this.getProvider().add(new CCDIKHelper(mesh, iks));
  }

  public getProvider(): Scene {
    return this._provider;
  }

  onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
    if (!this._menu) {
      this._menu = new MainSceneMenu(aMenu);
      this._menu
        .getProvider()
        .add(this._controls, 'Modo Escuro', ['Ativado', 'Desativado'])
        .onChange(() => this.updateBackground());
      this._menu
        .getProvider()
        .add(this._controls, 'Escala', 1, 10)
        .onChange(() => (this._teta = 0));
      this._menu
        .getProvider()
        .add(this._controls, 'Amplitude', 0, 35)
        .onChange(() => (this._teta = 0));
      this._camera.onMenu(this._menu);
    }
    return this._menu;
  }

  getUuid(): string {
    return this.getProvider().uuid;
  }

  onUpdate(): unknown {
    this.updateBackground();
    return this;
  }

  onUnload(): KinematicScene {
    this._menu?.getProvider().hide();
    return this;
  }

  onLoad(aLoader: unknown): KinematicScene {
    this._menu?.getProvider().show();
    if (aLoader instanceof Application) aLoader.setCamera(this._camera);
    return this;
  }

  protected createGeometry(): CylinderGeometry {
    const sizing = this.getGeometryConfiguration();

    const geometry = new CylinderGeometry(
      5, // radiusTop
      5, // radiusBottom
      sizing.height, // height
      8, // radiusSegments
      sizing.segmentCount * 1, // heightSegments
      true, // openEnded
    );

    const position = geometry.attributes.position;

    const vertex = new Vector3();

    const skinIndices = [];
    const skinWeights = [];

    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);

      const y = vertex.y + sizing.halfHeight;

      const skinIndex = Math.floor(y / sizing.segmentHeight);
      const skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;

      skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
      skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
    }

    geometry.setAttribute(
      'skinIndex',
      new Uint16BufferAttribute(skinIndices, 4),
    );
    geometry.setAttribute(
      'skinWeight',
      new Float32BufferAttribute(skinWeights, 4),
    );

    return geometry;
  }

  createBones(): Bone[] {
    const sizing = this.getGeometryConfiguration();

    const bones = [];

    // "root bone"
    const rootBone = new Bone();
    rootBone.name = 'root';
    rootBone.position.y = -sizing.halfHeight;
    bones.push(rootBone);

    //
    // "bone0", "bone1", "bone2", "bone3"
    //

    // "bone0"
    let prevBone = new Bone();
    prevBone.position.y = 0;
    rootBone.add(prevBone);
    bones.push(prevBone);

    // "bone1", "bone2", "bone3"
    for (let i = 1; i <= sizing.segmentCount; i++) {
      const bone = new Bone();
      bone.position.y = sizing.segmentHeight;
      bones.push(bone);
      bone.name = `bone${i}`;
      prevBone.add(bone);
      prevBone = bone;
    }

    // "target"
    const targetBone = new Bone();
    targetBone.name = 'target';
    targetBone.position.y = sizing.height + sizing.segmentHeight; // relative to parent: rootBone
    rootBone.add(targetBone);
    bones.push(targetBone);

    return bones;
  }

  protected createMesh(): SkinnedMesh {
    const geometry = this.createGeometry();
    const bones = this.createBones();

    const material = new MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: DoubleSide,
      flatShading: true,
      wireframe: true,
    });

    const mesh = new SkinnedMesh(geometry, material);
    const skeleton = new Skeleton(bones);

    mesh.add(bones[0]);

    mesh.bind(skeleton);

    const skeletonHelper = new SkeletonHelper(mesh);
    //skeletonHelper.material.linewidth = 2;
    this.getProvider().add(skeletonHelper);

    return mesh;
  }
}
