import React, { useState } from "react";
import VendorNavbar from "../../Components/VendorNavbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  MenuItem,
  Select,
} from "@mui/material";

const VendorOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const orders = [
    {
      id: "ORD-001",
      orderId: "001",
      customer: "John Doe",
      date: "2026-02-28",
      total: "$458.99",
      status: "Delivered",
    },
    {
      id: "ORD-002",
      orderId: "002",
      customer: "Jane Smith",
      date: "2026-02-27",
      total: "$189.00",
      status: "Shipped",
    },
    {
      id: "ORD-003",
      orderId: "003",
      customer: "Bob Wilson",
      date: "2026-02-26",
      total: "$329.98",
      status: "Processing",
    },
    {
      id: "ORD-004",
      orderId: "004",
      customer: "Alice Brown",
      date: "2026-02-25",
      total: "$45.00",
      status: "Delivered",
    },
    {
      id: "ORD-005",
      orderId: "005",
      customer: "Charlie Davis",
      date: "2026-02-24",
      total: "$129.99",
      status: "Cancelled",
    },
    {
      id: "ORD-006",
      orderId: "006",
      customer: "Diana Evans",
      date: "2026-02-23",
      total: "$759.98",
      status: "Delivered",
    },
    {
      id: "ORD-007",
      orderId: "007",
      customer: "Edward Taylor",
      date: "2026-02-22",
      total: "$299.99",
      status: "Processing",
    },
    {
      id: "ORD-008",
      orderId: "008",
      customer: "Fiona Garcia",
      date: "2026-02-21",
      total: "$145.50",
      status: "Shipped",
    },
    {
      id: "ORD-009",
      orderId: "009",
      customer: "George Wilson",
      date: "2026-02-20",
      total: "$225.75",
      status: "Processing",
    },
    {
      id: "ORD-010",
      orderId: "010",
      customer: "Helen Martinez",
      date: "2026-02-19",
      total: "$567.50",
      status: "Delivered",
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "text-orange-400";
      case "Shipped":
        return "text-indigo-600";
      case "Delivered":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <>
      <VendorNavbar />
      <main className="bg-gray-100 pt-20 md:pl-72 md:pt-20 h-screen overflow-hidden">
        <div className="w-full h-full min-h-0 px-4 md:px-6 lg:px-10 flex flex-col gap-4 pt-6 pb-4">
          <h1 className="text-2xl font-semibold">Orders</h1>

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
                      style={{ minWidth: 100 }}
                    >
                      Order ID
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 150 }}
                    >
                      Customer
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 100 }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 120 }}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 130 }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 140 }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={order.id}
                      >
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell className={getStatusColor(order.status)}>
                          {order.status}
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={order.status}
                            sx={{
                              minWidth: "120px",
                              borderColor: "#e5e7eb",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e5e7eb",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3b82f6",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#3b82f6",
                                },
                            }}
                          >
                            <MenuItem value="Processing">Processing</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={orders.length}
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

export default VendorOrders;
