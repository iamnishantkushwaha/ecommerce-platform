import React, { useState, useEffect } from "react";
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
import api from "../../api";

const VendorOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
const fetchorders = async () => {
      try {
        const res = await api.get("/vendor/orders");
        console.log(res.data);
        setOrders(res.data.Orders || []);
      } catch (err) {
        console.log("Error in VendorOrders:", err.message);
      }
    };
  useEffect(() => {
    
    fetchorders();
  }, []);
 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatOrderId = (orderId) =>
    orderId?.toString().slice(-6).toUpperCase();

  const handleStatusChange = async(orderId, newStatus) => {
    try{
      const res=await api.patch(`/vendor/orders/${orderId}`,{
      orderStatus:newStatus
     })
     console.log(`Status Updated to ${newStatus}`)
     fetchorders()

    }catch(err){
      console.log("Error in Vendor Status Change:",err.message)
    }
     
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
                        key={order._id}
                      >
                        <TableCell>{formatOrderId(order._id)}</TableCell>
                        <TableCell>{order.user.fullName}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{order.totalAmount}</TableCell>
                        <TableCell className={getStatusColor(order.orderStatus)}>
                          {order.orderStatus}
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={order.orderStatus}
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
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                          >
                            <MenuItem value="Order Placed">Order Placed</MenuItem>
                              <MenuItem value="Packed">Packed</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value= "Out for Delivery">Out for Delivery</MenuItem>
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
