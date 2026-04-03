import React, { useState, useEffect } from "react";
import VendorNavbar from "../../Components/VendorNavbar";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import api from "../../api";
import { Navigate } from "react-router";

const VendorProducts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setproducts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });
  const navigate = useNavigate();

  const fetchproducts = async () => {
    try {
      const res = await api.get("/vendor/product");
      console.log(res);
      setproducts(res.data.products);
    } catch (err) {
      console.log("Error in Vendor Products", err.message);
    }
  };
  useEffect(() => {
    fetchproducts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/vendor/product/${id}`);
      console.log(res.data.message);
    } catch (err) {
      console.log("Error in handleDelete:", err.message);
    }
    fetchproducts();
  };

  const handleOpenEditDialog = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      title: product.title || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      description: product.description || "",
    });
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesavechanges=async(id)=>{
    try{
      const res=await api.patch(`/vendor/product/${id}`,editFormData)
      console.log("Product Upated Successfully");
      setEditDialogOpen(false);
      fetchproducts()
    }catch(err){
 console.log("Error in Edit Form :",err.message)
    }
  }
  return (
    <>
      <VendorNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 h-screen overflow-hidden">
        <div className="w-full h-full min-h-0 px-4 md:px-6 lg:px-10 flex flex-col gap-4 pt-6 pb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">My Products</h1>
            <button
              onClick={() => navigate("/vendor/add-product")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FiPlus className="text-lg" />
              Add Product
            </button>
          </div>

          <Paper
            className="rounded-2xl flex flex-col flex-1 min-h-0 overflow-hidden mt-2"
            sx={{ minWidth: { xs: 320, sm: 600, md: 700 } }}
          >
            <TableContainer
              className="rounded-2xl flex-1 min-h-0"
              sx={{ overflow: "auto" }}
            >
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{ minWidth: 700 }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 120 }}
                    >
                      Product ID
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 200 }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 130 }}
                    >
                      Category
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 100 }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 100 }}
                    >
                      Stock
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 120 }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={product.id}
                      >
                        <TableCell>{product._id}</TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell className="text-green-500">
                          {product.stock}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => handleOpenEditDialog(product)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <FiEdit2 className="text-lg" />
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(product._id);
                              }}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <FiTrash2 className="text-lg" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </main>

      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent className="space-y-4 pt-2">
          <TextField
            fullWidth
            label="Product Name"
            name="title"
            value={editFormData.title}
            onChange={handleEditInputChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={editFormData.category}
            onChange={handleEditInputChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={editFormData.price}
            onChange={handleEditInputChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={editFormData.stock}
            onChange={handleEditInputChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={editFormData.description}
            onChange={handleEditInputChange}
            margin="dense"
            multiline
            minRows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button variant="contained" onClick={() => handlesavechanges(selectedProduct._id)}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VendorProducts;
