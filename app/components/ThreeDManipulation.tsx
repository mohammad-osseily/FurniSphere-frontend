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

  )
}