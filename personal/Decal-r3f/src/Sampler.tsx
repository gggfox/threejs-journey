import * as React from 'react'

import { MeshSurfaceSampler } from 'three-stdlib'

import {
  Color,
  Group,
  InstancedBufferAttribute,
  InstancedMesh,
  Mesh,
  Object3D,
  Vector3
} from 'three'
import { GroupProps } from '@react-three/fiber'

type SamplePayload = {
  /**
   * The position of the sample.
   */
  position: Vector3
  /**
   * The normal of the mesh at the sampled position.
   */
  normal: Vector3
  /**
   * The vertex color of the mesh at the sampled position.
   */
  color: Color
}

export type TransformFn = (payload: TransformPayload, i: number) => void

type TransformPayload = SamplePayload & {
  /**
   * The dummy object used to transform each instance.
   * This object's matrix will be updated after transforming & it will be used
   * to set the instance's matrix.
   */
  dummy: Object3D
  /**
   * The mesh that's initially passed to the sampler.
   * Use this if you need to apply transforms from your mesh to your instances
   * or if you need to grab attributes from the geometry.
   */
  sampledMesh: Mesh
}

type Props = {
  /**
   * The mesh that will be used to sample.
   * Does not need to be in the scene graph.
   */
  mesh?: React.RefObject<Mesh>
  /**
   * The InstancedMesh that will be controlled by the component.
   * This InstancedMesh's count value will determine how many samples are taken.
   *
   * @see Props.transform to see how to apply transformations to your instances based on the samples.
   *
   */
  instances?: React.RefObject<InstancedMesh>
  /**
   * The NAME of the weight attribute to use when sampling.
   *
   * @see https://threejs.org/docs/#examples/en/math/MeshSurfaceSampler.setWeightAttribute
   */
  weight?: string
  /**
   * Transformation to be applied to each instance.
   * Receives a dummy object3D with all the sampled data ( @see TransformPayload ).
   * It should mutate `transformPayload.dummy`.
   *
   * @see ( @todo add link to example )
   *
   * There is no need to update the dummy's matrix
   */
  transform?: TransformFn
}

// Loads the amount of decals

export const Sampler = ({
  children,
  weight,
  transform,
  instances,
  mesh,
  count = 16,
  setBufferAttribute,
  ...props
}: React.PropsWithChildren<Props & GroupProps>) => {
  const group = React.useRef<Group>(null!)
  const instancedRef = React.useRef<InstancedMesh>(null!)
  const meshToSampleRef = React.useRef<Mesh>(null!)
  const samplesArray = React.useRef<InstancedBufferAttribute>(
    new InstancedBufferAttribute(new Float32Array(count * 16), 16)
  )

  React.useEffect(() => {
    instancedRef.current =
      instances?.current ??
      (group.current!.children.find((c) => c.hasOwnProperty('instanceMatrix')) as InstancedMesh)

    meshToSampleRef.current =
      mesh?.current ?? (group.current!.children.find((c) => c.type === 'Mesh') as Mesh)
  }, [children, mesh?.current, instances?.current])

  React.useEffect(() => {
    if (typeof meshToSampleRef.current === 'undefined') return

    const sampler = new MeshSurfaceSampler(meshToSampleRef.current as Mesh)

    if (weight) {
      sampler.setWeightAttribute(weight)
    }

    sampler.build()

    const position = new Vector3()
    const normal = new Vector3()
    const color = new Color()

    const dummy = new Object3D()

    meshToSampleRef.current.updateMatrixWorld(true)

    for (let i = 0; i < count; i++) {
      sampler.sample(position, normal, color)

      if (typeof transform === 'function') {
        transform(
          {
            dummy,
            sampledMesh: meshToSampleRef.current!,
            position,
            normal,
            color
          },
          i
        )
      } else {
        dummy.position.copy(position)
      }

      dummy.updateMatrix()

      if (instancedRef.current) {
        instancedRef.current.setMatrixAt(i, dummy.matrix)
      } else if (samplesArray.current) {
        dummy.matrix.toArray(samplesArray.current.array, i * 16)
      }
    }

    if (instancedRef.current) {
      instancedRef.current.instanceMatrix.needsUpdate = true
    } else if (samplesArray.current) {
      samplesArray.current.needsUpdate = true
      setBufferAttribute(samplesArray.current)
    }
  }, [children, mesh?.current, instances?.current])

  return (
    <group ref={group} {...props}>
      {children}
    </group>
  )
}
