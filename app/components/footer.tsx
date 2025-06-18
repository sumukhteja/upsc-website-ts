import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div>
            <div className="text-xl font-bold text-black mb-2">UPSC Master</div>
            <p className="text-gray-600 text-sm">Empowering civil services aspirants with the best tools.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
          </div>
          <div className="border-t border-gray-200 pt-4 text-center text-gray-500 text-sm w-full">
            <p>© 2025 UPSC Master. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
