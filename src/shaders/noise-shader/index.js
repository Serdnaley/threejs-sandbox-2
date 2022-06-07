import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

export class NoiseShader extends ShaderPass {
  constructor () {
    super({
      uniforms: {
        tDiffuse: { value: null },
        amount: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
  }
}
