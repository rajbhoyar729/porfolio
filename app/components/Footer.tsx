export default function Footer() {
  return (
    <footer className="bg-gradient-custom py-8 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Raj Bhoyar. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="#" className="text-gray-400 hover:text-white mx-2 transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white mx-2 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

