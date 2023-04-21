
export interface IHasUpdate {
    getUuid(): string;

    onUpdate(): unknown;
}

export const isHasUpdate = (aObject: unknown): aObject is IHasUpdate => (aObject as IHasUpdate).getUuid !== undefined && (aObject as IHasUpdate).onUpdate !== undefined;
