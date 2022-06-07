import { BufferGeometry, Ray, Vector3, Math } from 'three'

export const fillWithPoints = (geometry, count) => {
  const dummyTarget = new Vector3()
  const ray = new Ray()
  const size = new Vector3()
  geometry.computeBoundingBox()
  let bbox = geometry.boundingBox

  let points = []

  const dir = new Vector3(1, 1, 1).normalize()
  for (let i = 0; i < count; i++) {
    let p = setRandomVector(bbox.min, bbox.max);
    points.push(p);
  }
  let counter = 0
  while (counter < count) {
    let v = new Vector3(
      Math.randFloat(bbox.min.x, bbox.max.x),
      Math.randFloat(bbox.min.y, bbox.max.y),
      Math.randFloat(bbox.min.z, bbox.max.z),
    )
    if (isInside(v)) {
      points.push(v)
      counter++
    }
  }

  function setRandomVector(min, max){
    let v = new Vector3(
      Math.randFloat(min.x, max.x),
      Math.randFloat(min.y, max.y),
      Math.randFloat(min.z, max.z)
    );
    if (!isInside(v)){return setRandomVector(min, max);}
    return v;
  }

  function isInside (v) {

    ray.set(v, dir)
    let counter = 0

    let pos = geometry.attributes.position
    let faces = pos.count / 3
    let vA = new Vector3(), vB = new Vector3(),
      vC = new Vector3()
    for (let i = 0; i < faces; i++) {
      vA.fromBufferAttribute(pos, i * 3 + 0)
      vB.fromBufferAttribute(pos, i * 3 + 1)
      vC.fromBufferAttribute(pos, i * 3 + 2)
      if (ray.intersectTriangle(vA, vB, vC, false, dummyTarget)) counter++
    }

    return counter % 2 === 1
  }

  return new BufferGeometry().setFromPoints(points)
}
