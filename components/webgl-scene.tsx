
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import * as THREE from 'three'

function ParticleField() {
  const points = useRef<THREE.Points>(null)
  const particleCount = 2000

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      
      colors[i * 3] = 0.3 + Math.random() * 0.7
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
    }
    
    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (points?.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
        />
        <bufferAttribute
          args={[colors, 3]}
          attach="attributes-color"
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  )
}

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef?.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-1, 1]}
    >
      <mesh ref={meshRef} position={[3, 0, -2]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color="#2779a7"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
}

function RefractiveLogo() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef?.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.3, 16, 32]} />
        <meshPhysicalMaterial
          color="#49c5b6"
          metalness={0.9}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

interface WebGLSceneProps {
  sceneType?: 'hero' | 'projects' | 'about' | 'contact'
}

export default function WebGLScene({ sceneType = 'hero' }: WebGLSceneProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <pointLight position={[-10, -10, -5]} color="#49c5b6" intensity={0.3} />
          
          {sceneType === 'hero' && (
            <>
              <RefractiveLogo />
              <FloatingCube />
            </>
          )}
          
          <ParticleField />
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade />
        </Suspense>
      </Canvas>
    </div>
  )
}
