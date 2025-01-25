'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AshokChakra = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(500, 500);
        containerRef.current.appendChild(renderer.domElement);

        // Create Chakra
        const chakraGeometry = new THREE.TorusGeometry(5, 0.3, 16, 100);
        const chakraMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x0461C1,
            metalness: 0.7,
            roughness: 0.3,
            emissive: 0x002366,
            emissiveIntensity: 0.2,
        });
        const chakra = new THREE.Mesh(chakraGeometry, chakraMaterial);

        // Create spokes
        const spokeGroup = new THREE.Group();
        for (let i = 0; i < 24; i++) {
            const spokeGeometry = new THREE.BoxGeometry(4.5, 0.15, 0.15);
            const spoke = new THREE.Mesh(spokeGeometry, chakraMaterial);
            spoke.position.x = 2.5;
            spoke.rotation.z = (i * Math.PI) / 12;
            spokeGroup.add(spoke);
        }
        chakra.add(spokeGroup);

        scene.add(chakra);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x0461C1, 2);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0xffffff, 1);
        pointLight2.position.set(-10, -10, -10);
        scene.add(pointLight2);

        camera.position.z = 15;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            chakra.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            containerRef.current?.removeChild(renderer.domElement);
            scene.clear();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="w-full h-full"
            style={{ 
                background: 'transparent',
                minHeight: '500px'
            }}
        />
    );
};

export default AshokChakra;
