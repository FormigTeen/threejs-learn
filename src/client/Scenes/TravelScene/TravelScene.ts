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
import {bool, vec3} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class TravelScene implements IScene, IHasMenu, IHasUpdate {

    protected _provider: Scene;
    protected _modelScene?: Object3D;
    protected _menu?: MainSceneMenu;
    protected _camera: Camera;
    protected _loader: GLTFLoader;
    protected _light?: PointLight;
    protected _group: Object3D;
    protected _inputs = {
        'Position X': 0,
        'Position Y': 0,
        'Position Z': 0
    };
    protected _controls: OrbitControls;

    public constructor() {

        this._provider = new Scene();
        this._provider.name = "Travel";
        this._loader = new GLTFLoader()
        this._camera = new Camera()
        this._controls = new OrbitControls(this._camera.getProvider(), document.body);
        this._controls.listenToKeyEvents(window)
        this._controls.autoRotate = false;
        this._group = new Object3D();
        this._provider.add(this._group);
        this._loader.load(KingModel, _ => {
            this._modelScene = _.scene;
            this._group.add(_.scene)

            const helper= new BoxHelper(_.scene);
            helper.geometry.computeBoundingBox();
            this._modelScene.add(helper)

            this._group.scale.set(10, 10, 10);

            const max = helper.geometry.boundingBox?.max;
            const min = helper.geometry.boundingBox?.min;
            const aCenter = new Vector3();
            helper.geometry.boundingBox?.getCenter(aCenter);
            this._modelScene.position.setX(0 - aCenter.x)
            this._modelScene.position.setZ(0 - aCenter.z)

            if ( max && min ) {
                this._camera.getProvider().position.x = max.x;
                this._camera.getProvider().position.y = max.y;
                this._camera.getProvider().position.z = max.z;
                this._camera.getProvider().lookAt(new Vector3(0.0, 0.0, 0.0));

                this._camera.getProvider().far 	= 1000000;
                this._camera.getProvider().updateProjectionMatrix();
                this._controls.update();
                this._light = new PointLight(new Color(1.0, 1.0, 1.0));
                this._light.distance = 100.0;

                const aCenterLight = new Vector3();
                helper.geometry.boundingBox?.getCenter(aCenter);
                this._light.position.set(
                    aCenterLight.x, aCenterLight.y, aCenterLight.z
                );

                this._provider.add(this._light);
                var globalAxis = new AxesHelper	(
                    1000
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
        aMenu.getProvider().add(this._inputs, 'Position X', 0.1, 20.0).onChange(
            () => this.onChange()
        )
        aMenu.getProvider().add(this._inputs, 'Position Y', 0.1, 20.0).onChange(
            () => this.onChange()
        )
        aMenu.getProvider().add(this._inputs, 'Position Z', 0.1, 20.0).onChange(
            () => this.onChange()
        )
        return this._menu;
    }

    onChange() {
        if ( this._light ) {
            this._light.position.setX(this._inputs["Position X"])
            this._light.position.setY(this._inputs["Position Y"])
            this._light.position.setZ(this._inputs["Position Z"])
        }
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
