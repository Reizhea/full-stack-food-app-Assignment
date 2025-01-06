import React, { useState, useEffect } from "react";
import {Box,Button,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Dialog,DialogActions,DialogContent,DialogTitle,Select,MenuItem,} from "@mui/material";
import axios from "axios";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
  });
  const [editMenuItem, setEditMenuItem] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, type: null });
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    if (!isAuthenticated) {
      const password = prompt("Enter admin password:");
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
      } else {
        alert("Incorrect password! Redirecting to homepage.");
        window.location.href = "/";
      }
    }
  }, [isAuthenticated]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/menu`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/order`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddMenuItem = async () => {
    const formData = new FormData();
    formData.append("name", newMenuItem.name);
    formData.append("category", newMenuItem.category);
    formData.append("price", newMenuItem.price);
    if (newMenuItem.image) {
      formData.append("image", newMenuItem.image);
    }

    try {
      await axios.post(`${BASE_URL}/menu`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewMenuItem({ name: "", category: "", price: "", image: null });
      fetchMenu();
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleUpdateMenuItem = async () => {
    const formData = new FormData();
    formData.append("name", editMenuItem.name);
    formData.append("category", editMenuItem.category);
    formData.append("price", editMenuItem.price);
    if (editMenuItem.image instanceof File) {
      formData.append("image", editMenuItem.image);
    }

    try {
      await axios.put(`${BASE_URL}/menu/${editMenuItem._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditMenuItem(null);
      fetchMenu();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleDelete = async () => {
    const { id, type } = deleteDialog;
    try {
      if (type === "menu") {
        await axios.delete(`${BASE_URL}/menu/${id}`);
        fetchMenu();
      } else if (type === "order") {
        await axios.delete(`${BASE_URL}/order/${id}`);
        fetchOrders();
      } else if (type === "user") {
        await axios.delete(`${BASE_URL}/auth/${id}`);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setDeleteDialog({ open: false, id: null, type: null });
    }
  };

  const handleMarkAsCompleted = async (orderId) => {
    try {
      await axios.put(`${BASE_URL}/order/${orderId}/complete`);
      fetchOrders();
    } catch (error) {
      console.error("Error marking order as completed:", error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        color: "#000",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000" }}>
          Admin Panel
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <Button
          variant="contained"
          onClick={() => {
            setShowMenu(true);
            setShowOrders(false);
            setShowUsers(false);
            fetchMenu();
          }}
        >
          Show Menu
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowMenu(false);
            setShowOrders(true);
            setShowUsers(false);
            fetchOrders();
          }}
        >
          Show Orders
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowMenu(false);
            setShowOrders(false);
            setShowUsers(true);
            fetchUsers();
          }}
        >
          Show Users
        </Button>
      </Box>

      {showMenu && (
        <Box sx={{ marginTop: "2rem" }}>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              label="Name"
              value={newMenuItem.name}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
              sx={{ marginRight: "1rem" }}
            />
            <Select
              value={newMenuItem.category}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
              displayEmpty
              sx={{ marginRight: "1rem", width: "10rem" }}
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="Appetizers">Appetizers</MenuItem>
              <MenuItem value="Main Course">Main Course</MenuItem>
              <MenuItem value="Desserts">Desserts</MenuItem>
            </Select>
            <TextField
              label="Price"
              type="number"
              value={newMenuItem.price}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
              sx={{ marginRight: "1rem" }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ marginRight: "1rem" }}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setNewMenuItem({ ...newMenuItem, image: e.target.files[0] })
                }
              />
            </Button>
            {newMenuItem.image && <span>{newMenuItem.image.name}</span>}
            <Button variant="contained" onClick={handleAddMenuItem}>
              Add Item
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => setEditMenuItem(item)}
                        sx={{ marginRight: "0.5rem" }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          setDeleteDialog({ open: true, id: item._id, type: "menu" })
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {editMenuItem && (
            <Dialog open onClose={() => setEditMenuItem(null)}>
              <DialogTitle>Edit Menu Item</DialogTitle>
              <DialogContent>
                <TextField
                  label="Name"
                  value={editMenuItem.name}
                  onChange={(e) => setEditMenuItem({ ...editMenuItem, name: e.target.value })}
                  sx={{ marginBottom: "1rem" }}
                />
                <Select
                  value={editMenuItem.category}
                  onChange={(e) =>
                    setEditMenuItem({ ...editMenuItem, category: e.target.value })
                  }
                  displayEmpty
                  sx={{ marginBottom: "1rem", width: "100%" }}
                >
                  <MenuItem value="">Select Category</MenuItem>
                  <MenuItem value="Appetizers">Appetizers</MenuItem>
                  <MenuItem value="Main Course">Main Course</MenuItem>
                  <MenuItem value="Desserts">Desserts</MenuItem>
                </Select>
                <TextField
                  label="Price"
                  type="number"
                  value={editMenuItem.price}
                  onChange={(e) => setEditMenuItem({ ...editMenuItem, price: e.target.value })}
                  sx={{ marginBottom: "1rem" }}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginBottom: "1rem" }}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      setEditMenuItem({ ...editMenuItem, image: e.target.files[0] })
                    }
                  />
                </Button>
                {editMenuItem.image && (
                  <span>
                    {editMenuItem.image instanceof File
                      ? editMenuItem.image.name
                      : "Image already uploaded"}
                  </span>)}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditMenuItem(null)}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateMenuItem}>
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
      )}

      {showOrders && (
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.userId.username}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.status !== "Completed" && (
                      <Button
                        variant="outlined"
                        onClick={() => handleMarkAsCompleted(order._id)}
                        sx={{ marginRight: "0.5rem" }}
                      >
                        Mark as Completed
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        setDeleteDialog({ open: true, id: order._id, type: "order" })
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {showUsers && (
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        setDeleteDialog({ open: true, id: user._id, type: "user" })
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: null, type: null })}
      >
        <DialogTitle sx={{ color: "#000" }}>Are you sure you want to delete this user?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null, type: null })}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
