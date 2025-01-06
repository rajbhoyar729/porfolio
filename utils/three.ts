import * as THREE from 'three'

export const createScene = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  pointLight.position.set(5, 5, 5)
  scene.add(pointLight)

  return { scene, camera, renderer }
}

export const createParticles = (scene: THREE.Scene, count: number) => {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10
    positions[i + 1] = (Math.random() - 0.5) * 10
    positions[i + 2] = (Math.random() - 0.5) * 10
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 })
  const particles = new THREE.Points(geometry, material)

  scene.add(particles)

  return particles
}

