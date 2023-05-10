import {
    Mesh,
    MeshBasicMaterial,
    SphereGeometry,
} from 'three'
import { IHasProvider } from '../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../Interfaces/IHasMenu'
import Menu from './Menu'

export default class Earth implements IHasProvider<Mesh>, IHasUpdate, IHasMenu {

    protected _provider: Mesh;

    constructor() {
        this._provider = new Mesh(
            new SphereGeometry( 1.0, 20, 20),
            new MeshBasicMaterial( {color: 0x0000ff , wireframe:true})
        );
        this._provider.position.x = 20
    }

    getProvider() {
        return this._provider
    }

    onUpdate() {
        return this;
    }

    getUuid(): string {
        return this._provider.uuid
    }

    onMenu(aMenu: Menu): Menu {
        return aMenu;
    }

    onChange() {
    }

}
