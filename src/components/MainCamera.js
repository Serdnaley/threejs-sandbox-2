import { PerspectiveCamera } from 'three'
import { effect } from '@vue/reactivity'
import { sizes } from '../services/sizes'

export class MainCamera extends PerspectiveCamera {
  constructor () {
    super(50, window.innerWidth / window.innerHeight, 1, 3000)

    this.position.y = 0
    this.position.z = 500

    effect(() => {
      this.aspect = sizes.width / sizes.height
      this.updateProjectionMatrix()
    })

    this.gui = ctx.gui.addFolder('Main camera')

    this.gui.position = this.gui.addFolder('Position')
    this.gui.position.add(this.position, 'x').listen()
    this.gui.position.add(this.position, 'y').listen()
    this.gui.position.add(this.position, 'z').listen()

    this.gui.rotation = this.gui.addFolder('Rotation')
    this.gui.rotation.add(this.rotation, 'x', 0, 1, .01).listen()
    this.gui.rotation.add(this.rotation, 'y', 0, 1, .01).listen()
    this.gui.rotation.add(this.rotation, 'z', 0, 1, .01).listen()
  }

  render () {}
}
