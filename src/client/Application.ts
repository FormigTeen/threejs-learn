import { OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import * as THREE from 'three'
import { IHasProvider } from './Interfaces/IHasProvider'
import { IHasUpdate } from './Interfaces/IHasUpdate'
import IHasMenu from './Interfaces/IHasMenu'
import { Controller, GUI } from 'lil-gui'
import IScene from './Interfaces/IScene'

interface ConfigUpdate {
    getApplication(): Application,
    getClock: number
}

export default class Application implements IHasMenu {

    protected _provider: WebGLRenderer;
    protected _scene?: IScene
    protected _scenes: Array<IScene> = [];

    protected _sceneOption? : Controller;

    protected _controls = {
        "Cena": "",
        "BackupCena": ""
    }

    protected _camera?: IHasProvider<PerspectiveCamera> | IHasProvider<OrthographicCamera>

    protected _updatesStack: Record<string, Function> = {};

    public constructor() {
        this._provider = new WebGLRenderer()
        this._provider.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this._provider.domElement)
        window.addEventListener('resize', () => this.onResize(), false)
    }

    onBoot() {
        this.onRender()
        requestAnimationFrame((_) => this.onAnimate(_))
    }
    onAnimate(clock: number) {
        this.onUpdate(clock)
        requestAnimationFrame((_) => this.onAnimate(_))
    }
    onResize() {
        this._provider.setSize(window.innerWidth, window.innerHeight)
        this.onRender()
    }

    addScene(aScene: IScene) {
        this._scenes = [
            ...this._scenes,
            aScene
        ]
        if ( !this._controls.Cena ) {
            this._controls.Cena = aScene.getProvider().name;
            this.onChangeScene()
            this._controls.BackupCena = this._controls.Cena;
        }
        return this;
    }

    setCamera(aCamera: IHasProvider<PerspectiveCamera> | IHasProvider<OrthographicCamera>) {
        this._camera = aCamera;
        return this;
    }

    onRender() {
        if ( !!this._scene && !!this._camera )  {
            this.getProvider().render(this._scene.getProvider(), this._camera.getProvider())
        }
        return this;
    }

    getProvider() {
        return this._provider
    }

    registerUpdate(aObject: IHasUpdate) {
        const key = aObject.getUuid()
        this._updatesStack = {
            ...this._updatesStack,
            [key]: () => aObject.onUpdate()
        }
        return this;
    }

    onUpdate(aClock: number) {
        Object.keys(this._updatesStack)
            .map(_ => this._updatesStack[_])
            .map(_ => _({
                getApplication: () => this,
                getClock: () => aClock
            }));
        this._scene = this._scenes.find(_ => _.getProvider().name === this._controls['Cena'])
        this.onRender()
    }

    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
        if ( !this._sceneOption ) {
            this._sceneOption = aMenu.getProvider().add(
                this._controls, "Cena", this._scenes.map(_ => _.getProvider().name)
            ).onChange(() => this.onChangeScene())
        } else {
            this._sceneOption.options(this._scenes.map(_ => _.getProvider().name))
        }
        return aMenu;
    }

    public onChangeScene()
    {
        this._scenes.find(_ => _.getProvider().name === this._controls['BackupCena'])?.onUnload(this)
        this._controls.BackupCena = this._controls.Cena;
        this._scenes.find(_ => _.getProvider().name === this._controls['Cena'])?.onLoad(this)
    }


}