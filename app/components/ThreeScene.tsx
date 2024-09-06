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

    // Load multiple GLB models with positions and scales
    const models = [
      { name: 'Armchair', url: '/models/Armchair.glb', position: [-8, 0, -8], scale: [3, 3, 3] },
      { name: 'Desk', url: '/models/desk.glb', position: [2, 0, -5], scale: [3, 3, 3] },
      { name: 'Sofa', url: '/models/sofa.glb', position: [4, 0, 6], scale: [3, 3, 3] },
      { name: 'Small Object', url: '/models/so.glb', position: [-4, 0, -2], scale: [3, 3, 3] },
      { name: 'Modern Chair', url: '/models/Modern Chair of mine1.glb', position: [6, 0, -4], scale: [3, 3, 3] },
      { name: 'Table', url: '/models/table1.glb', position: [0, 0, 0], scale: [3, 3, 3] },
    ];

    models.forEach(({ name, url, position, scale }) => {
      loadModel(name, url, position, scale);
    });

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

  // Function to interpret natural language inputs and move objects along the X or Z axis
  const parseMovement = (object: any, direction: string) => {
    const movementUnit = 1; // Default movement unit

    switch (direction.toLowerCase()) {
      case 'up': // Move along the Z-axis (forward/backward)
        object.position.z -= movementUnit;
        break;
      case 'down': // Move along the Z-axis (forward/backward)
        object.position.z += movementUnit;
        break;
      case 'left': // Move along the X-axis (left/right)
        object.position.x -= movementUnit;
        break;
      case 'right': // Move along the X-axis (left/right)
        object.position.x += movementUnit;
        break;
      default:
        console.error('Unknown direction:', direction);
    }

    // Ensure the Y-axis (vertical height) remains unchanged
    object.position.y = 0;
  };

  const handleChatSubmit = async () => {
    try {
      // Build the prompt with context
      const chatPrompt = `You are managing a 3D scene. When the user asks to move an object "up", "down", "left", or "right", they mean to change the position of the object in the 3D space. The Y-axis should always stay at 0, and movements should affect the X and Z coordinates. The current objects in the scene are: Armchair, Desk, Sofa, Small Object, Modern Chair, Table. Please respond with only instructions or coordinates relevant to moving the objects. The user asked: ${chatInput}`;

      const response = await axios.post('http://localhost:8000/api/chat', { message: chatPrompt });
      setChatResponse(response.data.response);

      // Parse ChatGPT response to identify the object and direction
      const objectMatch = response.data.response.match(/(Armchair|Desk|Sofa|Small Object|Modern Chair|Table)/i);
      const directionMatch = response.data.response.match(/(up|down|left|right)/i);
      const positionMatch = response.data.response.match(/position\s*=\s*\[\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\s*]/);

      if (objectMatch) {
        const objectName = objectMatch[1];
        const objectToMove = modelObjects.find(obj => obj.name.toLowerCase() === objectName.toLowerCase());

        if (objectToMove) {
          if (positionMatch) {
            const newPosition = positionMatch.slice(1, 4).map(Number);
            objectToMove.model.position.set(newPosition[0], 0, newPosition[2]); // Set X and Z, Y to 0
          } else if (directionMatch) {
            const direction = directionMatch[1];
            parseMovement(objectToMove.model, direction); // Move object in the specified direction
          }
        }
      }
    } catch (error) {
      console.error('Error submitting chat:', error);
    }
};

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 3D Scene */}
      <div ref={mountRef} style={{ flex: 1 }} />

      {/* Chat box on the right */}
      <div style={{ width: '300px', padding: '20px', backgroundColor: 'lightgray' }}>
        <h3>Chat with AI</h3>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask ChatGPT to move objects"
          style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '10px' }}
        />
        <button onClick={handleChatSubmit} style={{ width: '100%', padding: '10px', fontSize: '16px' }}>
          Submit
        </button>
        <div style={{ marginTop: '20px' }}>
          <h4>ChatGPT Response:</h4>
          <p>{chatResponse}</p>
        </div>
      </div>
    </div>
  );
};

export default ThreeScene;
