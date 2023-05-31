import { OrthographicCamera } from 'three'
import { IHasProvider } from '../../../Interfaces/IHasProvider'
import IHasMenu from '../../../Interfaces/IHasMenu'
import Menu from './Menu'
import { GUI } from 'lil-gui'

export default class Camera implements IHasProvider<OrthographicCamera>, IHasMenu {
    protected _provider: OrthographicCamera;

    protected _size = 50.0;

    public constructor() {
        const aspect = window.innerWidth / window.innerHeight;
        this._provider = new OrthographicCamera( this._size * aspect / -2.0, this._size * aspect / 2.0, this._size / 2.0, this._size / -2.0, -10000, 10000);
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
        const aspect = window.innerWidth / window.innerHeight;
        this._provider.left = this._size * aspect / -2.0;
        this._provider.right = this._size * aspect / 2.0;
        this._provider.updateProjectionMatrix();
    }

    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI> {
        return aMenu;
    }
}
