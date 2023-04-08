import { PerspectiveCamera } from 'three'
import * as THREE from 'three'
import { IHasProvider } from '../Interfaces/IHasProvider'
import IHasMenu from '../Interfaces/IHasMenu'
import MainSceneMenu from '../Scenes/GroundScene/Objects/MainSceneMenu'
import { GUI } from 'lil-gui'

export default class Camera implements IHasProvider<PerspectiveCamera>, IHasMenu {
    protected _provider: PerspectiveCamera;

    protected  _controls = {
        Distancia: 100
    }

    public constructor() {
        this._provider = new PerspectiveCamera( 70.0, window.innerWidth / window.innerHeight, 0.01, 1000.0 );
        this._provider.position.y = 2.0;
        this._provider.position.z = this._controls.Distancia
        this._provider.updateProjectionMatrix();
        window.addEventListener('resize', () => this.onResize(), false)
    }

    getProvider() {
        return this._provider
    }

    onResize() {
        this.onUpdate()
        this._provider.updateProjectionMatrix()
    }

    onUpdate() {
        this._provider.aspect = window.innerWidth / window.innerHeight
        this._provider.position.z = this._controls.Distancia
    }

    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
        aMenu.getProvider().add(this._controls, 'Distancia', 0, 100).onChange(() => this.onUpdate())
        return aMenu;
    }
}
