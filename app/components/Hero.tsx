'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    const updateSize = () => {
      const size = Math.min(300, window.innerWidth - 40, window.innerHeight / 2)
      renderer.setSize(size, size)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }

    updateSize()
    containerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.TorusKnotGeometry(5, 1.5, 200, 32, 3, 4)
    const material = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      shininess: 100,
      specular: 0x3b82f6,
      wireframe: true,
    })
    const torusKnot = new THREE.Mesh(geometry, material)

    scene.add(torusKnot)

    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 0, 10)
    scene.add(light)

    camera.position.z = 20

    const orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.enableZoom = false

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)

      torusKnot.rotation.x += 0.005
      torusKnot.rotation.y += 0.005

      torusKnot.position.x = mouseX * 2
      torusKnot.position.y = mouseY * 2

      renderer.render(scene, camera)
    }

    animate()

    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateSize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-custom px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
      <div className="text-center relative z-10 bg-opacity-50">
        <div className="mb-8 relative mx-auto h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full bg-gradient-custom-light p-1">
          <Image
            src="/raj_pro.jpg"
            alt="Raj Bhoyar"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Raj Bhoyar
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          B.Tech in Computer Science with a passion for building scalable software systems and applying advanced AI/ML technologies.
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
          <motion.a
            href="#projects"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-colors w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
        </div>
      </div>
      <div   className="relative flex  justify-center items-center inset-0 w-full h-full pointer-events-none">
      <div 
        ref={containerRef}
        className="relative  inset-0  pointer-events-none"
        style={{ zIndex: 0 }}
      />
      </div>
    </section>
  )
}

