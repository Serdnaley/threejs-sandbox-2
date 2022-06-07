import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { NoiseShader } from '../shaders/noise-shader'

export class Postprocessing extends EffectComposer {
  constructor (renderer, scene, camera) {
    super(renderer)

    this.scenePass = new RenderPass(scene, camera)
    this.addPass(this.scenePass)

    this.noiseShaderPass = new NoiseShader()
    this.addPass(this.noiseShaderPass)
  }

  render (...args) {
    super.render(...args)
    this.noiseShaderPass.uniforms.amount.value += .01
  }
}
