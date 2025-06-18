export default function TestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-gray-600">If you can see this, routing is working!</p>
        <a href="/" className="text-blue-500 hover:underline mt-4 block">
          Go back to home
        </a>
      </div>
    </div>
  )
}
