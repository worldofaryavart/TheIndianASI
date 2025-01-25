'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const { scrollY } = useScroll();

    // All transformations at component level
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
    const fontSize = useTransform(scrollY, [0, 100], ["1.125rem", "1rem"]); // Moved here

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
                borderRadius: navBorderRadius,
            }}
        >
            <motion.div 
                className="max-w-7xl mx-auto flex items-center justify-between"
                style={{ gap: navSpacing }}
            >
                {/* Logo section remains same */}

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
                                    className="text-gray-800 font-medium text-lg transition-colors duration-300 relative"
                                    style={{ fontSize }} // Use precomputed value
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