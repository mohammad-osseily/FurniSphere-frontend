'use client';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import axios from 'axios'; // For making API requests

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [modelObjects, setModelObjects] = useState<{ name: string, model: any }[]>([]); // Store loaded models

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth - 300, window.innerHeight); // Deduct space for chat box
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

    // Function to load multiple GLB files
    const loadModel = (name: string, url: string, position: [number, number, number], scale: [number, number, number]) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(url, (gltf) => {
        const model = gltf.scene;
        model.position.set(...position);
        model.scale.set(...scale);
        scene.add(model);
        setModelObjects(prev => [...prev, { name, model }]); // Store model with name
      }, undefined, (error) => {
        console.error('An error occurred while loading the model:', error);
      });
    };



    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Clean up on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);



export default ThreeScene;
