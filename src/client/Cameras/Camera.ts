import { PerspectiveCamera } from 'three'
import * as THREE from 'three'

export default class Camera {
    protected _provider: PerspectiveCamera;

    public constructor() {
        this._provider = new PerspectiveCamera( 70.0, window.innerWidth / window.innerHeight, 0.01, 1000.0 );
        this._provider.position.y = 2.0;
        this._provider.position.z = 13.0;
        this._provider.updateProjectionMatrix();
        window.addEventListener('resize', () => this.onResize(), false)
    }

    getProvider() {
        return this._provider
    }

    onResize() {
        this._provider.aspect = window.innerWidth / window.innerHeight
        this._provider.updateProjectionMatrix()
    }
}
