"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Checkbox from "@/components/ui/Checkbox";
import { Dancing_Script } from "next/font/google";
import axios from "axios";
import toast from "react-hot-toast";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
});

export default function JoinPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        toast.error("Failed to sign in");
      }

      if (result?.ok && result?.url) {
        router.push(result.url);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } 
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!formData.terms) {
    //   toast.error("Please accept the terms and conditions");
    //   return;
    // }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
          callbackUrl: "/dashboard",
        });

        if (result?.error) {
          toast.error("Failed to sign in");
        }

        if (result?.ok && result?.url) {
          router.push(result.url);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 mt-8">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <p
          className={`text-center text-2xl font-bold text-white mb-4 ${dancingScript.variable}`}
          style={{ fontFamily: "var(--font-dancing-script)" }}
        >
          Build, Learn, and <span className="text-blue-500">Collaborate</span>
        </p>

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

        <section className="max-w-2xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Get Started
            </h2>

            <div className="flex flex-col gap-4 mb-8">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-3 text-white hover:bg-gray-700 transition-all duration-300 border-gray-600"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
              >
                <FaGoogle className="w-5 h-5 text-gray-300" />
                <span className="text-base font-medium">Continue with Google</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-3 text-white hover:bg-gray-700 transition-all duration-300 border-gray-600"
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}
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

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 rounded-lg px-4 py-3"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 rounded-lg px-4 py-3"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 rounded-lg px-4 py-3"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* <div className="flex items-center space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md"
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the terms and conditions
                </label>
              </div> */}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 font-medium text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Join Community"}
              </Button>
            </form>
          </div>
        </section>

        <section className="mt-16 text-center">
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

