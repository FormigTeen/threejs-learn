import {Scene, Vector3} from 'three'
import { IHasProvider } from '../../Interfaces/IHasProvider'
import IHasMenu from '../../Interfaces/IHasMenu'
import MainSceneMenu from './Objects/MainSceneMenu'
import { GUI } from 'lil-gui'
import Ground from './Objects/BezierGeometry'
import { IHasUpdate } from '../../Interfaces/IHasUpdate'
import IScene from '../../Interfaces/IScene'
import Application from '../../Application'
import Camera from './Objects/Camera'
import BezierGeometry from "./Objects/BezierGeometry";
import SimpleGeometry from "./Objects/SimpleGeometry";

export default class BezierScene implements IScene, IHasMenu, IHasUpdate {

    protected _provider: Scene;
    protected _menu?: MainSceneMenu;
    protected _camera: Camera;
    protected _bezer: BezierGeometry;
    protected _simple: SimpleGeometry;
    protected _teta: number = 0.0;
    protected _scale = 8;
    protected _amplitude = 10;


    public constructor() {

        this._provider = new Scene();
        this._provider.name = "Bezier";
        this._camera = new Camera()
        this._bezer = new BezierGeometry();
        this._simple = new SimpleGeometry();
        this._bezer.setVectors(this.getVectors())
        this._simple.setVectors(this.getVectors())
        this._provider.add(this._bezer.getProvider());
        this._provider.add(this._simple.getProvider());


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
        this._teta += 0.01;
        this._bezer.setVectors(this.getVectors()).onUpdate()
        this._simple.setVectors(this.getVectors()).onUpdate()
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

    getVectors() {
        return [
            new Vector3( this._scale * -1.0, this._amplitude * Math.sin(0) / 2.0,0.0),
            new Vector3( this._scale * -0.5, this._amplitude * Math.sin(Math.PI/2.0 + this._teta) / 2.0, 0.0),
            new Vector3(  this._scale * 0.5, this._amplitude * Math.sin(3.0*Math.PI/2.0 + this._teta) / 2.0, 0.0),
            new Vector3(  this._scale * 1.0, this._amplitude * Math.sin(Math.PI) / 2.0, 0.0)
        ];
    }

}
