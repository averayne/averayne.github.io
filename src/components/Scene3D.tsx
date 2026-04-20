import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { FloatingOrb, ParticleField } from './FloatingOrbs'

type Vec3 = [number, number, number]

type ScenePalette = {
  primary: string
  secondary: string
  accent: string
  highlight: string
  glow: string
}

type OrbConfig = {
  position: Vec3
  scale: number
  color: string
  speed: number
  distort: number
}

type SceneLayout = {
  orbs: OrbConfig[]
  particles: {
    count: number
    spread: number
  }
}

type Scene3DProps = {
  scrollProgress?: number
  interactive?: boolean
  palette?: Partial<ScenePalette>
  layout?: Partial<SceneLayout>
  lowPower?: boolean
}

const defaultPalette: ScenePalette = {
  primary: '#0ae448',
  secondary: '#22d3ee',
  accent: '#84cc16',
  highlight: '#facc15',
  glow: '#38bdf8',
}

function resolveSceneConfig(paletteOverride?: Partial<ScenePalette>, layoutOverride?: Partial<SceneLayout>) {
  const palette: ScenePalette = { ...defaultPalette, ...paletteOverride }
  const layout: SceneLayout = {
    orbs: [
      {
        position: [-1.8, 0.8, 0.4],
        scale: 1.0,
        color: palette.primary,
        speed: 0.9,
        distort: 0.5,
      },
      {
        position: [1.9, -0.6, 0.6],
        scale: 0.85,
        color: palette.secondary,
        speed: 0.75,
        distort: 0.42,
      },
      {
        position: [2.6, 1.4, -0.4],
        scale: 0.7,
        color: palette.accent,
        speed: 0.8,
        distort: 0.46,
      },
      {
        position: [-2.5, -1.4, -0.5],
        scale: 0.78,
        color: palette.glow,
        speed: 0.7,
        distort: 0.4,
      },
      {
        position: [0.2, 2.1, 0.2],
        scale: 0.62,
        color: palette.highlight,
        speed: 0.95,
        distort: 0.52,
      },
    ],
    particles: {
      count: 260,
      spread: 15,
    },
  }

  const mergedLayout: SceneLayout = {
    ...layout,
    ...layoutOverride,
    orbs: layoutOverride?.orbs?.length ? layoutOverride.orbs : layout.orbs,
    particles: { ...layout.particles, ...layoutOverride?.particles },
  }

  return { palette, layout: mergedLayout }
}

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 0))
  const desired = useRef(new THREE.Vector3(0, 0, 6))

  useFrame(() => {
    const t = scrollProgress
    const x = Math.sin(t * Math.PI) * 1.5
    const y = t * 1.5
    const z = 6 - t * 2

    desired.current.set(x, y, z)
    camera.position.lerp(desired.current, 0.08)
    camera.lookAt(target.current)
  })

  return null
}

export function Scene3D({ scrollProgress = 0, interactive = true, palette, layout, lowPower = false }: Scene3DProps) {
  const cameraPosition = useMemo<Vec3>(() => [0, 0, 6], [])
  const resolved = useMemo(() => resolveSceneConfig(palette, layout), [palette, layout])
  const orbs = lowPower ? resolved.layout.orbs.slice(0, 2) : resolved.layout.orbs

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <CameraRig scrollProgress={scrollProgress} />
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} intensity={0.75} color={resolved.palette.secondary} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color={resolved.palette.accent} />
      <pointLight position={[0, 5, -10]} intensity={0.35} color={resolved.palette.highlight} />

      {!lowPower && (
        <Stars radius={80} depth={40} count={900} factor={2.2} saturation={0.3} fade speed={0.7} />
      )}
      <ParticleField
        count={resolved.layout.particles.count}
        spread={resolved.layout.particles.spread}
        palette={[resolved.palette.primary, resolved.palette.secondary, resolved.palette.accent, resolved.palette.glow]}
      />

      {orbs.map((orb, index) => (
        <Float key={`orb-${index}`} speed={1.0 + index * 0.12} rotationIntensity={0.35} floatIntensity={0.5}>
          <FloatingOrb
            position={orb.position}
            color={orb.color}
            speed={orb.speed}
            distort={orb.distort}
            scale={orb.scale}
          />
        </Float>
      ))}

      {interactive && !lowPower && (
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
      )}

      <Environment preset="night" />
    </Canvas>
  )
}
