import React, { useEffect } from 'react';
import Phaser from 'phaser';

function Game() {
  useEffect(() => {
    let game;

    if (!game) {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 200 }
          }
        },
        scene: {
          preload: preload,
          create: create
        }
      };

      game = new Phaser.Game(config);
    }

    function preload() {
      this.load.setBaseURL('http://labs.phaser.io');
      this.load.image('sky', 'assets/skies/space3.png');
      this.load.image('logo', 'assets/sprites/phaser3-logo.png');
      this.load.image('red', 'assets/particles/red.png');
    }

    function create() {
      this.add.image(400, 300, 'sky');

      const particles = this.add.particles('red');

      const logo = this.physics.add.image(400, 100, 'logo');
      logo.setVelocity(100, 200);
      logo.setBounce(1, 1);
      logo.setCollideWorldBounds(true);

      particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
        follow: logo
      });
    }
  }, []);

  return <div id="phaser-game"></div>;
}


export default Game;
