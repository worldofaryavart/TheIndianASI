'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const { scrollY } = useScroll();

    // Added text color transformation
    const textColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 1)", "rgba(31, 41, 55, 1)"] // From white to gray-800
    );

    // Existing transformations...
    const navHeight = useTransform(scrollY, [0, 100], ["6rem", "4rem"]);
    const navPadding = useTransform(scrollY, [0, 100], ["1.5rem", "0.75rem"]);
    const logoScale = useTransform(scrollY, [0, 100], [1, 0.8]);
    const navSpacing = useTransform(scrollY, [0, 100], ["2rem", "1rem"]);
    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
    );
    const navBorderRadius = useTransform(scrollY, [0, 100], ["0px", "1rem"]);
    const navMargin = useTransform(scrollY, [0, 100], ["0", "1rem"]);
    const fontSize = useTransform(scrollY, [0, 100], ["1.125rem", "1rem"]);

    // Added top margin transformation
    const navTopMargin = useTransform(scrollY, [0, 100], ["0", "1rem"]);

    const navItems = [
        { name: 'About', href: '/about' },
        { name: 'Vision', href: '/vision' },
        { name: 'Join', href: '/join' },
    ];

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            style={{
                height: navHeight,
                padding: navPadding,
                background: navBackground,
                marginLeft: navMargin,
                marginRight: navMargin,
                marginTop: navTopMargin, // Added top margin
                borderRadius: navBorderRadius,
            }}
        >
            <motion.div 
                className="max-w-7xl mx-auto flex items-center justify-between"
                style={{ gap: navSpacing }}
            >
                {/* Logo section remains same */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center"
                    style={{ scale: logoScale }}
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

                <motion.div 
                    className="flex items-center"
                    style={{ gap: navSpacing }}
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
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <motion.span 
                                    className="font-medium text-lg transition-colors duration-300 relative" // Removed text-gray-800
                                    style={{ fontSize, color: textColor }} // Added color transform
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
            </motion.div>
        </motion.nav>
    );
}

export default Navbar;