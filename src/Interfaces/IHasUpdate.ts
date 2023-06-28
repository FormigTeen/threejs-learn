import Application from '../Application';

export interface IUpdateProp {
  getApplication(): Application;
  getClock(): number;
}
export default interface IHasUpdate {
  getUuid(): string;

  onUpdate(prop: IUpdateProp): unknown;
}

export const isHasUpdate = (aObject: unknown): aObject is IHasUpdate =>
  (aObject as IHasUpdate).getUuid !== undefined &&
  (aObject as IHasUpdate).onUpdate !== undefined;
