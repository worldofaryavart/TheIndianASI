'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import NeuralNetwork from './NeuralNetwork';

// Dynamically import the AshokChakra component with no SSR
const AshokChakra = dynamic(() => import('./AshokChakra'), { ssr: false });

const Hero = () => {
    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Neural Network Background */}
            <NeuralNetwork className="z-1" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-32 flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
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
                            <div className="relative z-10 flex flex-col items-center gap-4">
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ 
                                    delay: 1.5,
                                    duration: 0.5,
                                    ease: "easeOut"
                                }}
                            >
                                Join our thriving community of AI enthusiasts, developers, and innovators.
                            </motion.span>
                            <br />
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ 
                                    delay: 1.8,
                                    duration: 0.5,
                                    ease: "easeOut"
                                }}
                            >
                                Together, we're shaping the future of AI in India.
                            </motion.span>
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8 }}
                        >
                            <button className="group relative px-8 py-4 rounded-full overflow-hidden">
                                <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 group-hover:scale-110"></div>
                                <span className="relative text-white text-lg font-semibold">Join the Community</span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;