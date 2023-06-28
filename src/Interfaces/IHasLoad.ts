export default interface IHasLoad {
  onLoad(aLoader: unknown): IHasLoad;
  onUnload(aLoader: unknown): IHasLoad;
}
