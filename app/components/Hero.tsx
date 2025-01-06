'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
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

    // Parallax effect
    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        scrub: true
      }, 
    });

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
      <div className="text-center relative z-10">
        <div ref={imageRef} className="mb-8 relative mx-auto h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full bg-gradient-to-r from-red-700 to-red-900 p-1">
          <Image
            src="/raj_pro.jpg"
            alt="Raj Bhoyar"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div ref={contentRef}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
            Raj Bhoyar
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
            B.Tech in Computer Science with a passion for building scalable software systems and applying advanced AI/ML technologies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="bg-gradient-to-r from-red-700 to-red-900 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 hover:from-red-800 hover:to-red-950 hover:shadow-lg transform hover:scale-105"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 hover:from-gray-800 hover:to-gray-950 hover:shadow-lg transform hover:scale-105"
            >
              View Projects
            </a>
          </div>
        </div>
        <a
          ref={resumeButtonRef}
          href="/path-to-your-resume.pdf"
          download
          className="mt-8 inline-flex items-center px-3 py-1 text-sm bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full hover:from-red-700 hover:to-red-900 transition-all duration-300 transform hover:scale-105"
        >
          <Download size={14} className="mr-1" />
          Resume
        </a>
      </div>
    </section>
  )
}

