import { OrthographicCamera, PerspectiveCamera } from 'three'
import { IHasProvider } from '../../../Interfaces/IHasProvider'
import IHasMenu from '../../../Interfaces/IHasMenu'
import Menu from './Menu'
import { GUI } from 'lil-gui'

export default class Camera implements IHasProvider<OrthographicCamera>, IHasMenu {
    protected _provider: OrthographicCamera;


    public constructor() {
        const aspect = window.innerWidth / window.innerHeight;
        const size = 10.0;
        this._provider = new OrthographicCamera( size * aspect / -2.0, size * aspect / 2.0, size / 2.0, size / -2.0, -1.0, 1.0);
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
    }

    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
        return aMenu;
    }
}
