import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Drawer,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

import Sidebar from "../components/SideBar";
import AdminNavbar from "../components/AdminNavbar";
import Form from "../components/Form"; // Import the Form component

const AdvertisementManagement = () => {
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false); // State to trigger re-fetch -dilum
  const [editAd, setEditAd] = useState(null); // State to store the ad being edited
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State to control the edit dialog

  const handleEdit = (ad) => {
    setEditAd(ad); // Set the ad to be edited
    setEditDialogOpen(true); // Open the edit dialog
  };

  const [filters, setFilters] = useState({
    age: "",
    location: "",
    type: "",
    prepaidPostpaid: "",
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // Fetch the advertisements from the backend API
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ads`);
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching ads: ", error);
      }
    };

    fetchAds();
  }, [refresh]); // Re-fetch ads whenever `refresh` changes

  const handleAdAdded = () => {
    setRefresh((prev) => !prev); // Toggle `refresh` to trigger re-fetch
    setDialogOpen(false); // Close the dialog
  }; //dilum

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleFilterChange = (event) =>
    setFilters({ ...filters, [event.target.name]: event.target.value });

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const toggleDialog = (open) => () => setDialogOpen(open);

  const handleImageClick = (ad) => {
    // Set the selected images for the clicked advertisement
    setSelectedImages([ad.adEnglish, ad.adTamil, ad.adSinhala]);
    setImageDialogOpen(true); // Open the image dialog
  };

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false); // Close the image dialog
  };
  const filterOptions = [
    {
      name: "age",
      label: "Age Range",
      options: ["18-25", "26-35", "36-45", "46+"],
    },
    {
      name: "location",
      label: "Location",
      options: [
        "Ampara",
        "Anuradhapura",
        "Badulla",
        "Batticaloa",
        "Colombo",
        "Galle",
        "Gampaha",
        "Hambantota",
        "Jaffna",
        "Kalutara",
        "Kandy",
        "Kegalle",
        "Kilinochchi",
        "Kurunegala",
        "Mannar",
        "Matale",
        "Matara",
        "Monaragala",
        "Mullaitivu",
        "Nuwara Eliya",
        "Polonnaruwa",
        "Puttalam",
        "Ratnapura",
        "Trincomalee",
        "Vavuniya",
      ],
    },
    {
      name: "type",
      label: "Connection Type",
      options: ["3G", "4G", "5G", "Fiber"],
    },
    {
      name: "prepaidPostpaid",
      label: "Plan Type",
      options: ["Prepaid", "Postpaid"],
    },
  ];

  const filteredAds = ads.filter(
    (ad) =>
      ad.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filters.age || ad.ageRange?.includes(filters.age)) &&
      (!filters.location || ad.districts?.includes(filters.location)) &&
      (!filters.type || ad.connectionTypes?.includes(filters.type)) &&
      (!filters.prepaidPostpaid ||
        ad.planType?.includes(filters.prepaidPostpaid))
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/ads/${id}`);

      // Directly remove the deleted ad from the state
      setAds(ads.filter((ad) => ad._id !== id));

      // Show the Snackbar with a success message
      setSnackbarMessage("Advertisement deleted successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting ad: ", error);
      setSnackbarMessage("Failed to delete the advertisement.");
      setOpenSnackbar(true);
    }
  };

  // Snackbar Close Handler
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <AdminNavbar />

        <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
          <Typography variant="h4" style={{ marginBottom: "20px" }}>
            Advertisement Management
          </Typography>

          {/* Modern Search Bar */}
          <TextField
            label="Search by Title"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "20px" }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={toggleDialog(true)} // Open the dialog
              sx={{
                borderRadius: "12px",
                paddingX: 3,
                paddingY: 1,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              Add Advertisement
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={toggleDrawer(true)}
              sx={{
                borderRadius: "12px",
                paddingX: 3,
                paddingY: 1,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": {
                  borderColor: "#115293",
                  backgroundColor: "#f0f7ff",
                },
              }}
            >
              Filters
            </Button>
          </Box>
          {/* Dialog box for edit advertisement - dilum */}
          <Dialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>
              {editAd ? "Edit Advertisement" : "Add Advertisement"}
            </DialogTitle>
            <DialogContent>
              <Form
                onCancel={() => setEditDialogOpen(false)}
                onSuccess={() => {
                  setEditDialogOpen(false);
                  setRefresh((prev) => !prev); // Refresh the ads list
                }}
                editAd={editAd} // Pass the ad being edited
              />
            </DialogContent>
          </Dialog>

          <Paper elevation={3} sx={{ borderRadius: 3, padding: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <strong>Image</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Title</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Start Date</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>End Date</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Age</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Location</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Connection Type</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Plan Type</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAds.map((ad) => (
                  <TableRow key={ad._id} hover>
                    {/* Ad Image (Clickable) */}
                    <TableCell>
                      <img
                        src={ad.adEnglish}
                        alt={ad.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "120px",
                          borderRadius: 5,
                          cursor: "pointer",
                          objectFit: "cover",
                        }}
                        onClick={() => handleImageClick(ad)} // Trigger dialog on image click
                      />
                    </TableCell>

                    {/* Ad Title */}
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {ad.title}
                      </Typography>
                    </TableCell>
                    {/* Ad Description */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {ad.description}
                      </Typography>
                    </TableCell>

                    {/* Start Date */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(ad.startDate)}
                      </Typography>
                    </TableCell>

                    {/* End Date */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(ad.endDate)}
                      </Typography>
                    </TableCell>

                    {/* Age Range */}
                    <TableCell>
                      <Box display="flex" flexDirection="column" gap={0.5}>
                        {ad.ageRange.map((range, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{ whiteSpace: "nowrap" }} // 🔥 this keeps it in one line
                          >
                            {range}
                          </Typography>
                        ))}
                      </Box>
                    </TableCell>

                    {/* Districts */}
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-line" }}
                      >
                        {ad.districts.join(", ")}
                      </Typography>
                    </TableCell>

                    {/* Connection Types */}
                    <TableCell>
                      <Typography variant="body2">
                        {ad.connectionTypes.join(", ")}
                      </Typography>
                    </TableCell>

                    {/* Plan Type */}
                    <TableCell>
                      {ad.planType.map((plan, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{ whiteSpace: "nowrap" }} // 🔥 this keeps it in one line
                        >
                          {plan}
                        </Typography>
                      ))}
                    </TableCell>

                    {/* Action Buttons */}
                    <TableCell align="right">
                    <IconButton
  data-cy="edit-ad-button"
  onClick={() => handleEdit(ad)}
  color="primary"
>
  <EditIcon />
</IconButton>

                      <IconButton
                        onClick={() => handleDelete(ad._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          {/* Filter Drawer */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box width={300} padding={3}>
              <Typography variant="h6" gutterBottom>
                Filter Options
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              {filterOptions.map((filter) => (
                <FormControl
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  key={filter.name}
                >
                  <InputLabel>{filter.label}</InputLabel>
                  <Select
                    name={filter.name}
                    value={filters[filter.name]}
                    onChange={handleFilterChange}
                    label={filter.label}
                  >
                    <MenuItem value="">All</MenuItem>
                    {filter.options.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={toggleDrawer(false)}
                fullWidth
              >
                Apply Filters
              </Button>
            </Box>
          </Drawer>

          {/* Dialog for Form */}
          <Dialog
            open={dialogOpen}
            onClose={toggleDialog(false)}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Add New Advertisement</DialogTitle>
            <DialogContent>
              <Form
                onCancel={toggleDialog(false)}
                onSuccess={handleAdAdded} // Trigger refresh on success
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={imageDialogOpen}
            onClose={handleCloseImageDialog}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Advertisement Images</DialogTitle>
            <DialogContent>
              <Box
                display="flex"
                justifyContent="center"
                gap="20px"
                flexWrap="wrap"
              >
                {selectedImages.map((img, index) => {
                  // Define names for the images based on their index
                  const labels = ["English", "Tamil", "Sinhala"];
                  return (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <img
                        src={img}
                        alt={`Advertisement Image ${labels[index]}`}
                        style={{
                          width: "200px",
                          height: "auto",
                          borderRadius: 5,
                          marginBottom: "10px",
                        }}
                      />
                      <Typography variant="body2">{labels[index]}</Typography>{" "}
                      {/* Add label */}
                    </Box>
                  );
                })}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseImageDialog} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementManagement;
