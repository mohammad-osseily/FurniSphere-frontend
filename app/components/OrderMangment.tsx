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

  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'canceled'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <PendingIcon sx={{ mr: 1 }} />;
      case 'processing':
        return <HourglassTopIcon sx={{ mr: 1 }} />; // New icon for processing status
      case 'shipped':
        return <LocalShippingIcon sx={{ mr: 1 }} />;
      case 'delivered':
        return <CheckCircleIcon sx={{ mr: 1 }} color="success" />;
      case 'canceled':
        return <CancelIcon sx={{ mr: 1 }} color="error" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders(currentPage);
        if (data && data.orders && Array.isArray(data.orders.data)) {
          setOrders(data.orders.data);
          setTotalPages(data.orders.last_page);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateClick = (order: any) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    try {
      await updateOrderStatus(selectedOrder.id, status);
      const data = await getAllOrders(currentPage);
      setOrders(data.orders.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>{order.total_amount}</TableCell>
                  <TableCell>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </TableCell>
                  <TableCell>{order.address_line}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>{order.comment}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className="bg-primary text-white"
                      onClick={() => handleUpdateClick(order)}
                      startIcon={<EditIcon />}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No orders available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          '& .Mui-selected': {
            backgroundColor: '#054C73',
            color: '#fff',
          },
        }}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />

      {/* Modal for Updating Order */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: { backgroundColor: 'transparent' },
        }}
      >
        <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <Box
              sx={{
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: 2,
                p: 4,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Typography variant="h6" mb={2}>
                Update Order Status
              </Typography>
              <TextField
                select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiMenuItem-root': {
                    fontWeight: 500,
                  },
                }}
              >
                {statuses.map((s) => (
                  <MenuItem
                    key={s}
                    value={s}
                    sx={{
                      color: s === 'canceled' ? 'red' : 'black',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }}
                  >
                    {getStatusIcon(s)}
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                className='bg-primary'
                onClick={handleUpdateStatus}
                style={{ marginTop: '20px' }}
                fullWidth
              >
                Update Status
              </Button>
            </Box>
          </Box>
        </Slide>
      </Modal>
    </>
  );
};

export default OrderManagement;
