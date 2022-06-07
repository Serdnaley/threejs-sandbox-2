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
      focusFarFadeOutLength: 100,
      focusFar: 800,
      focusNearFadeOutLength: 50,
      focusNear: 400,
    }

    let uniforms = {
      pointTexture: {
        value: new TextureLoader().load('/assets/circle_solid_32x32_premultiplied.png')
      },
      // pointTextureAlpha: {
      //   value: new TextureLoader().load('/assets/circle_alpha_32x32_premultiplied.png')
      // },
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
      color: {
        value: new Color(0xffffff)
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
    this.gui.add(this.dofParams, 'focusNear').min(0).max(1000).step(.001).onChange(val => this.uniforms.focusNear.value = val)
    this.gui.add(this.dofParams, 'focusNearFadeOutLength').min(0).max(1000).step(.001).onChange(val => this.uniforms.focusNearFadeOutLength.value = val)
    this.gui.add(this.dofParams, 'focusFar').min(0).max(1000).step(.001).onChange(val => this.uniforms.focusFar.value = val)
    this.gui.add(this.dofParams, 'focusFarFadeOutLength').min(0).max(1000).step(.001).onChange(val => this.uniforms.focusFarFadeOutLength.value = val)
  }
}
