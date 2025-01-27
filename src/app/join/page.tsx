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
            <h2 className="text-2xl font-bold text-white mb-6">Get Started</h2>

            {/* OAuth Buttons */}
            <div className="flex gap-4 mb-8">
              <Button variant="outline" className="w-full gap-2">
                <FaGoogle className="w-5 h-5" />
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <FaGithub className="w-5 h-5" />
                Continue with GitHub
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
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" className="border-gray-600" />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the terms and conditions
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Join Community
              </Button>
            </form>
          </div>
        </section>

        {/* Community Preview */}
        <section className="mt-16 text-center">
          <h3 className="text-white text-xl mb-4">
            Already 10,000+ members collaborating
          </h3>
          <div className="flex justify-center gap-4 text-gray-400">
            <span>500+ Projects</span>
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
