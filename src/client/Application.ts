import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import * as THREE from 'three'
import { IHasProvider } from './Interfaces/IHasProvider'
import { IHasUpdate } from './Interfaces/IHasUpdate'

interface ConfigUpdate {
    getApplication(): Application,
    getClock: number
}

export default class Application {

    protected _provider: WebGLRenderer;
    protected _scene?: IHasProvider<Scene>
    protected _camera?: IHasProvider<PerspectiveCamera>

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

    setScene(aScene: IHasProvider<Scene>) {
        this._scene = aScene;
        return this;
    }

    setCamera(aCamera: IHasProvider<PerspectiveCamera>) {
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
        this.onRender()
    }

}
