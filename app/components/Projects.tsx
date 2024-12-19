'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: "Heatwave Prediction and Alert System",
    description: "Developed an intelligent system to predict heatwaves and generate timely alerts using machine learning algorithms.",
    technologies: ["Python", "Flask", "Machine Learning"],
    link: "#"
  },
  {
    title: "Anveshaka: A Django-Based Search Engine",
    description: "Built a custom search engine to demonstrate web crawler functionality using Django.",
    technologies: ["Django", "HTML", "CSS", "Bootstrap"],
    link: "#"
  },
  {
    title: "WebSocket-Based Communication Platform",
    description: "Designed a real-time chat platform for university students using WebSockets and Django Channels.",
    technologies: ["Python", "Django", "WebSockets"],
    link: "#"
  },
  {
    title: "GitHub Readme Generator (Planned MVP)",
    description: "Prototyped an AI-powered tool to generate README files by analyzing GitHub repositories.",
    technologies: ["Python", "Generative AI"],
    link: "#"
  },
  {
    title: "LangChain-Powered Blog Writer",
    description: "Created a tool leveraging LangChain, CrewAI, and Google Serper API Wrapper to automate blog generation.",
    technologies: ["LangChain", "CrewAI", "Streamlit"],
    link: "#"
  }
]

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-gray-600 text-gray-200 px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className={`inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors ${
                  hoveredIndex === index ? 'underline' : ''
                }`}
              >
                Learn more <ArrowUpRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

