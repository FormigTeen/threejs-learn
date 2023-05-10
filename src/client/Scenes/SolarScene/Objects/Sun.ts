import {
    Mesh,
    MeshBasicMaterial,
    SphereGeometry,
} from 'three'
import { IHasProvider } from '../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../Interfaces/IHasMenu'
import Menu from './Menu'

export default class Sun implements IHasProvider<Mesh>, IHasUpdate, IHasMenu {

    protected _provider: Mesh;

    constructor() {
        this._provider = new Mesh(
            new SphereGeometry( 4.0, 20, 20),
            new MeshBasicMaterial( {color: 0xffff00, wireframe:true})
        );
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
