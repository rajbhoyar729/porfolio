'use client'

import { useEffect, useRef } from 'react'
import { createScene, createParticles } from '../utils/three'
import { motion } from 'framer-motion'

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const { scene, camera, renderer } = createScene()
    const particles = createParticles(scene, 1000)

    containerRef.current.appendChild(renderer.domElement)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    const animate = () => {
      requestAnimationFrame(animate)

      particles.rotation.x += 0.001
      particles.rotation.y += 0.001

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

