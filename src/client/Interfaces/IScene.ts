import { IHasProvider } from './IHasProvider'
import { Scene } from 'three'
import { IHasLoad } from './IHasLoad'

export default interface IScene extends IHasProvider<Scene>, IHasLoad {

}
