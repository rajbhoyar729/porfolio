export default function About() {
  const skills = [
    "Python", "JavaScript", "C++", "Java",
    "Flask", "Django", "Node.js", "GraphQL", "RESTful APIs",
    "React.js", "Redux", "Tailwind CSS",
    "Git", "Docker", "CI/CD", "Kubernetes", "Streamlit",
    "TensorFlow", "PyTorch", "NumPy", "Pandas", "Scikit-learn",
    "Google Cloud Platform (GCP)", "AWS"
  ]

  return (
    <section id="about" className="py-16 md:py-20 bg-gradient-custom relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-300">Education</h3>
            <div className="mb-6">
              <h4 className="text-lg md:text-xl font-medium text-white">Bachelor of Technology (Computer Engineering)</h4>
              <p className="text-gray-300">Bapurao Deshmukh College of Engineering, Sewagram, Wardha</p>
              <p className="text-gray-400">2021 – 2024</p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-medium text-white">High School (Computer Science)</h4>
              <p className="text-gray-300">Arts, Commerce, and Science College, Chandrapur</p>
              <p className="text-gray-400">2019 – 2020</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-300">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-blue-800 text-gray-200 px-2 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

