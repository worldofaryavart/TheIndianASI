'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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

// Deterministic function to generate a number between 0 and 1
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ className }) => {
    const [mounted, setMounted] = useState(false);
    const [nodes, setNodes] = useState<Node[]>([]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    // const glowIntensity = useTransform<number, number>(
    //     [smoothMouseX, smoothMouseY],
    //     ([latestX, latestY]) => Math.abs((latestX as number) + (latestY as number)) / 200
    // );

    const initializeNodes = useCallback(() => {
        const networkNodes: Node[] = [];
        const numNodes = 40;

        for (let i = 0; i < numNodes; i++) {
            // Use deterministic values based on index
            const x = seededRandom(i * 2) * 100;
            const y = seededRandom(i * 2 + 1) * 100;
            
            networkNodes.push({
                id: i,
                x,
                y,
                connections: [],
                velocity: {
                    x: (seededRandom(i * 4) - 0.5) * 0.1,
                    y: (seededRandom(i * 4 + 1) - 0.5) * 0.1
                }
            });
        }

        // Create connections using deterministic logic
        networkNodes.forEach(node => {
            const numConnections = 2 + Math.floor(seededRandom(node.id * 100) * 4);
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
        setMounted(true);
        setNodes(initializeNodes());
    }, [initializeNodes]);

    useEffect(() => {
        if (!mounted) return;

        const interval = setInterval(() => {
            setNodes(prevNodes => {
                return prevNodes.map(node => {
                    let newX = node.x + node.velocity.x;
                    let newY = node.y + node.velocity.y;

                    if (newX <= 0 || newX >= 100) node.velocity.x *= -1;
                    if (newY <= 0 || newY >= 100) node.velocity.y *= -1;

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
    }, [mounted]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
    };

    if (!mounted) {
        return <div className={`absolute inset-0 overflow-hidden bg-gray-900/90 ${className}`} />;
    }

    return (
        <div 
            className={`absolute inset-0 overflow-hidden bg-gray-900/90 ${className}`}
            onMouseMove={handleMouseMove}
        >
            <div className="relative w-full h-full">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at ${smoothMouseX.get()}% ${smoothMouseY.get()}%, rgba(96, 165, 250, 0.15), transparent 50%)`
                    }}
                />
                <svg className="w-full h-full">
                    <defs>
                        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4B5563" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#4B5563" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    {nodes.map(node => 
                        node.connections.map(connectionId => {
                            const connectedNode = nodes.find(n => n.id === connectionId);
                            if (!connectedNode) return null;
                            
                            return (
                                <motion.line
                                    key={`${node.id}-${connectionId}`}
                                    x1={`${node.x}%`}
                                    y1={`${node.y}%`}
                                    x2={`${connectedNode.x}%`}
                                    y2={`${connectedNode.y}%`}
                                    stroke="url(#connectionGradient)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                />
                            );
                        })
                    )}
                    {nodes.map(node => (
                        <motion.circle
                            key={node.id}
                            cx={`${node.x}%`}
                            cy={`${node.y}%`}
                            r="3"
                            fill="#4B5563"
                            initial={{ scale: 0 }}
                            animate={{ 
                                scale: 1,
                                fill: "#4B5563"
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default NeuralNetwork;
