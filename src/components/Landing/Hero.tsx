'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import the AshokChakra component with no SSR
const AshokChakra = dynamic(() => import('./AshokChakra'), { ssr: false });

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 50,
                y: (e.clientY - window.innerHeight / 2) / 50,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-1 overflow-hidden ">
                {/* Deep tech-inspired gradient background */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(
                45deg,
                rgba(250, 238, 222, 1) 0%,  // Peach
                rgba(255, 153, 51, 0.6) 50%,  // Saffron
                rgba(18, 136, 18, 0.8) 100%  // India Green
            )`,
                    }}
                    animate={{
                        background: [
                            `linear-gradient(45deg, rgba(250, 238, 222, 1) 0%, rgba(255, 153, 51, 0.6) 50%, rgba(18, 136, 18, 0.8) 100%)`,
                            `linear-gradient(135deg, rgba(250, 238, 222, 1) 0%, rgba(255, 153, 51, 0.6) 50%, rgba(18, 136, 18, 0.8) 100%)`
                        ],
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 15,
                        ease: "easeInOut",
                    }}
                />

                {/* Animated tech particles */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                >
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-32">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6 font-sanskrit tracking-wide relative"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="inline-block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                                India's Largest
                            </span>
                            <br />
                            <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent animate-gradient-x">
                                AI Community
                            </span>
                            <motion.span
                                className="absolute -z-10 inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-xl"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl mb-8 text-gray-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Join thousands of AI enthusiasts, developers, and researchers in shaping
                            the future of artificial intelligence in India.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <button className="group relative px-8 py-4 rounded-full overflow-hidden">
                                <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 group-hover:scale-110"></div>
                                <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_70%)]"></div>
                                <span className="relative text-white font-semibold text-lg">
                                    Join Community
                                </span>
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* <motion.div 
                        className="md:w-1/2 perspective-1000"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            transform: `rotateY(${mousePosition.x * 0.05}deg) rotateX(${-mousePosition.y * 0.05}deg)`
                        }}
                    >
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl backdrop-blur-sm"></div>
                            <div className="relative w-full h-full">
                                <AshokChakra/>
                            </div>
                        </div>
                    </motion.div> */}
                </div>
            </div>

            {/* Animated background particles */}
            <div className="absolute inset-0 z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: Math.random() * 0.5 + 0.3,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [null, 0],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;