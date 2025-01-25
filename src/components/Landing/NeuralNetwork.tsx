'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

interface Node {
    id: number;
    x: number;
    y: number;
    connections: number[];
    velocity: { x: number; y: number };
}

interface NeuralNetworkProps {
    className?: string;
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ className }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    // Create glowing effect intensity based on mouse movement
    const glowIntensity = useTransform<number, number>(
        [smoothMouseX, smoothMouseY],
        ([latestX, latestY]) => Math.abs((latestX as number) + (latestY as number)) / 200
    );

    // Custom CSS properties for mouse position
    const customStyles = {
        '--mouse-x': smoothMouseX.get() + '%',
        '--mouse-y': smoothMouseY.get() + '%'
    } as React.CSSProperties;

    const initializeNodes = useCallback(() => {
        const networkNodes: Node[] = [];
        const numNodes = 40; // Increased number of nodes

        for (let i = 0; i < numNodes; i++) {
            networkNodes.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                connections: [],
                velocity: {
                    x: (Math.random() - 0.5) * 0.1,
                    y: (Math.random() - 0.5) * 0.1
                }
            });
        }

        // Create more dynamic connections
        networkNodes.forEach(node => {
            const numConnections = 2 + Math.floor(Math.random() * 4); // 2-5 connections
            const possibleConnections = networkNodes
                .filter(n => n.id !== node.id)
                .sort((a, b) => {
                    const distA = Math.hypot(a.x - node.x, a.y - node.y);
                    const distB = Math.hypot(b.x - node.x, b.y - node.y);
                    return distA - distB;
                })
                .slice(0, numConnections);

            node.connections = possibleConnections.map(n => n.id);
        });

        return networkNodes;
    }, []);

    useEffect(() => {
        setNodes(initializeNodes());

        // Animation loop for node movement
        const interval = setInterval(() => {
            setNodes(prevNodes => {
                return prevNodes.map(node => {
                    let newX = node.x + node.velocity.x;
                    let newY = node.y + node.velocity.y;

                    // Bounce off edges
                    if (newX <= 0 || newX >= 100) node.velocity.x *= -1;
                    if (newY <= 0 || newY >= 100) node.velocity.y *= -1;

                    // Keep within bounds
                    newX = Math.max(0, Math.min(100, newX));
                    newY = Math.max(0, Math.min(100, newY));

                    return {
                        ...node,
                        x: newX,
                        y: newY
                    };
                });
            });
        }, 50);

        return () => clearInterval(interval);
    }, [initializeNodes]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <div 
            className={`absolute inset-0 overflow-hidden bg-gray-900/90 ${className}`}
            onMouseMove={handleMouseMove}
        >
            <div className="relative w-full h-full">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at ${smoothMouseX.get()}% ${smoothMouseY.get()}%, rgba(96, 165, 250, 0.15), transparent 50%)`,
                        ...customStyles
                    }}
                />
                <svg className="w-full h-full">
                    <defs>
                        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#818CF8" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Connections */}
                    {nodes.map(node => 
                        node.connections.map(connectionId => {
                            const connectedNode = nodes.find(n => n.id === connectionId);
                            if (!connectedNode) return null;
                            
                            const distance = Math.hypot(
                                node.x - smoothMouseX.get(),
                                node.y - smoothMouseY.get()
                            );
                            
                            const isActive = distance < 25;
                            
                            return (
                                <motion.line
                                    key={`${node.id}-${connectionId}`}
                                    x1={`${node.x}%`}
                                    y1={`${node.y}%`}
                                    x2={`${connectedNode.x}%`}
                                    y2={`${connectedNode.y}%`}
                                    stroke="url(#connectionGradient)"
                                    strokeWidth={isActive ? "2" : "1"}
                                    strokeOpacity={isActive ? "0.8" : "0.3"}
                                    filter={isActive ? "url(#glow)" : ""}
                                    initial={{ pathLength: 0 }}
                                    animate={{ 
                                        pathLength: [0, 1],
                                        strokeDasharray: isActive ? "5,5" : "none"
                                    }}
                                    transition={{
                                        duration: 3,
                                        ease: "linear",
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                />
                            );
                        })
                    )}

                    {/* Nodes */}
                    {nodes.map(node => {
                        const distance = Math.hypot(
                            node.x - smoothMouseX.get(),
                            node.y - smoothMouseY.get()
                        );
                        
                        const isActive = distance < 25;
                        
                        return (
                            <g key={node.id}>
                                {/* Glow effect */}
                                <motion.circle
                                    cx={`${node.x}%`}
                                    cy={`${node.y}%`}
                                    r="6"
                                    fill="rgba(96, 165, 250, 0.3)"
                                    initial={{ scale: 0 }}
                                    animate={{ 
                                        scale: isActive ? [1, 1.5, 1] : 0,
                                        opacity: isActive ? [0.3, 0.1, 0.3] : 0
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                {/* Main node */}
                                <motion.circle
                                    cx={`${node.x}%`}
                                    cy={`${node.y}%`}
                                    r={isActive ? "4" : "2.5"}
                                    fill={isActive ? "#60A5FA" : "#4B5563"}
                                    filter={isActive ? "url(#glow)" : ""}
                                    initial={{ scale: 0 }}
                                    animate={{ 
                                        scale: isActive ? 1.5 : 1,
                                        fill: isActive ? "#60A5FA" : "#4B5563"
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 0.5, 0],
                            y: [0, -50],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default NeuralNetwork;
