'use client';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import axios from 'axios';
import { FaMicrophone } from 'react-icons/fa'; // Importing the microphone icon from react-icons

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [interactionLog, setInteractionLog] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false); // For recording animation
  const [modelObjects, setModelObjects] = useState<{ name: string, model: any }[]>([]);

  let controls: OrbitControls;

  // Check for SpeechRecognition compatibility
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;

  const startVoiceRecognition = () => {
    setIsRecording(true);
    recognition.start();
  };

  const stopVoiceRecognition = () => {
    setIsRecording(false);
    recognition.stop();
  };

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    setChatInput(transcript);
    handleChatSubmit(transcript); // Pass transcript directly to handleChatSubmit
  };

  recognition.onerror = (event: any) => {
    console.error('Speech Recognition Error:', event.error);
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth - 400, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

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

    const loadModel = (name: string, url: string, position: [number, number, number], scale: [number, number, number]) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(url, (gltf) => {
        const model = gltf.scene;
        model.position.set(position[0], position[1], position[2]);
        model.scale.set(scale[0], scale[1], scale[2]);
        scene.add(model);
        setModelObjects((prev) => [...prev, { name, model }]);
      });
    };

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  const parseMovement = (object: any, direction: string) => {
    const movementUnit = 5;

    switch (direction.toLowerCase()) {
      case 'up':
        object.position.z -= movementUnit;
        break;
      case 'down':
        object.position.z += movementUnit;
        break;
      case 'left':
        object.position.x -= movementUnit;
        break;
      case 'right':
        object.position.x += movementUnit;
        break;
      default:
        console.error('Unknown direction:', direction);
    }
    object.position.y = 0;
  };

  const handleChatSubmit = async (input: string) => {
    const currentInput = input || chatInput;
    if (!currentInput.trim()) {
      return;
    }

    const chatPrompt = `You are controlling a 3D scene with objects like Armchair, Desk, Sofa, etc. 
    Your job is to interpret the user's commands to move these objects in 3D space. 
    The user asked: "${currentInput}".`;

    try {
      const response = await axios.post('http://localhost:8000/api/chat', { message: chatPrompt });
      const aiResponse = response.data.response;

      setChatResponse(aiResponse);
      setInteractionLog((prev) => [...prev, `You: ${currentInput}`, `AI: ${aiResponse}`]);

      const objectMatch = aiResponse.match(/(Armchair|Desk|Sofa|Small Object|Modern Chair|Table)/i);
      const directionMatch = aiResponse.match(/(up|down|left|right)/i);

      if (objectMatch && directionMatch) {
        const objectName = objectMatch[1];
        const direction = directionMatch[1];
        const objectToMove = modelObjects.find((obj) => obj.name.toLowerCase() === objectName.toLowerCase());

        if (objectToMove) {
          parseMovement(objectToMove.model, direction);
        }
      }

      setChatInput(''); // Clear input after submission
    } catch (error) {
      console.error('Error submitting chat:', error);
      setChatResponse('Error communicating with the server.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div ref={mountRef} style={{ flex: 1, borderRight: '2px solid #e0e0e0' }} />

      <div style={{ width: '400px', padding: '20px', backgroundColor: '#f9f9f9', borderLeft: '2px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '15px', textAlign: 'center', fontWeight: 'bold', color: '#333' }}>Chat with AI</h3>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h4>Interaction Log:</h4>
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            {interactionLog.map((log, index) => (
              <p key={index} style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '5px' }}>
                {log}
              </p>
            ))}
          </div>
        </div>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask ChatGPT to move objects or redesign room"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            marginBottom: '15px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            outline: 'none',
            boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
          }}
        />
        <button
          onClick={() => handleChatSubmit('')}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            marginBottom: '15px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
          }}
        >
          Submit
        </button>

        <div
          style={{
            width: '100%',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60px',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseDown={startVoiceRecognition}
          onMouseUp={stopVoiceRecognition}
        >
          <div
            style={{
              backgroundColor: isRecording ? '#FF5722' : '#2196F3',
              borderRadius: '50%',
              height: '60px',
              width: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
              animation: isRecording ? 'pulse 1.5s infinite' : 'none',
            }}
          >
            <FaMicrophone
              style={{
                color: '#fff',
                fontSize: '24px',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 87, 34, 0.7);
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 15px 10px rgba(255, 87, 34, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 87, 34, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default ThreeScene;
