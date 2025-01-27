import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Checkbox from "@/components/ui/Checkbox";
import { Dancing_Script } from "next/font/google";

// Import the Dancing Script font
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify desired weights
  variable: "--font-dancing-script", // Optional: create a CSS variable for the font
});

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 mt-8">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Tagline above Welcome Section */}
        <p
          className={`text-center text-2xl font-bold text-white mb-4 ${dancingScript.variable}`}
          style={{ fontFamily: "var(--font-dancing-script)" }}
        >
          Build, Learn, and <span className="text-blue-500">Collaborate</span>
        </p>

        {/* Welcome Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to the <span className="text-blue-500">AI Community</span>!
          </h1>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Step into a vibrant community of innovators, creators, and thinkers.
            Together, we&apos;re building the future of AI through
            collaboration, learning, and groundbreaking projects.
          </p>
        </section>

        {/* Signup Section */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Get Started
            </h2>

            {/* OAuth Buttons */}
            <div className="flex flex-col gap-4 mb-8">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-3 text-white hover:bg-gray-700 transition-all duration-300 border-gray-600"
              >
                <FaGoogle className="w-5 h-5 text-gray-300" />
                <span className="text-base font-medium">Continue with Google</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-3 text-white hover:bg-gray-700 transition-all duration-300 border-gray-600"
              >
                <FaGithub className="w-5 h-5 text-gray-300" />
                <span className="text-base font-medium">Continue with GitHub</span>
              </Button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Signup Form */}
            <form className="space-y-8">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full mt-1 bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 rounded-lg px-4 py-3"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="w-full mt-1 bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 rounded-lg px-4 py-3"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="w-full mt-1 bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 rounded-lg px-4 py-3"
                  placeholder="Enter your password"
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="terms"
                  className="border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md"
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the terms and conditions
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 font-medium text-lg"
              >
                Join Community
              </Button>
            </form>
          </div>
        </section>

        {/* Community Preview */}
        <section className="mt-16 text-center">
          {/* <h3 className="text-white text-xl mb-4">
            Already 10,000+ members collaborating
          </h3> */}
          <div className="flex justify-center gap-4 text-gray-400">
            <span>Projects Contribution</span>
            <span>•</span>
            <span>Daily Discussions</span>
            <span>•</span>
            <span>Weekly Events</span>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
