import { Clock, Points } from 'three'
import { DepthShader } from '../shaders/depth-shader'

import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js'

export class Teapot extends Points {
  constructor () {
    const geometry = new TeapotGeometry(150, 10, true, true, true, false, false)
    const material = new DepthShader()

    super(geometry, material)
    this.time = new Clock(true)

    this.gui = ctx.gui.addFolder('Teapot')

    this.rotationSpeed = {
      x: .5,
      y: .5,
      z: 0,
    }

    this.gui.add(this.rotationSpeed, 'x').min(0).max(1.5).step(.01).name('Rotation speed x')
    this.gui.add(this.rotationSpeed, 'y').min(0).max(1.5).step(.01).name('Rotation speed y')
    this.gui.add(this.rotationSpeed, 'z').min(0).max(1.5).step(.01).name('Rotation speed z')

    this.positionDelta = 1000
    this.positionSpeed = .5
    this.gui.add(this, 'positionDelta').min(0).max(1000).step(1)
    this.gui.add(this, 'positionSpeed').min(0).max(1.5).step(.1)
  }

  render () {
    this.rotation.x = Math.sin(this.time.getElapsedTime() * this.rotationSpeed.x)
    this.rotation.y = Math.sin(this.time.getElapsedTime() * this.rotationSpeed.y)
    this.rotation.z = Math.sin(this.time.getElapsedTime() * this.rotationSpeed.z)
    this.position.z = Math.sin(this.time.getElapsedTime() * this.positionSpeed) * this.positionDelta - this.positionDelta / 2
  }
}
