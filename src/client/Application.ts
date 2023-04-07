import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import * as THREE from 'three'
import { IHasProvider } from './Interfaces/IHasProvider'

export default class Application {

    protected _provider: WebGLRenderer;
    protected _scene?: IHasProvider<Scene>
    protected _camera?: IHasProvider<PerspectiveCamera>

    public constructor() {
        this._provider = new WebGLRenderer()
        this._provider.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this._provider.domElement)
        window.addEventListener('resize', () => this.onResize(), false)
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
}
