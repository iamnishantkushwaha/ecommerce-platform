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
import { toast } from "react-toastify";

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
      toast.success("Product Deleted Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
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

  const handlesavechanges = async (id) => {
    try {
      const res = await api.patch(`/vendor/product/${id}`, editFormData);
      console.log("Product Upated Successfully");
      setEditDialogOpen(false);
      fetchproducts();
      toast.success("Product Updated Successfully");
    } catch (err) {
      console.log("Error in Edit Form :", err.message);
      toast.error(err.response?.data?.message);
    }
  };
  return (
    <>
      <VendorNavbar />
      <main className="bg-slate-50 pt-24 md:pl-72 md:pt-24 min-h-screen">
        <div className="w-full min-h-0 px-4 md:px-6 lg:px-10 flex flex-col gap-4 pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between pt-4 md:pt-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                My Products
              </h1>
              <p className="mt-2 text-sm md:text-base text-slate-500">
                Review listings, stock, and product details.
              </p>
            </div>
            <button
              onClick={() => navigate("/vendor/add-product")}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              <FiPlus className="text-lg" />
              Add Product
            </button>
          </div>

          <Paper
            className="rounded-3xl flex flex-col flex-1 min-h-0 overflow-hidden mt-2 border border-slate-200 shadow-sm"
            sx={{ minWidth: { xs: 320, sm: 600, md: 700 } }}
          >
            <TableContainer
              className="rounded-3xl flex-1 min-h-0"
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
                      className="bg-slate-50 text-slate-700"
                      style={{ minWidth: 120 }}
                    >
                      Product ID
                    </TableCell>
                    <TableCell
                      className="bg-slate-50 text-slate-700"
                      style={{ minWidth: 200 }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      className="bg-slate-50 text-slate-700"
                      style={{ minWidth: 130 }}
                    >
                      Category
                    </TableCell>
                    <TableCell
                      className="bg-slate-50 text-slate-700"
                      style={{ minWidth: 100 }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      className="bg-slate-50 text-slate-700"
                      style={{ minWidth: 100 }}
                    >
                      Stock
                    </TableCell>
                    <TableCell
                      className="bg-slate-50 text-slate-700"
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
                        <TableCell>₹{product.price}</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          {product.stock}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => handleOpenEditDialog(product)}
                              className="rounded-full border border-slate-200 p-2 text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                            >
                              <FiEdit2 className="text-lg" />
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(product._id);
                              }}
                              className="rounded-full border border-slate-200 p-2 text-red-600 transition hover:border-red-200 hover:bg-red-50"
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
          <Button
            variant="contained"
            onClick={() => handlesavechanges(selectedProduct._id)}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VendorProducts;
