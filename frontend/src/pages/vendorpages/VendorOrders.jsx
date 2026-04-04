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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import api from "../../api";
import { toast } from "react-toastify";

const VendorOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  const [orderMeta, setOrderMeta] = useState({});
  const [editOrderId, setEditOrderId] = useState(null);
  const [editForm, setEditForm] = useState({
    shippingVia: "",
    trackingNo: "",
    estimatedDelivery: "",
  });

  const fetchorders = async () => {
    try {
      const res = await api.get("/vendor/orders");
      const fetchedOrders = res.data.Orders || [];
      setOrders(fetchedOrders);

      const initialMeta = {};
      fetchedOrders.forEach((order) => {
        initialMeta[order._id] = {
          shippingVia: order.courierName || "",
          trackingNo: order.trackingId || "",
          estimatedDelivery: order.estimatedDelivery
            ? new Date(order.estimatedDelivery).toISOString().slice(0, 10)
            : "",
        };
      });
      setOrderMeta(initialMeta);
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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/vendor/orders/${orderId}`, {
        orderStatus: newStatus,
      });
      fetchorders();
      toast.success("Order Status Changed Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.log("Error in Vendor Status Change:", err.message);
    }
  };

  const openMetaEditor = (orderId) => {
    setEditOrderId(orderId);
    setEditForm(
      orderMeta[orderId] || {
        shippingVia: "",
        trackingNo: "",
        estimatedDelivery: "",
      },
    );
  };

  const closeMetaEditor = () => {
    setEditOrderId(null);
    setEditForm({
      shippingVia: "",
      trackingNo: "",
      estimatedDelivery: "",
    });
  };

  const handleMetaChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMetaSave = async () => {
    if (!editOrderId) return;

    const updatedMeta = editForm;

    try {
      await api.patch(`/vendor/orders/shippingdetails/${editOrderId}`, {
        couriername: updatedMeta.shippingVia,
        trackingId: updatedMeta.trackingNo,
        estimatedDelivery: updatedMeta.estimatedDelivery,
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update shipping details",
      );
      return;
    }

    setOrderMeta((prev) => ({
      ...prev,
      [editOrderId]: updatedMeta,
    }));

    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order._id !== editOrderId) return order;
        return {
          ...order,
          courierName: updatedMeta.shippingVia,
          trackingId: updatedMeta.trackingNo,
          estimatedDelivery: updatedMeta.estimatedDelivery,
        };
      }),
    );

    toast.success("Shipping details updated successfully");
    closeMetaEditor();
    fetchorders();
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

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-600";
      case "Unpaid":
        return "text-amber-600";
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
                      style={{ minWidth: 130 }}
                    >
                      Payment
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 140 }}
                    >
                      Action
                    </TableCell>
                    <TableCell
                      className="bg-gray-100"
                      style={{ minWidth: 280 }}
                    >
                      Shipping Details
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
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{order.user.fullName}</TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{order.totalAmount}</TableCell>
                        <TableCell
                          className={getStatusColor(order.orderStatus)}
                        >
                          {order.orderStatus}
                        </TableCell>
                        <TableCell
                          className={getPaymentStatusColor(order.paymentStatus)}
                        >
                          {order.paymentStatus || "Unpaid"}
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
                            <MenuItem value="Order Placed">
                              Order Placed
                            </MenuItem>
                            <MenuItem value="Packed">Packed</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value="Out for Delivery">
                              Out for Delivery
                            </MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex min-w-70 items-center justify-between gap-3">
                            <div className="text-xs text-gray-600 leading-5">
                              <p>
                                {orderMeta[order._id]?.shippingVia || "Not set"}
                              </p>
                              <p>
                                {orderMeta[order._id]?.trackingNo ||
                                  "No tracking"}
                              </p>
                              <p>
                                {orderMeta[order._id]?.estimatedDelivery ||
                                  "No ETA"}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => openMetaEditor(order._id)}
                              className="rounded-md border border-indigo-600 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                            >
                              Edit
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
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          <Dialog
            open={Boolean(editOrderId)}
            onClose={closeMetaEditor}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Edit Shipping Details</DialogTitle>
            <DialogContent sx={{ pt: 1 }}>
              <div className="grid grid-cols-1 gap-4 pt-2">
                <TextField
                  label="Shipping Via"
                  size="small"
                  value={editForm.shippingVia}
                  onChange={(e) =>
                    handleMetaChange("shippingVia", e.target.value)
                  }
                />
                <TextField
                  label="Tracking Number"
                  size="small"
                  value={editForm.trackingNo}
                  onChange={(e) =>
                    handleMetaChange("trackingNo", e.target.value)
                  }
                />
                <TextField
                  label="Estimated Delivery"
                  type="date"
                  size="small"
                  value={editForm.estimatedDelivery}
                  onChange={(e) =>
                    handleMetaChange("estimatedDelivery", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={closeMetaEditor}>Cancel</Button>
              <Button variant="contained" onClick={handleMetaSave}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
    </>
  );
};

export default VendorOrders;
