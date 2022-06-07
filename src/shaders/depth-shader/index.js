import { Color, ShaderMaterial, TextureLoader } from 'three'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

const constants = {
  RENDERER_HEIGHT: innerHeight,
  RENDERER_PIXEL_RATIO: window.devicePixelRatio,
}

export class DepthShader extends ShaderMaterial {
  constructor () {
    const options = {
      focusFarFadeOutLength: 500,
      focusFar: 2000,
      focusNearFadeOutLength: 150,
      focusNear: 700,
    }

    let uniforms = {
      pointTexture: {
        value: new TextureLoader().load('/assets/circle_solid_32x32_premultiplied.png')
      },
      viewport: {
        value: constants.RENDERER_HEIGHT / 1e3
      },
      PIXEL_RATIO: {
        value: constants.RENDERER_PIXEL_RATIO
      },
      focusNear: {
        value: options.focusNear
      },
      focusFar: {
        value: options.focusFar
      },
      focusFarFadeOutLength: {
        value: options.focusFarFadeOutLength
      },
      focusNearFadeOutLength: {
        value: options.focusNearFadeOutLength
      },
      delta: {
        value: 0,
      },
    }

    super({
      uniforms,
      depthWrite: false,
      vertexShader,
      fragmentShader,
      transparent: true,
    })

    this.dofParams = options
    this.setupGUI()
  }

  setupGUI () {
    this.gui = ctx.gui.addFolder('Shader')
    this.gui.add(this.dofParams, 'focusNear').min(0).max(2000).step(.001).onChange(val => this.uniforms.focusNear.value = val)
    this.gui.add(this.dofParams, 'focusNearFadeOutLength').min(0).max(1000).step(.001).onChange(val => this.uniforms.focusNearFadeOutLength.value = val)
    this.gui.add(this.dofParams, 'focusFar').min(0).max(2000).step(.001).onChange(val => this.uniforms.focusFar.value = val)
    this.gui.add(this.dofParams, 'focusFarFadeOutLength').min(0).max(1000).step(.001).onChange(val => this.uniforms.focusFarFadeOutLength.value = val)
  }
}
