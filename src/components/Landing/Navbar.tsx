'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isHovered, setIsHovered] = useState<string | null>(null);

    const navItems = [
        { name: 'About', href: '/about' },
        { name: 'Vision', href: '/vision' },
        { name: 'Join', href: '/join' },
    ];

    return (
        <nav className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center"
                >
                    <Link href="/">
                        <div className="flex items-center cursor-pointer group">
                            <motion.h1 
                                className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent
                                         font-sanskrit tracking-wide"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Indian ASI
                            </motion.h1>
                            <motion.div
                                className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-600 to-red-600
                                         group-hover:w-full transition-all duration-300"
                            />
                        </div>
                    </Link>
                </motion.div>

                <div className="flex space-x-8 items-center">
                    {navItems.map((item) => (
                        <Link 
                            href={item.href} 
                            key={item.name}
                            onMouseEnter={() => setIsHovered(item.name)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <span className="text-gray-800 font-medium text-lg hover:text-orange-600
                                               transition-colors duration-300 relative">
                                    {item.name}
                                    {isHovered === item.name && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />
                                    )}
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;