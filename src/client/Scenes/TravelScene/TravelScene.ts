import {AxesHelper, BoxHelper, Color, Group, Object3D, PointLight, Scene, Vector3} from 'three'
import { IHasProvider } from '../../Interfaces/IHasProvider'
import IHasMenu from '../../Interfaces/IHasMenu'
import MainSceneMenu from './Objects/MainSceneMenu'
import { GUI } from 'lil-gui'
import { IHasUpdate } from '../../Interfaces/IHasUpdate'
import IScene from '../../Interfaces/IScene'
import Application from '../../Application'
import Camera from './Objects/Camera'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import KingModel from './Objects/King/scene.gltf';
import {bool} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class TravelScene implements IScene, IHasMenu, IHasUpdate {

    protected _provider: Scene;
    protected _menu?: MainSceneMenu;
    protected _camera: Camera;
    protected _loader: GLTFLoader;
    protected _controls: OrbitControls;

    public constructor() {

        this._provider = new Scene();
        this._provider.name = "Travel";
        this._loader = new GLTFLoader()
        this._camera = new Camera()
        this._controls = new OrbitControls(this._camera.getProvider(), document.body);
        this._controls.autoRotate = false;
        this._loader.load(KingModel, _ => {
            this._provider.add(_.scene)
            const obj = _.scene;
            const helper= new BoxHelper(obj);

            helper.geometry.computeBoundingBox();

            const max = helper.geometry.boundingBox?.max;
            const min = helper.geometry.boundingBox?.min;
            if ( max && min ) {
                this._camera.getProvider().position.x = max.x;
                this._camera.getProvider().position.y = max.y;
                this._camera.getProvider().position.z = max.z;
                this._camera.getProvider().lookAt(new Vector3(0.0, 0.0, 0.0));
                const farPlane = Math.max(	(max.x - min.x),
                    (max.y - min.y),
                    (max.z - min.z) );

                this._camera.getProvider().far 	= 1000000;
                this._camera.getProvider().updateProjectionMatrix();
                this._controls.update();
                const pointLight1 = new PointLight(new Color(1.0, 1.0, 1.0));
                pointLight1.distance = 0.0;
                pointLight1.position.set(	max.x*1.2,
                    max.y*1.2,
                    max.z*1.2);
                this._provider.add(pointLight1);
                var globalAxis = new AxesHelper	( Math.max(	(max.x - min.x),
                        (max.y - min.y),
                        (max.z - min.z)
                    )
                );
                this._provider.add(globalAxis);
            }
        })
    }

    public getProvider()
    {
        return this._provider;
    }

    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
        if ( !this._menu ) {
            this._menu = new MainSceneMenu(aMenu);
            this._camera.onMenu(this._menu)
        }
        return this._menu;
    }

    getUuid(): string {
        return this.getProvider().uuid;
    }

    onUpdate(): unknown {
        this._controls.update()
        return this
    }

    onUnload() {
        this._menu?.getProvider().hide();
        return this;
    }

    onLoad(aLoader: unknown) {
        this._menu?.getProvider().show();
        if ( aLoader instanceof Application )
            aLoader.setCamera(this._camera)
        return this;
    }


}
