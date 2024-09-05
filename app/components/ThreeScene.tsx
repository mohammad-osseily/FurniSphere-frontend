'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Room with walls and floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const wallGeometry = new THREE.PlaneGeometry(20, 10);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 'gray', side: THREE.DoubleSide });
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 'black', side: THREE.DoubleSide });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.set(0, 5, -10);
    scene.add(wall1);

    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall2.position.set(10, 5, 0);
    wall2.rotation.y = -Math.PI / 2;
    scene.add(wall2);

    const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall3.position.set(0, 5, 10);
    scene.add(wall3);

    const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall4.position.set(-10, 5, 0);
    wall4.rotation.y = Math.PI / 2;
    scene.add(wall4);

    // Add a static table model
    const tableGeometry = new THREE.BoxGeometry(4, 0.5, 2);
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3);
    const tableMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });

    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(-8, 1.5, -6); // Move table in front of the chair
    scene.add(table);

    const loader = new OBJLoader();
    loader.load('/models/chair.obj', (obj) => {
      const chair = obj;
      chair.position.set(-8, 0, -8); // Move chair to the top corner
      chair.scale.set(1, 1, 1); // Adjust scale if necessary
      scene.add(chair);
    });
    const newTableLoader = new OBJLoader(); // Use OBJLoader or GLTFLoader depending on the format
    newTableLoader.load('/models/table.obj', (obj) => {
      const newTable = obj;
      newTable.position.set(2, 0, -5); // Adjust position inside the room
      newTable.scale.set(1, 1, 1); // Adjust scale if necessary
      scene.add(newTable);
    });

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);


};

export default ThreeScene;
