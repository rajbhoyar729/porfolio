import Section from './Section'

export default function Experience() {
  return (
    <Section id="experience" className="bg-gradient-custom-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">Professional Experience</h2>
        <div className="bg-blue-950 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">Software Development Intern</h3>
          <p className="text-gray-300 mb-2">BlueKei Solutions, Pune (Hybrid)</p>
          <p className="text-gray-400 mb-4">Feb 2024 – May 2024</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Designed and implemented a distributed Node.js microservice architecture, improving system efficiency by 60%.</li>
            <li>Built and optimized a scalable data processing pipeline using Python, enhancing data processing speed by 70%.</li>
            <li>Developed a real-time monitoring solution using React.js and Socket.IO, reducing incident response time by 40%.</li>
            <li>Participated in design reviews with peers and stakeholders to decide among available technologies.</li>
            <li>Conducted code reviews for other developers, ensuring adherence to best practices and style guidelines.</li>
            <li>Contributed to existing documentation and adapted content based on product updates and user feedback.</li>
            <li>Triaged system issues and resolved bugs by analyzing their impact on service operations and quality.</li>
          </ul>
        </div>
      </div>
    </Section>
  )
}

