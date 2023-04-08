import MainSceneMenu from '../Scenes/GroundScene/Objects/MainSceneMenu'
import { IHasProvider } from './IHasProvider'
import { GUI } from 'lil-gui'

export default interface IHasMenu {
    onMenu(aMenu: IHasProvider<GUI>): IHasProvider<GUI>
}
