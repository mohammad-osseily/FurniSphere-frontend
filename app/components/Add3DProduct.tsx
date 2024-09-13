'use client';

import React, { useState } from 'react';
import { Button, TextField, Box, Typography, CircularProgress, Select, MenuItem } from '@mui/material';
import { create3DProduct } from '../services/product3dServices';

const Add3DProduct = () => {
  const [productId, setProductId] = useState('');
  const [modelFilePath, setModelFilePath] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState({ x: 3, y: 3, z: 3 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = {
      product_id: productId,
      model_file_path: modelFilePath,
      position,
      scale,
      rotation,
    };


};

export default Add3DProduct;
