"use client";
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignUpComponent({
  searchParams,
}: {
  searchParams: { message?: string; type?: string };
}) {
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
        <form action={signUpAction} className="flex flex-col w-full gap-6">
          {/* Header */}
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100">
              Sign up
            </h1>
            <p className="text-gray-300 text-sm">
              Already have an account?{" "}
              <Link
                className="text-teal-400 font-medium hover:text-teal-300 hover:underline transition-colors duration-200"
                href="/sign-in"
              >
                Sign in
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
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-gray-100 text-sm font-medium mb-3"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-gray-100 text-sm font-medium mb-3"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-100 text-sm font-medium mb-3"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              />
            </div>

            <SubmitButton
                pendingText="Signing In..."
                formAction={signUpAction}
                className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-teal-700 via-teal-500 to-teal-700 hover:from-teal-600 hover:via-teal-400 hover:to-teal-600 text-white text-lg font-semibold tracking-wide transition-all duration-300 transform hover:scale-105">
              Sign up
            </SubmitButton>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
