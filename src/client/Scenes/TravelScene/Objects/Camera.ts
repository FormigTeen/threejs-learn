import {OrthographicCamera, PerspectiveCamera} from 'three'
import { IHasProvider } from '../../../Interfaces/IHasProvider'
import IHasMenu from '../../../Interfaces/IHasMenu'
import { GUI } from 'lil-gui'

export default class Camera implements IHasProvider<PerspectiveCamera>, IHasMenu {
    protected _provider: PerspectiveCamera;

    protected _size = 10.0;

    public constructor() {
        this._provider = new PerspectiveCamera( 70.0, window.innerWidth / window.innerHeight, 0.01, 1000.0 );
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
        this._provider.updateProjectionMatrix();
    }

    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
        return aMenu;
    }
}
