import { Euler, Matrix4, Quaternion, Vector3 } from 'three'
import {useState} from "react"

export function LoopOverInstancedBufferAttribute({ children, buffer }) {
    const [m] = useState(() => new Matrix4())
    return (
      buffer &&
      [...new Array(buffer?.count)].map((_, i) => {
        const p = new Vector3()
        const q = new Quaternion()
        const r = new Euler()
        const s = new Vector3()
  
        m.fromArray(buffer.array, i * 16)
        m.decompose(p, q, s)
        r.setFromQuaternion(q)
  
        return children({ key: i, position: p, rotation: r, scale: s })
      })
    )
  }