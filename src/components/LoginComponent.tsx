"use client";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginComponent({ searchParams }: { searchParams: { message?: string; type?: string } }) {
  const message: Message | undefined = searchParams.message 
    ? { message: searchParams.message }
    : undefined;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
      <motion.div
        className="w-full h-full md:h-auto md:max-w-md mx-auto bg-black/50 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-gray-800 md:my-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {message && <FormMessage message={message} />}
        <form className="flex flex-col w-full gap-6">
          {/* Header */}
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100">
              Sign in
            </h1>
            <p className="text-gray-300 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                className="text-teal-400 font-medium hover:text-teal-300 hover:underline transition-colors duration-200"
                href="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label
                htmlFor="email"
                className="block text-gray-100 text-sm font-medium mb-3"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex justify-between items-center mb-3">
                <label
                  htmlFor="password"
                  className="text-gray-100 text-sm font-medium"
                >
                  Password
                </label>
                <Link
                  className="text-xs text-teal-400 hover:text-teal-300 underline transition-colors duration-200"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <SubmitButton
                pendingText="Signing In..."
                formAction={signInAction}
                className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-teal-700 via-teal-500 to-teal-700 hover:from-teal-600 hover:via-teal-400 hover:to-teal-600 text-white text-lg font-semibold tracking-wide transition-all duration-300 transform hover:scale-105"
              >
                Sign in
              </SubmitButton>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}