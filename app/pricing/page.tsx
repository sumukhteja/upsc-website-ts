"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star, Calendar, Gift } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Header from "../components/header"
import Footer from "../components/footer"

export default function PricingPage() {
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get("plan")

  const features = {
    free: [
      { name: "5 Practice Quizzes per day", included: true },
      { name: "Basic Geography Maps", included: true },
      { name: "Limited Study Resources", included: true },
      { name: "Community Access", included: true },
      { name: "Basic Progress Tracking", included: true },
      { name: "Unlimited Practice Quizzes", included: false },
      { name: "Advanced Interactive Maps", included: false },
      { name: "Complete Study Materials", included: false },
      { name: "Priority Support", included: false },
      { name: "Offline Mode", included: false },
      { name: "Performance Analytics", included: false },
    ],
    premium: [
      { name: "Unlimited Practice Quizzes", included: true },
      { name: "Advanced Interactive Maps", included: true },
      { name: "Complete Study Materials", included: true },
      { name: "Community Access", included: true },
      { name: "Advanced Progress Tracking", included: true },
      { name: "Performance Analytics", included: true },
      { name: "Offline Mode", included: true },
      { name: "Priority Support", included: true },
      { name: "Mock Test Series", included: true },
      { name: "Expert Mentorship", included: true },
      { name: "Custom Study Plans", included: true },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-black">UPSC Journey</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {selectedPlan
              ? `Complete your ${selectedPlan} plan selection and start your UPSC journey today!`
              : "Start free and upgrade when you're ready. All plans include access to our comprehensive UPSC preparation ecosystem."}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Current Plan - FREE */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 relative">
              <div className="absolute top-4 right-4">
                <Badge className="bg-blue-100 text-blue-800">Current Plan</Badge>
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">₹0</span>
                  <span className="text-gray-600 ml-2">/forever</span>
                </div>
                <p className="text-gray-600">Perfect for getting started with UPSC preparation</p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        feature.included ? "bg-black" : "bg-gray-100"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="h-3 w-3 text-white" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                    <span className={feature.included ? "text-gray-700" : "text-gray-400"}>{feature.name}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-gray-100 text-gray-600 cursor-not-allowed" disabled>
                Current Plan
              </Button>
            </div>

            {/* Yearly Plan - CENTERED */}
            <div
              className={`bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white relative shadow-xl transform ${
                selectedPlan === "yearly" ? "scale-105" : "scale-105"
              } transition-all duration-300 z-10`}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-purple-900 px-4 py-1 rounded-full font-bold text-sm flex items-center">
                <Star className="h-4 w-4 mr-1" fill="currentColor" />
                MOST POPULAR
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Yearly Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">₹799</span>
                  <span className="text-purple-100 ml-2">/year</span>
                  <div className="text-sm text-purple-100 mt-1">
                    <span className="line-through">₹1,800</span> - You save ₹1,001
                  </div>
                </div>
                <p className="text-purple-100">Best value for serious UPSC aspirants</p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-white">{feature.name}</span>
                  </li>
                ))}
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-white font-semibold">2 Months FREE</span>
                </li>
              </ul>

              <Button className="w-full bg-white text-purple-800 hover:bg-gray-100 py-3 text-lg font-semibold">
                Upgrade to Yearly
              </Button>

              <div className="text-center mt-4">
                <span className="text-sm text-purple-100 font-medium">💰 Save ₹1,001 per year!</span>
              </div>
            </div>

            {/* Monthly Plan - RIGHT SIDE */}
            <div
              className={`bg-white rounded-2xl border-2 p-8 relative shadow-lg ${
                selectedPlan === "monthly" ? "border-black transform scale-105" : "border-gray-200 hover:border-black"
              } transition-all duration-300`}
            >
              {selectedPlan === "monthly" && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black text-white">Selected</Badge>
                </div>
              )}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Plan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-black">₹199</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600">Flexible option for UPSC preparation</p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center mr-3">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature.name}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-semibold">
                Upgrade to Monthly
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Compare All Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-purple-700">
                    <div className="flex items-center justify-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" fill="currentColor" />
                      Yearly
                    </div>
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-black">Monthly</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-700">Practice Quizzes</td>
                  <td className="py-4 px-6 text-center text-gray-600">5 per day</td>
                  <td className="py-4 px-6 text-center text-black">Unlimited</td>
                  <td className="py-4 px-6 text-center text-black">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-700">Interactive Maps</td>
                  <td className="py-4 px-6 text-center text-gray-600">Basic</td>
                  <td className="py-4 px-6 text-center text-black">Advanced</td>
                  <td className="py-4 px-6 text-center text-black">Advanced</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-700">Study Materials</td>
                  <td className="py-4 px-6 text-center text-gray-600">Limited</td>
                  <td className="py-4 px-6 text-center text-black">Complete</td>
                  <td className="py-4 px-6 text-center text-black">Complete</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-700">Priority Support</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-black mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-black mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-700">Offline Mode</td>
                  <td className="py-4 px-6 text-center">
                    <X className="h-5 w-5 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-black mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="h-5 w-5 text-black mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 text-gray-700">Annual Cost</td>
                  <td className="py-4 px-6 text-center text-gray-600">₹0</td>
                  <td className="py-4 px-6 text-center text-black font-semibold">₹799 (Save ₹1,001)</td>
                  <td className="py-4 px-6 text-center text-gray-600">₹2,388</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
                cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a money-back guarantee?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your
                payment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, UPI, and net banking for Indian customers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why choose the yearly plan?</h3>
              <p className="text-gray-600">
                The yearly plan offers the same features as monthly but saves you ₹1,001 annually. It's our most popular
                choice for serious UPSC aspirants planning long-term preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to accelerate your <span className="text-white">UPSC preparation?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of successful candidates who chose UPSC Master for their civil services journey.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
              Get Started with Yearly
            </Button>
            <Link href="/contact">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
