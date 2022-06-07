import { BoxGeometry, Clock, Points } from 'three'
import { DepthShader } from '../shaders/depth-shader'

export class Cube extends Points {
  constructor () {
    const geometry = new BoxGeometry(100, 100, 100)
    const material = new DepthShader()

    super(geometry, material)
    this.time = new Clock(true)

    this.gui = ctx.gui.addFolder('Cube')

    this.rotationSpeed = {
      x: 1,
      y: 1,
      z: 0,
    }

    this.gui.add(this.rotationSpeed, 'x').min(0).max(1.5).step(.01).name('Rotation speed x')
    this.gui.add(this.rotationSpeed, 'y').min(0).max(1.5).step(.01).name('Rotation speed y')
    this.gui.add(this.rotationSpeed, 'z').min(0).max(1.5).step(.01).name('Rotation speed z')

    this.positionDelta = 400
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
