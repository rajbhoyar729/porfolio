'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaPython, FaJava, FaJs, FaReact, FaNodeJs, FaAws, FaDocker } from 'react-icons/fa'
import { SiKubernetes, SiTensorflow } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

interface Skill {
  name: string
  proficiency: number
  icon: React.ReactNode
}

const skills: Skill[] = [
  { name: 'Python', proficiency: 90, icon: <FaPython /> },
  { name: 'Java', proficiency: 85, icon: <FaJava /> },
  { name: 'JavaScript', proficiency: 80, icon: <FaJs /> },
  { name: 'React', proficiency: 85, icon: <FaReact /> },
  { name: 'Node.js', proficiency: 80, icon: <FaNodeJs /> },
  { name: 'AWS', proficiency: 75, icon: <FaAws /> },
  { name: 'Docker', proficiency: 70, icon: <FaDocker /> },
  { name: 'Kubernetes', proficiency: 65, icon: <SiKubernetes /> },
  { name: 'Machine Learning', proficiency: 70, icon: <SiTensorflow /> },
]

export default function SkillProficiencyMeter() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const skillItems = containerRef.current.querySelectorAll('.skill-item')

    gsap.fromTo(
      skillItems,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <div ref={containerRef} className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Skill Proficiency</h3>
      <div className="grid grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-item">
            <motion.div
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-4xl mb-2 text-blue-600">{skill.icon}</div>
              <div className="text-sm font-medium text-gray-700 mb-1">{skill.name}</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-blue-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

