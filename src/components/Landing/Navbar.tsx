'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const { scrollY } = useScroll();

    // Simplified transformations
    const navHeight = useTransform(scrollY, [0, 100], ["6rem", "4rem"]);
    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
    );
    const textColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 1)", "rgba(31, 41, 55, 1)"] // From white to gray-800
    );

    const navItems = [
        { name: 'About', href: '/about' },
        { name: 'Vision', href: '/vision' },
        { name: 'Join', href: '/dashboard' },
    ];

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            style={{
                height: navHeight,
                background: navBackground,
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-4">
                {/* Logo section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center"
                >
                    <Link href="/">
                        <div className="flex items-center cursor-pointer group">
                            <motion.img
                                src="/images/logo.png"
                                alt="Indian ASI Logo"
                                className="h-16 w-auto cursor-pointer" // Adjusted height
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        </div>
                    </Link>
                </motion.div>

                {/* Navigation items */}
                <motion.div 
                    className="flex items-center space-x-8"
                >
                    {navItems.map((item) => (
                        <Link 
                            href={item.href} 
                            key={item.name}
                            onMouseEnter={() => setIsHovered(item.name)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <motion.span 
                                    className="font-medium text-lg transition-colors duration-300 relative"
                                    style={{ color: textColor }}
                                >
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
                                </motion.span>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </motion.nav>
    );
}

export default Navbar;