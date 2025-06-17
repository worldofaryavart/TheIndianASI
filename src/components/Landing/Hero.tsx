"use client";
import { motion } from "framer-motion";
import NeuralNetwork from "./NeuralNetwork";
import { useRouter } from "next/navigation";

const Hero = () => {

  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };
  
  return (
    <section className="relative min-h-screen overflow-hidden">
      <NeuralNetwork className="z-1" />

      <div className="relative z-10 container mx-auto px-6 py-32 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
          <motion.div
            className="relative mb-8 p-3 rounded-lg border-2 border-transparent bg-opacity-20 backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(45deg, rgba(255, 0, 0, 0.1), rgba(0, 255, 0, 0.1), rgba(0, 0, 255, 0.1))",
              borderImage:
                "linear-gradient(45deg, rgba(255, 0, 0, 0.5), rgba(0, 255, 0, 0.5), rgba(0, 0, 255, 0.5)) 1",
              borderRadius: "12px",
              borderImageSlice: 1,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-white text-sm font-medium">
              Join the revolution to make
            </span>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="relative z-10 flex flex-col items-center gap-4 mb-3">
                {/* Mobile-only layout */}
                <div className="md:hidden flex flex-col items-center">
                  {"INDIA'S OWN AI COMMUNITY"
                    .split(" ")
                    .map((word, wordIndex) => (
                      <div key={wordIndex} className="flex">
                        {word.split("").map((letter, letterIndex) => (
                          <motion.span
                            key={letterIndex}
                            className="inline-block bg-clip-text text-transparent bg-[url('/images/hero.webp')] bg-cover bg-center text-[3rem] leading-tight font-extrabold"
                            style={{
                              backgroundPosition: `${
                                -50 * (letterIndex + wordIndex * 7)
                              }px center`,
                            }}
                            initial={{
                              y: wordIndex < 2 ? -50 : 50,
                              opacity: 0,
                            }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              delay:
                                (letterIndex + wordIndex * 7) * 0.1 +
                                (wordIndex >= 2 ? 0.5 : 0),
                              duration: 0.5,
                              ease: "easeOut",
                            }}
                            whileHover={{
                              scale: 1.2,
                              rotateY: wordIndex >= 2 ? 180 : 0,
                              transition: { duration: 0.3 },
                            }}
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </div>
                    ))}
                </div>

                {/* Original desktop layout */}
                <div className="hidden md:block">
                  <div className="flex flex-wrap justify-center">
                    {"INDIA'S OWN".split("").map((letter, index) => (
                      <motion.span
                        key={index}
                        className="inline-block bg-clip-text text-transparent bg-[url('/images/hero.webp')] bg-cover bg-center text-[5rem] leading-tight font-extrabold"
                        style={{
                          backgroundPosition: `${-50 * index}px center`,
                        }}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center">
                    {"AI COMMUNITY".split("").map((letter, index) => (
                      <motion.span
                        key={index}
                        className="inline-block bg-clip-text text-transparent bg-[url('/images/hero.webp')] bg-cover bg-center text-[5rem] leading-tight font-extrabold"
                        style={{
                          backgroundPosition: `${-50 * (index + 2)}px center`,
                        }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: (index + 2) * 0.1 + 0.5,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotateY: 180,
                          transition: { duration: 0.3 },
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.5,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                Join our thriving community of AI enthusiasts, developers, and
                innovators.
              </motion.span>
              <br />
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.8,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                Together, we&apos;re shaping the future of AI in India.
              </motion.span>
            </motion.p>
            <motion.button
              className="group relative px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-teal-700 via-teal-500 to-teal-700 hover:from-teal-600 hover:via-teal-400 hover:to-teal-600 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              aria-label="Join the Community"
              onClick={handleClick} 
            >
              <span className="relative text-white text-lg font-semibold tracking-wide flex items-center justify-center gap-2">
                Join the Community
                <motion.div
                  className="w-0 h-0 overflow-hidden group-hover:w-6 group-hover:h-6 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;