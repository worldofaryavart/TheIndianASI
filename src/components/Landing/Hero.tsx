'use client';
import { motion } from 'framer-motion';
import NeuralNetwork from './NeuralNetwork';

const Hero = () => {
    return (
        <section className="relative min-h-screen overflow-hidden">
            <NeuralNetwork className="z-1" />

            <div className="relative z-10 container mx-auto px-6 py-32 flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
                    <motion.div
                        className="relative mb-8 p-3 rounded-lg border-2 border-transparent bg-opacity-20 backdrop-blur-sm"
                        style={{
                            background: 'linear-gradient(45deg, rgba(255, 0, 0, 0.1), rgba(0, 255, 0, 0.1), rgba(0, 0, 255, 0.1))',
                            borderImage: 'linear-gradient(45deg, rgba(255, 0, 0, 0.5), rgba(0, 255, 0, 0.5), rgba(0, 0, 255, 0.5)) 1',
                            borderRadius: '12px',
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
                                <div className="flex flex-wrap justify-center">
                                    {("INDIA'S LARGEST").split('').map((letter, index) => (
                                        <motion.span
                                            key={index}
                                            className="inline-block bg-clip-text text-transparent bg-[url('/images/hero.webp')] bg-cover bg-center"
                                            style={{
                                                fontSize: '6rem',
                                                lineHeight: '1.1',
                                                fontWeight: '800',
                                                backgroundPosition: `${-50 * index}px center`
                                            }}
                                            initial={{ y: -50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.5,
                                                ease: "easeOut"
                                            }}
                                            whileHover={{
                                                scale: 1.2,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            {letter === ' ' ? '\u00A0' : letter}
                                        </motion.span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap justify-center">
                                    {"AI COMMUNITY".split('').map((letter, index) => (
                                        <motion.span
                                            key={index}
                                            className="inline-block bg-clip-text text-transparent bg-[url('/images/hero.webp')] bg-cover bg-center"
                                            style={{
                                                fontSize: '6rem',
                                                lineHeight: '1.1',
                                                fontWeight: '800',
                                                backgroundPosition: `${-50 * index}px center`
                                            }}
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: index * 0.1 + 0.5,
                                                duration: 0.5,
                                                ease: "easeOut"
                                            }}
                                            whileHover={{
                                                scale: 1.2,
                                                rotateY: 180,
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            {letter === ' ' ? '\u00A0' : letter}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl mb-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 1.2,
                                duration: 0.8,
                                ease: "easeOut"
                            }}
                        >
                            <motion.span
                                className="inline-block"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 1.5,
                                    duration: 0.5,
                                    ease: "easeOut"
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                Join our thriving community of AI enthusiasts, developers, and innovators.
                            </motion.span>
                            <br />
                            <motion.span
                                className="inline-block"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 1.8,
                                    duration: 0.5,
                                    ease: "easeOut"
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                Together, we&apos;re shaping the future of AI in India.
                            </motion.span>
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8 }}
                        >
                            <motion.button
                                className="group relative px-8 py-4 rounded-full overflow-hidden"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{
                                    scale: 0.95,
                                    transition: { duration: 0.1 }
                                }}
                            >
                                <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 group-hover:scale-110 group-hover:rotate-2"></div>
                                <span className="relative text-white text-lg font-semibold tracking-wide">
                                    Join the Community
                                </span>
                                <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 blur-sm"></div>
                                </div>
                                <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 blur-md"></div>
                                </div>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;