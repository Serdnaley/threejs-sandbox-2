import { PCFSoftShadowMap, WebGLRenderer } from 'three'
import { effect } from '@vue/reactivity'
import { sizes } from '../services/sizes'

export class AppRenderer extends WebGLRenderer {
  constructor () {
    super({ canvas: ctx.canvas })

    this.setPixelRatio(window.devicePixelRatio)
    this.setSize(window.innerWidth, window.innerHeight)
    this.shadowMap.enabled = true
    this.shadowMap.type = PCFSoftShadowMap

    effect(() => {
      this.setSize(sizes.width, sizes.height)
      this.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
  }
}
