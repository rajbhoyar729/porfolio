'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(300, 300)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.TorusKnotGeometry(8, 1.5, 200, 32, 5, 6)
    const material = new THREE.MeshPhongMaterial({
      color: 0x6366f1,
      shininess: 100,
      emissive:0x00,
      specular: 0xff023,
      wireframe: true,
      fog:true,
      vertexColors:true,
      
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

    const handleResize = () => {
      const size = Math.min(300, window.innerWidth - 40)
      camera.aspect = 1
      camera.updateProjectionMatrix()
      renderer.setSize(size, size)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  const handleHover = (hovering: boolean) => {
    setIsHovered(hovering)
    controls.start({
      scale: hovering ? 1.1 : 1,
      transition: { duration: 0.3 }
    })
  }

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Raj Bhoyar
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          B.Tech in Computer Science with a passion for building scalable software systems and applying advanced AI/ML technologies.
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
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
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-colors w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
        </div>
      </div>
      <motion.div 
        ref={mountRef}
        className="md:w-1/2 flex justify-center items-center"
        animate={controls}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        whileTap={{ scale: 0.9 }}
      />
    </section>
  )
}

