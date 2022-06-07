import { AmbientLight, Color, PointLight, PointLightHelper, Scene } from 'three'
import { DebugCamera } from './DebugCamera'
import { MainCamera } from './MainCamera'
import { AppRenderer } from './AppRenderer'
import { Stats } from './Stats'
import { Teapot } from './Teapot'
import { Postprocessing } from './Postprocessing'

export class App extends Scene {
  constructor () {
    super()
    this.renderList = []
    this.renderer = new AppRenderer()

    this.gui = ctx.gui.addFolder('App')
    this.gui.open()

    this.isDebug = false
    this.gui.add(this, 'isDebug')

    this.stats = new Stats()
    this.renderList.push('stats')

    this.setupCamera()
    this.setupBackground()
    this.setupLight()

    this.teapot = new Teapot()
    this.add(this.teapot)
    this.renderList.push('teapot')

    this.postprocessing = new Postprocessing(this.renderer, this, this.camera)
  }

  setupCamera () {
    this.mainCamera = new MainCamera()
    this.debugCamera = new DebugCamera()

    Object.defineProperty(this, 'camera', {
      get: () => this.isDebug ? this.debugCamera : this.mainCamera,
    })

    this.renderList.push('camera')
  }

  setupBackground () {
    ctx.background = new Color(0x7678a4)
    this.gui.addColor({
      get background () {
        return `#${ctx.background.getHexString()}`
      },
      set background (value) {
        ctx.background.set(parseInt(value.slice(1), 16))
      },
    }, 'background', 'App')
    this.background = ctx.background;
  }

  setupLight () {
    const ambientLight = new AmbientLight(0xffffff, 0.1)
    this.add(ambientLight)

    this.pointLight = new PointLight(0xffffff, 1)
    this.pointLight.position.set(250, 500, 250)
    this.pointLight.castShadow = true
    this.pointLight.shadow.mapSize.width = 1024
    this.pointLight.shadow.mapSize.height = 1024

    this.pointLightHelper = new PointLightHelper(this.pointLight, 5)
    this.add(this.pointLightHelper)
  }

  render () {
    this.renderList.map(key => this[key].render())
    this.postprocessing.render(this, this.camera)
  }
}
