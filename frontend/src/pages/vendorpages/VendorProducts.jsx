import React, { useState } from "react";
import VendorNavbar from "../../Components/VendorNavbar";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const VendorProducts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const products = [
    {
      id: 1,
      productId: "001",
      name: "Wireless Noise-Cancelling Headphones",
      category: "Electronics",
      price: "$299.99",
      stock: 45,
    },
    {
      id: 2,
      productId: "002",
      name: "Minimalist Leather Watch",
      category: "Accessories",
      price: "$189.00",
      stock: 23,
    },
    {
      id: 3,
      productId: "003",
      name: "Organic Cotton T-Shirt",
      category: "Clothing",
      price: "$45.00",
      stock: 156,
    },
    {
      id: 4,
      productId: "004",
      name: "Smart Home Speaker",
      category: "Electronics",
      price: "$129.99",
      stock: 78,
    },
    {
      id: 5,
      productId: "005",
      name: "Running Shoes Pro",
      category: "Sports",
      price: "$159.00",
      stock: 34,
    },
    {
      id: 6,
      productId: "006",
      name: "Ceramic Plant Pot Set",
      category: "Home & Garden",
      price: "$39.99",
      stock: 89,
    },
    {
      id: 7,
      productId: "007",
      name: "Bestseller Novel Collection",
      category: "Books",
      price: "$29.99",
      stock: 200,
    },
    {
      id: 8,
      productId: "008",
      name: "Premium Sunglasses",
      category: "Accessories",
      price: "$220.00",
      stock: 56,
    },
    {
      id: 9,
      productId: "009",
      name: "Yoga Mat Pro",
      category: "Sports",
      price: "$35.99",
      stock: 67,
    },
    {
      id: 10,
      productId: "010",
      name: "Coffee Maker Deluxe",
      category: "Electronics",
      price: "$89.99",
      stock: 45,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <VendorNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 h-screen overflow-hidden">
        <div className="w-full h-full min-h-0 px-4 md:px-6 lg:px-10 flex flex-col gap-4 pt-6 pb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">My Products</h1>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors">
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
                        <TableCell>{product.productId}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell className="text-green-500">
                          {product.stock}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                              <FiEdit2 className="text-lg" />
                            </button>
                            <button className="text-red-600 hover:text-red-800 transition-colors">
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
    </>
  );
};

export default VendorProducts;
