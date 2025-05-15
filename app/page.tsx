import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-indigo-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to NextBlog
          </h1>
          <p className="text-white text-lg mb-8 max-w-xl mx-auto">
            A modern blogging platform where you can share your ideas with the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/posts" 
              className="inline-block bg-white text-indigo-700 hover:bg-gray-100 px-6 py-2 rounded font-medium"
            >
              View Posts
            </Link>
            <Link 
              href="/add-post" 
              className="inline-block bg-indigo-900 text-white hover:bg-indigo-800 px-6 py-2 rounded font-medium"
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Choose NextBlog?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Easy Content Creation</h3>
              <p className="text-gray-700">Create and publish your content with a simple, intuitive interface.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Beautiful Design</h3>
              <p className="text-gray-700">Enjoy a clean, modern interface that puts your content in the spotlight.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Lightning Fast</h3>
              <p className="text-gray-700">Built with Next.js for incredible performance and user experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full bg-indigo-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to start blogging?</h2>
          <p className="text-white text-lg mb-6 max-w-xl mx-auto">
            Join our community today and start sharing your thoughts
          </p>
          <Link 
            href="/login" 
            className="inline-block bg-white text-indigo-700 hover:bg-gray-100 px-6 py-2 rounded font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
