import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FF2D20] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-xl font-bold text-[#FF2D20]">UPSC Master</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Your complete UPSC preparation platform with interactive learning tools and comprehensive study materials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FF2D20] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF2D20] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF2D20] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF2D20] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Study Materials */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Study Materials</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quiz" className="text-gray-600 hover:text-[#FF2D20] transition-colors">
                  Quiz Practice
                </Link>
              </li>
              <li>
                <Link href="/maps" className="text-gray-600 hover:text-[#FF2D20] transition-colors">
                  Interactive Maps
                </Link>
              </li>
              <li>
                <Link href="/answer-writing" className="text-gray-600 hover:text-[#FF2D20] transition-colors">
                  Answer Writing
                </Link>
              </li>
              <li>
                <Link href="/mock-tests" className="text-gray-600 hover:text-[#FF2D20] transition-colors">
                  Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/syllabus" className="text-gray-600 hover:text-[#FF2D20] transition-colors">
                  UPSC Syllabus
                </Link>
              </li>
              <li>
                <Link href="/previous-papers" className="text-gray-600 hover:text-[#FF2D20] transition-colors">
                  Previous Papers
                </Link>
              </li>
              <li>
                <Link href="/current-affairs" className="text-gray-600 hover:text-[#FF2D20] transition-colors">
                  Current Affairs
                </Link>
              </li>
              <li>
                <Link href="/study-plan" className="text-gray-600 hover:text-[#FF2D20] transition-colors">
                  Study Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>support@upscmaster.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>New Delhi, India</span>
              </li>
            </ul>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-600 hover:text-[#FF2D20] transition-colors text-sm">
                Help Center
              </Link>
              <Link href="/privacy" className="block text-gray-600 hover:text-[#FF2D20] transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-600 hover:text-[#FF2D20] transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2024 UPSC Master. All rights reserved.</p>
            <p className="text-sm text-gray-600 mt-2 md:mt-0">Made with ❤️ for UPSC aspirants</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
