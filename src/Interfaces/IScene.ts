import type IHasProvider from './IHasProvider';
import { Scene } from 'three';
import type IHasLoad from './IHasLoad';

export default interface IScene extends IHasProvider<Scene>, IHasLoad {}
