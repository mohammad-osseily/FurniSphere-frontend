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

  )
}