'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Box, Button, Slider, Typography } from '@mui/material'
import { fetchAll3DProducts, update3DProductPosition } from '../services/product3dServices'
import { useRouter } from 'next/navigation'

type ModelObject = {
  id: number
  name: string
  model: THREE.Object3D
  position: [number, number, number]
  scale: [number, number, number]
}

export default function ThreeDManipulation() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [modelObjects, setModelObjects] = useState<ModelObject[]>([])
  const [selectedObject, setSelectedObject] = useState<string | null>(null)
  const [tempPosition, setTempPosition] = useState({ x: 0, y: 0, z: 0 })
  const [scene, setScene] = useState<THREE.Scene | null>(null)
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null)
  const [controls, setControls] = useState<OrbitControls | null>(null)

  const router = useRouter()

  const initializeScene = () => {
    const newScene = new THREE.Scene()
    newScene.background = new THREE.Color('white')

    const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.7 / window.innerHeight, 0.1, 1000)
    newCamera.position.set(0, 10, 20)

    const newRenderer = new THREE.WebGLRenderer({ antialias: true })
    newRenderer.setSize(window.innerWidth * 0.7, window.innerHeight)
    if (mountRef.current) {
      mountRef.current.innerHTML = ''
      mountRef.current.appendChild(newRenderer.domElement)
    }

    const newControls = new OrbitControls(newCamera, newRenderer.domElement)
    newControls.enableDamping = true
    newControls.dampingFactor = 0.25
    newControls.enableZoom = true


  )
}