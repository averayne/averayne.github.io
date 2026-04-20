import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

type Vec3 = [number, number, number]

export function FloatingOrb({
  position = [0, 0, 0],
  color = '#22d3ee',
  speed = 1,
  distort = 0.4,
  scale = 1,
}: {
  position?: Vec3
  color?: string
  speed?: number
  distort?: number
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3
    meshRef.current.rotation.x = t * 0.2
    meshRef.current.rotation.z = t * 0.15
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={3}
        roughness={0.25}
        metalness={0.55}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}


export function ParticleField({
  count = 200,
  spread = 12,
  palette,
}: {
  count?: number
  spread?: number
  palette?: string[]
}) {
  const points = useRef<THREE.Points>(null!)

  const pointTexture = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    ctx.clearRect(0, 0, size, size)
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  const { positions, colors } = useMemo(() => {
    const positionsArray = new Float32Array(count * 3)
    const colorsArray = new Float32Array(count * 3)
    const resolvedPalette = (palette?.length ? palette : ['#22d3ee', '#a3e635', '#f97316', '#f472b6']).map(
      (hex) => new THREE.Color(hex)
    )

    for (let i = 0; i < count; i += 1) {
      positionsArray[i * 3] = (Math.random() - 0.5) * spread
      positionsArray[i * 3 + 1] = (Math.random() - 0.5) * spread
      positionsArray[i * 3 + 2] = (Math.random() - 0.5) * spread
      const c = resolvedPalette[Math.floor(Math.random() * resolvedPalette.length)]
      colorsArray[i * 3] = c.r
      colorsArray[i * 3 + 1] = c.g
      colorsArray[i * 3 + 2] = c.b
    }

    return { positions: positionsArray, colors: colorsArray }
  }, [count, spread])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    points.current.rotation.y = t * 0.05
    points.current.rotation.x = Math.sin(t * 0.03) * 0.1
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.55}
        alphaTest={0.4}
        map={pointTexture}
      />
    </points>
  )
}
