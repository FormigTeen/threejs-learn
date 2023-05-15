import {
    AxesHelper,
    Mesh,
    MeshBasicMaterial, Object3D,
    SphereGeometry, Vector3,
} from 'three'
import { IHasProvider } from '../../../Interfaces/IHasProvider'
import { IHasUpdate } from '../../../Interfaces/IHasUpdate'
import IHasMenu from '../../../Interfaces/IHasMenu'
import Menu from './Menu'

export default class Earth implements IHasProvider<Object3D>, IHasUpdate, IHasMenu {

    protected _provider: Object3D;
    protected _axis: AxesHelper;
    protected _entity: Mesh;
    protected _controls = {
        velocity: 0.030
    }

    constructor() {
        this._entity = new Mesh(
            new SphereGeometry( 1.0, 10, 10),
            new MeshBasicMaterial( {color: 0x0000ff , wireframe:true})
        );
        this._provider = new Object3D();
        this._axis = new AxesHelper( 10 );

        this._provider.add(this._entity)
        this._provider.add(this._axis)
        this._provider.position.x = 18
        this._provider.rotateOnAxis(new Vector3(-1, -1, -1).normalize(), -Math.PI/4);
    }

    getProvider() {
        return this._provider
    }

    onUpdate() {
        this._provider.rotateX(this._controls.velocity)
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
