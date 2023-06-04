import {AmbientLight, AxesHelper, BoxHelper, Color, Group, Object3D, PointLight, Scene, Vector3} from 'three'
import { IHasProvider } from '../../Interfaces/IHasProvider'
import IHasMenu from '../../Interfaces/IHasMenu'
import MainSceneMenu from './Objects/MainSceneMenu'
import { GUI } from 'lil-gui'
import {IHasUpdate, IUpdateProp} from '../../Interfaces/IHasUpdate'
import IScene from '../../Interfaces/IScene'
import Application from '../../Application'
import Camera from './Objects/Camera'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import KingModel from './Objects/King/scene.gltf';
import {bool, vec3} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";

export default class TravelScene implements IScene, IHasMenu, IHasUpdate {

    protected _provider: Scene;
    protected _modelScene?: Object3D;
    protected _menu?: MainSceneMenu;
    protected _droneCamera: Camera;
    protected _personCamera: Camera;
    protected _loader: GLTFLoader;
    protected _light?: AmbientLight;
    protected _group: Object3D;
    protected _inputs = {
        'Position X': 0,
        'Position Y': 0,
        'Position Z': 0
    };
    protected _droneControls: OrbitControls;
    protected _personControls: FlyControls;

    public constructor() {

        this._provider = new Scene();
        this._provider.name = "Travel";
        this._loader = new GLTFLoader()

        this._droneCamera = new Camera()
        this._droneControls = new OrbitControls(this._droneCamera.getProvider(), document.body);
        this._droneControls.listenToKeyEvents(window)
        this._droneControls.autoRotate = false;

        this._personCamera = new Camera()
        this._personControls = new FlyControls(this._personCamera.getProvider(), document.body);
        this._personControls.movementSpeed = 0.25
        this._personControls.dragToLook = true

        this._group = new Object3D();
        this._provider.add(this._group);

        this._loader.load(KingModel, _ => {

            this._modelScene = _.scene;
            const helper= new BoxHelper(this._modelScene);
            helper.geometry.computeBoundingBox();
            _.scene.add(helper)

            this._group.add(this._modelScene)
            this._group.scale.set(10, 10, 10);

            const max = helper.geometry.boundingBox?.max;
            const min = helper.geometry.boundingBox?.min;
            const aCenter = new Vector3();
            helper.geometry.boundingBox?.getCenter(aCenter);

            this._modelScene.position.setX(0 - aCenter.x)
            this._modelScene.position.setZ(0 - aCenter.z)

            if ( max && min ) {
                this._droneCamera.getProvider().position.set(max.x, max.y, max.z);
                this._droneCamera.getProvider().lookAt(new Vector3(0.0, 0.0, 0.0));

                this._personCamera.getProvider().position.set(max.x, max.y, max.z);
                this._personCamera.getProvider().lookAt(new Vector3(0.0, 0.0, 0.0));

                this._droneCamera.getProvider().far = 1000000;
                this._personCamera.getProvider().far = 1000000;

                this._droneCamera.getProvider().updateProjectionMatrix();
                this._personCamera.getProvider().updateProjectionMatrix();

                this._droneControls.update();
                this._personControls.update(0);

                this._light = new AmbientLight(new Color(1.0, 1.0, 1.0));

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
            this._droneCamera.onMenu(this._menu)
            this._personCamera.onMenu(this._menu);
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

    onUpdate({ getClock }: IUpdateProp): unknown {
        this._droneControls.update()
        this._personControls.update(getClock() % 5)
        this._personCamera.getProvider().position.setY(0);
        return this
    }

    onUnload() {
        this._menu?.getProvider().hide();
        return this;
    }

    onLoad(aLoader: unknown) {
        this._menu?.getProvider().show();
        if ( aLoader instanceof Application )
            //aLoader.setCamera(this._droneCamera)
            aLoader.setCamera(this._personCamera)
        return this;
    }


}
