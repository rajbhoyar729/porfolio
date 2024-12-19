'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    // Increase canvas size dynamically
    const size = Math.min(window.innerWidth * 0.6, 500) // 60% of screen width, max 500px
    renderer.setSize(size, size)
    containerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.TorusKnotGeometry(10, 2, 150, 20)
    const material = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      roughness: 0.8,
      metalness:  1,
      emissive: 0x232323,
      wireframe: true,
      fog:true,
      roughnessMap:null,
      vertexColors:true,
      

     
    })
    const torusKnot = new THREE.Mesh(geometry, material)

    scene.add(torusKnot)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1.5)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    camera.position.z = 50 // Adjusted for larger canvas

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

      torusKnot.rotation.x += 0.01
      torusKnot.rotation.y += 0.01

      torusKnot.position.x = mouseX * 5
      torusKnot.position.y = mouseY * 5

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const newSize = Math.min(window.innerWidth * 0.6, 500)
      camera.aspect = 1
      camera.updateProjectionMatrix()
      renderer.setSize(newSize, newSize)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  const handleHover = (hovering: boolean) => {
    setIsHovered(hovering)
    controls.start({
      scale: hovering ? 1.1 : 1,
      transition: { duration: 0.3 },
    })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-6 sm:px-10 lg:px-20">
      <div className="text-center">
        <div className="mb-8 relative mx-auto h-40 w-40 overflow-hidden rounded-full bg-gray-700">
          <Image
            src="/raj_pro.jpg"
            alt="Raj Bhoyar"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Raj Bhoyar
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          B.Tech in Computer Science with a passion for building scalable
          software systems and applying advanced AI/ML technologies.
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
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-colors w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
        </div>
        <motion.div
          ref={containerRef}
          className="mt-8 mx-auto"
          style={{ width: '100%', maxWidth: '500px', height: 'auto', aspectRatio: '1 / 1' }}
          animate={controls}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          whileTap={{ scale: 0.9 }}
        />
      </div>
    </section>
  )
}
