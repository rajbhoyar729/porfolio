'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { Download } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const resumeButtonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!heroRef.current || !imageRef.current || !contentRef.current || !resumeButtonRef.current) return

    const tl = gsap.timeline()

    tl.from(imageRef.current, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    })
    .from(contentRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    })
    .from(resumeButtonRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    })

    // Hover animation for resume button
    resumeButtonRef.current.addEventListener('mouseenter', () => {
      gsap.to(resumeButtonRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      })
    })

    resumeButtonRef.current.addEventListener('mouseleave', () => {
      gsap.to(resumeButtonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center bg-gradient-custom px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
      <div className="text-center relative z-10">
        <div ref={imageRef} className="mb-8 relative mx-auto h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full bg-gradient-custom-light p-1">
          <Image
            src="/raj_pro.png"
            alt="Raj Bhoyar"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div ref={contentRef}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Raj Bhoyar
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            B.Tech in Computer Science with a passion for building scalable software systems and applying advanced AI/ML technologies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors w-full sm:w-auto transform hover:scale-105"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-colors w-full sm:w-auto transform hover:scale-105"
            >
              View Projects
            </a>
          </div>
        </div>
        <a
          ref={resumeButtonRef}
          href="/rajbhoyar.pdf"
          download
          className="mt-8 inline-flex items-center px-3 py-1 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
        >
          <Download size={14} className="mr-1" />
          Resume
        </a>
      </div>
    </section>
  )
}

