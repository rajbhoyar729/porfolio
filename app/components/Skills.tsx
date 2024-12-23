'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaPython, FaJava, FaJs, FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaCode, FaServer } from 'react-icons/fa'
import { SiExpress, SiDjango, SiFlask, SiGraphql, SiMongodb, SiRedis, SiSocketdotio,SiGithub, SiTensorflow } from 'react-icons/si'
import { GrTest } from 'react-icons/gr'
import { AiOutlineCloud } from 'react-icons/ai'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'Python', icon: FaPython },
  { name: 'JavaScript (ES6+)', icon: FaJs },
  { name: 'Next.Js', icon: FaReact },
  { name: 'C', icon: FaCode },
  { name: 'C++', icon: FaCode },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Express.js', icon: SiExpress },
  { name: 'React.js', icon: FaReact },
  { name: 'Django', icon: SiDjango },
  { name: 'Flask', icon: SiFlask },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'RESTful APIs', icon: FaServer },
  { name: 'AWS', icon: FaAws },
  { name: 'Git', icon: FaGitAlt },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Agile Methodologies', icon: FaCode },
  { name: 'Distributed Systems', icon: FaServer },
  { name: 'Microservices', icon: FaServer },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Redis', icon: SiRedis },
  { name: 'Socket.IO', icon: SiSocketdotio },
  { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'Testing (Pytest)', icon: GrTest },
  { name: 'Cloud Computing', icon: AiOutlineCloud },
]

export default function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!skillsRef.current) return

    const skillItems = skillsRef.current.querySelectorAll('.skill-item')

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
          trigger: skillsRef.current,
          start: 'top bottom-=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section id="skills" className="py-20 bg-gradient-custom">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Technical Skills</h2>
        <div ref={skillsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item flex flex-col items-center">
              <div className="text-4xl mb-3 text-blue-400">
                <skill.icon />
              </div>
              <span className="text-sm font-medium text-gray-300 text-center">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

