'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ChatBot from './components/ChatBot'

const Hero = dynamic(() => import('./components/Hero'), { ssr: false })

export default function Home() {
  const [showChatBot, setShowChatBot] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById('skills')
      if (skillsSection) {
        const skillsSectionBottom = skillsSection.offsetTop + skillsSection.offsetHeight
        setShowChatBot(window.scrollY < skillsSectionBottom)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      {showChatBot && <ChatBot />}
    </main>
  )
}

