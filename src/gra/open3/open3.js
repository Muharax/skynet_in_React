import React, { useRef, useEffect, useState } from 'react';

const TILE_SIZE = 32;
const TILE_GROUND = '#00FF00';  // Zielony
const TILE_WALL = '#8B4513';    // Brązowy

const generateMap = () => {
    let map = [];
    for (let y = 0; y < 20; y++) {
        let row = [];
        for (let x = 0; x < 20; x++) {
            if (x === 0 || y === 0 || x === 19 || y === 19) {
                row.push(TILE_WALL);
            } else {
                row.push(TILE_GROUND);
            }
        }
        map.push(row);
    }
    return map;
};

const map = generateMap();

const Game2D = () => {
    const canvasRef = useRef(null);
    const [playerPos, setPlayerPos] = useState({ x: TILE_SIZE * 10, y: TILE_SIZE * 10 });

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        function draw() {
            ctx.clearRect(0, 0, 640, 640);  // Czyści canvas

            // Rysowanie mapy
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    ctx.fillStyle = map[y][x];
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }

            // Rysowanie postaci
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(playerPos.x, playerPos.y, TILE_SIZE, TILE_SIZE);
        }

        draw();
    }, [playerPos]);

    const handleMouseMove = (e) => {
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - canvasBounds.left;
        const y = e.clientY - canvasBounds.top;

        // Ustalamy nową pozycję postaci
        setPlayerPos({
            x: Math.floor(x / TILE_SIZE) * TILE_SIZE,
            y: Math.floor(y / TILE_SIZE) * TILE_SIZE
        });
    };

    const handleKeyPress = (e) => {
        let newPosX = playerPos.x;
        let newPosY = playerPos.y;
        switch (e.key) {
            case "a":
                newPosX -= TILE_SIZE;
                break;
            case "d":
                newPosX += TILE_SIZE;
                break;
            case "w":
                newPosY -= TILE_SIZE;
                break;
            case "s":
                newPosY += TILE_SIZE;
                break;
            default:
                break;
        }

        // Aktualizuj pozycję tylko jeśli nie jest to ściana
        if (map[newPosY / TILE_SIZE][newPosX / TILE_SIZE] !== TILE_WALL) {
            setPlayerPos({
                x: newPosX,
                y: newPosY
            });
        }
    };

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);

        // Sprzątanie po komponencie
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        }
    }, [playerPos]);

    return <canvas ref={canvasRef} width="640" height="640" onClick={handleMouseMove} />;
};

export default Game2D;
