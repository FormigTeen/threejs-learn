export interface IHasUpdate {
    getUuid(): string;

    onUpdate(): unknown;
}
