import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three'
import VertexScript from './Scripts/vertex.sdx'
import FragmentScript from './Scripts/fragment.sdx'
import { IHasProvider } from '../../Interfaces/IHasProvider'
export const GROUND_NAME_KEY = "ground"
export default class Ground implements IHasProvider<Mesh>{

    protected _material: ShaderMaterial;
    protected _geometry: PlaneGeometry;
    protected _provider: Mesh;
    constructor() {
        const uAmp = {
            type: 'f',
            value: 2.0
        };
        this._material = new ShaderMaterial(
            {
                uniforms: {
                    uAmp: uAmp
                },
                vertexShader: VertexScript,
                fragmentShader: FragmentScript,
                wireframe: true,
                side: DoubleSide
            }
        );
        this._geometry = new PlaneGeometry(
            100,
            100,
            30, 30
        )
        this._provider = new Mesh(this._geometry, this._material)
        this._provider.rotateX(-90.0 * Math.PI / 180.0);
        this._provider.name = GROUND_NAME_KEY;
    }

    getProvider() {
        return this._provider
    }

}
