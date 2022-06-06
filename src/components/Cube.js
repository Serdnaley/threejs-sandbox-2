import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

export class Cube extends Mesh {
  constructor () {
    const geometry = new BoxGeometry(100, 100, 100)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })

    super(geometry, material)
  }

  render () {
    this.rotateX(0.01)
    this.rotateY(0.01)
  }
}
