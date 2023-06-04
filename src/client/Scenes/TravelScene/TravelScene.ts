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
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";

export default class TravelScene implements IScene, IHasMenu, IHasUpdate {

    protected _camLoader?: Application;
    protected _provider: Scene;
    protected _modelScene?: Object3D;
    protected _menu?: MainSceneMenu;

    protected _droneCamera: Camera;
    protected _personCamera: Camera;
    protected _firstCamera: Camera;
    protected _secondCamera: Camera;
    protected _thirtyCamera: Camera;

    protected _loader: GLTFLoader;
    protected _light?: AmbientLight;
    protected _group: Object3D;
    protected _inputs = {
        'Camera': 'Camera 1',
    };
    protected _droneControls: OrbitControls;
    protected _personControls: FlyControls;

    protected _boxLimit?: BoxHelper;
    protected _camLimit?: BoxHelper;

    public constructor() {

        this._provider = new Scene();
        this._provider.name = "Travel";
        this._loader = new GLTFLoader()

        this._droneCamera = new Camera()
        this._droneControls = new OrbitControls(this._droneCamera.getProvider(), document.body);
        this._droneControls.listenToKeyEvents(window.document.body)
        this._droneControls.autoRotate = false;

        this._personCamera = new Camera()
        this._personControls = new FlyControls(this._personCamera.getProvider(), document.body);
        this._personControls.movementSpeed = 0.25
        this._personControls.dragToLook = true

        this._secondCamera = new Camera()
        this._secondCamera.getProvider().lookAt(new Vector3(0, 0, 0))

        this._thirtyCamera = new Camera()
        this._thirtyCamera.getProvider().lookAt(new Vector3(100, 0, 50))
        this._thirtyCamera.getProvider().position.set(-5, 0, 20)

        this._firstCamera = new Camera()
        this._firstCamera.getProvider().lookAt(new Vector3(10, 0, 50))
        this._firstCamera.getProvider().position.set(-5, 10, 10)

        this._group = new Object3D();
        this._provider.add(this._group);

        this._loader.load(KingModel, _ => {

            this._modelScene = _.scene;
            this._boxLimit = new BoxHelper(this._modelScene);
            _.scene.add(this._boxLimit)
            this._boxLimit.geometry.computeBoundingBox();

            this._group.add(this._modelScene)
            this._group.scale.set(10, 10, 10);

            this._boxLimit.geometry.computeBoundingBox();
            this._boxLimit.update();

            this._camLimit = new BoxHelper(this._group)
            this._camLimit.geometry.computeBoundingBox()
            this._camLimit.update()

            const max = this._boxLimit.geometry.boundingBox?.max;
            const min = this._boxLimit.geometry.boundingBox?.min;
            const aCenter = new Vector3();
            this._boxLimit.geometry.boundingBox?.getCenter(aCenter);

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
                this._boxLimit.geometry.boundingBox?.getCenter(aCenter);
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
        aMenu.getProvider().add(this._inputs, 'Camera', ['Drone', 'Pessoa', 'Camera 1', 'Camera 2', 'Camera 3']).onChange(
            () => this.onChange()
        )
        return this._menu;
    }

    onChange() {
        if ( this._camLoader ) {
            if (this._inputs.Camera === "Drone") {
                this._camLoader.setCamera(this._droneCamera)
            }
            if (this._inputs.Camera == "Pessoa") {
                this._camLoader.setCamera(this._personCamera)
            }
            if (this._inputs.Camera == "Camera 1") {
                this._camLoader.setCamera(this._firstCamera)
            }
            if (this._inputs.Camera == "Camera 2") {
                this._camLoader.setCamera(this._secondCamera)
            }
            if (this._inputs.Camera == "Camera 3") {
                this._camLoader.setCamera(this._thirtyCamera)
            }
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
        if ( aLoader instanceof Application ) {
            this._camLoader = aLoader
            this._camLoader.setCamera(this._firstCamera)
        }

        return this;
    }


}
