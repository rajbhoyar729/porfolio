import Section from './Section'

export default function About() {
  return (
    <Section id="about" className="bg-gradient-custom">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-300">Professional Summary</h3>
          <p className="text-gray-300 mb-6">
            Innovative Computer Science student graduating in 2024, specializing in JavaScript and Python development for
            scalable software solutions. Proven track record in writing product development code, participating in design reviews,
            and debugging system issues. Experienced in developing accessible technologies and contributing to documentation.
            Seeking a Software Development Engineer role to leverage my skills in creating innovative products.
          </p>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-300">Education</h3>
          <div className="mb-4">
            <h4 className="text-lg md:text-xl font-medium text-white">Bachelor of Technology in Computer Engineering (B.Tech)</h4>
            <p className="text-gray-300">Bapurao Deshmukh College of Engineering, Sewagram, Wardha</p>
            <p className="text-gray-400">2021 – 2024</p>
          </div>
          <p className="text-gray-300">
            <strong>Relevant coursework:</strong> Data Structures, Algorithms, Distributed Systems, Cloud Computing, Machine Learning,
            Web Development
          </p>
        </div>
      </div>
    </Section>
  )
}

