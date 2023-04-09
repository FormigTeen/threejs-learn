export type IUniforms = Record<string, IUniformValue>

export interface IUniformValue {
    type?: string;
    value: unknown
}
