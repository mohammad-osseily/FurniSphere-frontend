'use client';

import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../services/userServices'; // Import the services
import { User } from '@/types'; // Assuming you have a User type in your types file
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Fetch users on component mount
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setEditUser(user);
  };

  const handleEditSave = async () => {
    if (editUser) {
      try {
        await updateUser(editUser.id, {
          name: editUser.name,
          email: editUser.email,
          role: editUser.role,
        });
        setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
        setEditUser(null);
        toast.success('User updated successfully!');
      } catch (error) {
        toast.error('Failed to update user');
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedUserId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUserId) {
      try {
        await deleteUser(selectedUserId);
        setUsers(users.filter((user) => user.id !== selectedUserId));
        setOpenDeleteDialog(false);
        toast.success('User deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <div>No users available.</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <ToastContainer />
      <Typography variant="h4" gutterBottom align="center">
        User Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => handleEditClick(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Dialog */}
      {editUser && (
        <Dialog open={!!editUser} onClose={() => setEditUser(null)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modify the details of the user.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Role"
              fullWidth
              value={editUser.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditUser(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
