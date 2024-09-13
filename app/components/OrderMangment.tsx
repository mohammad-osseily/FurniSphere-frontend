'use client';
import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../services/orderServices';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Modal, Box, Typography, TextField, MenuItem, Slide, Backdrop } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/AccessTime';
import HourglassTopIcon from '@mui/icons-material/HourglassTop'; // New icon for processing

const OrderManagement = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [status, setStatus] = useState('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);


};

export default OrderManagement;
