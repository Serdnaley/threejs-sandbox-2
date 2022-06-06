import { Clock, PerspectiveCamera } from 'three'
import { effect } from '@vue/reactivity'
import { sizes } from '../services/sizes'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class DebugCamera extends PerspectiveCamera {
  constructor () {
    super(70, window.innerWidth / window.innerHeight, 1, 3000)

    this.position.x = 0
    this.position.y = 250
    this.position.z = 250
    this.lookAt(0, 0, 0)

    effect(() => {
      this.aspect = sizes.width / sizes.height
      this.updateProjectionMatrix()
    })

    this.orbitControls = new OrbitControls(this, ctx.canvas)
    this.flyControls = new FlyControls(this, ctx.canvas)
    this.flyControls.movementSpeed = 1000
    this.flyControls.domElement = ctx.canvas
    this.flyControls.rollSpeed = Math.PI / 24

    this.controlsType = 'orbitControls'
    Object.defineProperty(this, 'controls', {
      get: () => this[this.controlsType]
    })

    this.gui = ctx.gui.addFolder('Debug camera')
    this.gui.add(this, 'controlsType', ['flyControls', 'orbitControls'])

    this.gui.position = this.gui.addFolder('Position')
    this.gui.position.add(this.position, 'x').listen()
    this.gui.position.add(this.position, 'y').listen()
    this.gui.position.add(this.position, 'z').listen()

    this.gui.rotation = this.gui.addFolder('Rotation')
    this.gui.rotation.add(this.rotation, 'x', 0, 1, .01).listen()
    this.gui.rotation.add(this.rotation, 'y', 0, 1, .01).listen()
    this.gui.rotation.add(this.rotation, 'z', 0, 1, .01).listen()

    this.time = new Clock(true)
  }

  render () {
    this.controls.update(this.time.getDelta())
  }
}
