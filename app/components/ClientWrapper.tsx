'use client'

import { useState, useEffect } from 'react'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
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

  return showChatBot ? children : null
}
