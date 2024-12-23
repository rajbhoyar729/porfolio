'use client'

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react'
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Define the FormData and Errors interfaces
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Errors>({})
  const formRef = useRef<HTMLFormElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!formRef.current || !contactInfoRef.current) return

    const formElements = formRef.current.elements
    const contactInfoItems = contactInfoRef.current.children

    gsap.fromTo(
      formElements,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top bottom-=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      contactInfoItems,
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: 'top bottom-=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const validateForm = (): Errors => {
    let errors: Errors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'
    if (!formData.message.trim()) errors.message = 'Message is required'
    return errors
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length === 0) {
      // Submit the form
      console.log('Form submitted:', formData)
      // Reset form after submission
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-custom-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div ref={contactInfoRef}>
            <p className="text-gray-300 mb-6">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4 text-blue-400" />
                <a href="mailto:rbhoyar729@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  rbhoyar729@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-4 text-blue-400" />
                <a href="tel:+919309943858" className="text-gray-300 hover:text-white transition-colors">
                  +91 9309943858
                </a>
              </div>
              <div className="flex items-center">
                <Linkedin className="w-6 h-6 mr-4 text-blue-400" />
                <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center">
                <Github className="w-6 h-6 mr-4 text-blue-400" />
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-blue-900 border border-blue-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 bg-blue-900 border border-blue-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full px-4 py-2 bg-blue-900 border border-blue-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <Send className="mr-2" size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
