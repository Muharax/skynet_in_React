import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Room() {
    return (
        <>
            {/* Ściany */}
            <mesh position={[0, 0.5, -2]} scale={[4.1, 1, 0.1]}>
                <boxGeometry />
                <meshStandardMaterial color="yellow" />
            </mesh>
            <mesh position={[0, 0.5, 2]} scale={[4.1, 1, 0.1]}>
                <boxGeometry />
                <meshStandardMaterial color="yellow" />
            </mesh>
            <mesh position={[-2, 0.5, 0]} scale={[0.1, 1, 4]}>
                <boxGeometry />
                <meshStandardMaterial color="yellow" />
            </mesh>
            <mesh position={[2, 0.5, 0]} scale={[0.1, 1, 4]}>
                <boxGeometry />
                <meshStandardMaterial color="yellow" />
            </mesh>

            {/* Podłoga */}
            <mesh position={[0, 0, 0]} scale={[4, 0.1, 4]}>
                <boxGeometry />
                <meshStandardMaterial color="#d9d9d9" />
            </mesh>

            {/* Łóżko */}
            <mesh position={[-1, 0.3, 1.5]} scale={[1.5, 0.3, 0.8]}>
                <boxGeometry />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Drzwi */}
            <mesh position={[1.5, 0.5, 0]} scale={[0.1, 1, 1.5]}>
                <boxGeometry />
                <meshStandardMaterial color="#A0522D" />
            </mesh>

            {/* Szafka */}
            <mesh position={[-1, 0.25, -1.5]} scale={[0.7, 0.5, 0.7]}>
                <boxGeometry />
                <meshStandardMaterial color="#6A5ACD" />
            </mesh>

            {/* Światło */}
            <ambientLight intensity={0.5} />
        </>
    );
}

function Room3D() {
    return (
        <Canvas camera={{ position: [2, 2, 2], rotation: [-Math.PI / 4, Math.atan(1 / Math.sqrt(2)), 0] }}>
            <Room />
            <OrbitControls />
        </Canvas>
    );
}

export default Room3D;
