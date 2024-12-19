export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Software Development Intern</h3>
          <p className="text-gray-300 mb-2">BlueKei Solutions, Pune (Hybrid)</p>
          <p className="text-gray-400 mb-4">Feb 2024 – May 2024</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Reduced database query execution time by 60% through an ORM abstraction layer for Neo4j.</li>
            <li>Developed a role-based web application enabling efficient CRUD operations for over 250 data nodes, enhancing system usability by 70%.</li>
            <li>Automated query management using dynamic dropdowns, improving process efficiency by 50%.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

