import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function Webgl() {
  // const refDiv = useRef(null);

  // useEffect(() => {
  //   // Tworzenie sceny, kamery i renderera
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
  //   const renderer = new THREE.WebGLRenderer();

  //   // Dodawanie renderera do elementu div
  //   refDiv.current.appendChild(renderer.domElement);
  //   renderer.setSize(window.innerWidth, window.innerHeight);

  //   // Ustawienie kamery
  //   camera.position.set(2, 2, 2);
  //   camera.lookAt(scene.position);

  //   // Dodawanie kształtu i materiału
  //   const geometry = new THREE.BoxGeometry(1, 1, 1);
  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  //   // Tworzenie siatki
  //   const grid = new THREE.Group();
  //   for(let i = -25; i < 25; i++) {
  //     for(let j = -25; j < 25; j++) {
  //       const cube = new THREE.Mesh(geometry, material);
  //       cube.position.set(i, 0, j);
  //       grid.add(cube);
  //     }
  //   }

  //   // Dodanie siatki do sceny
  //   scene.add(grid);

  //   // Funkcja animacji
  //   const animate = function () {
  //     requestAnimationFrame(animate);

  //     renderer.render(scene, camera);
  //   };

  //   animate();
  // }, []);

  // return <div ref={refDiv} />;
  return <div>SIEM WEB GL</div>;
}

export default Webgl;
