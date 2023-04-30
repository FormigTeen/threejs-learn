import {Scene, Vector3} from 'three'
import { IHasProvider } from '../../Interfaces/IHasProvider'
import IHasMenu from '../../Interfaces/IHasMenu'
import MainSceneMenu from './Objects/MainSceneMenu'
import { GUI } from 'lil-gui'
import { IHasUpdate } from '../../Interfaces/IHasUpdate'
import IScene from '../../Interfaces/IScene'
import Application from '../../Application'
import Camera from './Objects/Camera'
import BezierGeometry from "./Objects/BezierGeometry";
import SimpleGeometry from "./Objects/SimpleGeometry";
import BezierShader from "./Objects/BezierShader/BezierShader";

export default class BezierScene implements IScene, IHasMenu, IHasUpdate {

    protected _provider: Scene;
    protected _menu?: MainSceneMenu;
    protected _camera: Camera;
    protected _bezer: BezierGeometry;
    protected _simple: SimpleGeometry;
    protected _shader: BezierShader;
    protected _teta: number = 0.0;

    protected _controls = {
        Velocidade: 0.01,
        Escala: 8,
        Amplitude: 10,
    }


    public constructor() {

        this._provider = new Scene();
        this._provider.name = "Bezier";
        this._camera = new Camera()
        this._bezer = new BezierGeometry();
        this._simple = new SimpleGeometry();
        this._shader = new BezierShader();
        this._bezer.setVectors(this.getVectors())
        this._simple.setVectors(this.getVectors())
        this._shader.setVectors(this.getVectors())
        //this._provider.add(this._bezer.getProvider());
        //this._provider.add(this._simple.getProvider());
        this._provider.add(this._shader.getProvider())


    }

    public getProvider()
    {
        return this._provider;
    }

    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
        if ( !this._menu ) {
            this._menu = new MainSceneMenu(aMenu);
            this._menu.getProvider().add(this._controls, 'Velocidade', 0.01, 0.1).onChange(() => this._teta = 0)
            this._menu.getProvider().add(this._controls, 'Escala', 1, 10).onChange(() => this._teta = 0)
            this._menu.getProvider().add(this._controls, 'Amplitude', 0, 35).onChange(() => this._teta = 0)
            this._camera.onMenu(this._menu)
            this._shader.onMenu(this._menu)
        }
        return this._menu;
    }

    getUuid(): string {
        return this.getProvider().uuid;
    }

    onUpdate(): unknown {
        this._teta += this._controls.Velocidade;
        this._bezer.setVectors(this.getVectors()).onUpdate()
        this._simple.setVectors(this.getVectors()).onUpdate()
        this._shader.setVectors(this.getVectors()).onUpdate()
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
            new Vector3( this._controls.Escala * -1.0, this._controls.Amplitude * Math.sin(0) / 2.0,0.0),
            new Vector3( this._controls.Escala * -0.5, this._controls.Amplitude * Math.sin(Math.PI/2.0 + this._teta) / 2.0, 0.0),
            new Vector3(  this._controls.Escala * 0.5, this._controls.Amplitude * Math.sin(3.0*Math.PI/2.0 + this._teta) / 2.0, 0.0),
            new Vector3(  this._controls.Escala * 1.0, this._controls.Amplitude * Math.sin(Math.PI) / 2.0, 0.0)
        ];
    }

}
