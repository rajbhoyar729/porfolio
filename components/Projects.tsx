'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from './Section'

gsap.registerPlugin(ScrollTrigger)

const projects = [
   {
    title: "Distributed Weather Prediction System",
    description: "Designed and built a distributed machine learning system using TensorFlow, achieving 85% prediction accuracy. Architected a fault-tolerant serverless solution using AWS Lambda and API Gateway.",
    technologies: ["Python", "TensorFlow", "AWS Lambda", "Pytest"],
    image: "/dwps.jpg",
    link: "#"
  },
  {
    title: "Real-time E-commerce Analytics Platform",
    description: "Built a distributed computing system capable of processing 1000+ events per second across multiple platforms. Implemented scalable distributed index system using Redis pub/sub, reducing latency by 50%.",
    technologies: ["Node.js", "Express.js", "Socket.IO", "MongoDB", "Redis"],
    image: "/reap.jpg",
    link: "#"
  },
  {
    title: "AI-Powered Code Review Assistant",
    description: "Designed and built an AI system that reduced manual code review time by 40%. Engineered scalable RESTful API architecture with Flask for seamless integration with GitHub services.",
    technologies: ["Python", "Flask", "OpenAI API", "React.js"],
    image: "/Apcra.jpg",
    link: "#"
  },
  {
    title: "E-commerce Platform",
    description: "Built a scalable e-commerce platform with real-time inventory management, secure payment processing, and personalized product recommendations.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Redis"],
    image: "/eco.jpeg",
    link: "#"
  },
  {
    title: "Real-time chat Web Application",
    description: "Engineered a scalable real-time chat application with features including instant messaging, group chats, and file sharing. Implemented WebSocket for real-time communication and MongoDB for message persistence.",
    technologies: ["WebRTC", "Socket.io", "Express.js", "PostgreSQL", "Docker"],
    image: "/chat.jpeg",
    link: "#"
  },
 
]

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!projectsRef.current) return

    const projectItems = projectsRef.current.querySelectorAll('.project-item')

    gsap.fromTo(
      projectItems,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top bottom-=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <Section id="projects" className="bg-gradient-custom" data-barba="container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">Key Projects</h2>
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-item group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl" data-barba="container">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gradient-to-r from-red-700 to-red-900 text-white text-xs px-2 py-1 rounded hover:from-red-800 hover:to-red-950 transition-colors duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors group"
                  >
                    View Project <ArrowUpRight className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

