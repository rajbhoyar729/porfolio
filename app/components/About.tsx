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
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Education</h3>
            <div className="mb-6">
              <h4 className="text-xl font-medium">Bachelor of Technology (Computer Engineering)</h4>
              <p className="text-gray-300">Bapurao Deshmukh College of Engineering, Sewagram, Wardha</p>
              <p className="text-gray-400">2021 – 2024</p>
            </div>
            <div>
              <h4 className="text-xl font-medium">High School (Computer Science)</h4>
              <p className="text-gray-300">Arts, Commerce, and Science College, Chandrapur</p>
              <p className="text-gray-400">2019 – 2020</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
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

