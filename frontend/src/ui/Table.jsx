import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "_id",
    label: "Order ID",
    minWidth: 140,
    format: (value) =>
      value ? value.toString().slice(-6).toUpperCase() : "",
  },
  {
    id: "createdAt",
    label: "Date",
    minWidth: 100,
    format: (value) =>
      new Date(value).toLocaleDateString("en-IN"),
  },
  {
    id: "products",
    label: "Items",
    minWidth: 150,
    align: "center",
    format: (value) =>
      Array.isArray(value) ? value.length : 0,
  },
  {
    id: "quantity",
    label: "quantity",
    minWidth: 50,
    align: "center",
    format: (_, row) =>
      Array.isArray(row?.products)
        ? row.products.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0
          )
        : 0,
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: 140,
    align: "center",
  },
  {
    id: "orderStatus",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
];

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setrows] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    setrows(props.orders);
  }, [props.orders]);

  return (
    <Paper className="rounded-2xl "  sx={{ minWidth: { xs: 320, sm: 600, md: 700 } }}>
      <TableContainer
        className="rounded-2xl "
        sx={{ maxHeight: 440, overflowX: "auto" }}
      >
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className="bg-gray-100"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log(row, "t");
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell
                          key={column.id}
                          className={
                            value == "Pending"
                              ? "    text-orange-400"
                              : value == "Shipping"
                                ? "  text-indigo-600"
                                : value == "Delivered"
                                  ? "   text-green-500"
                                  : value == "Cancelled"
                                    ? "  bg-red-300 text-red-500"
                                    : "bg-white"
                          }
                          align={column.align}
                        >
                          {column.format
                            ? column.format(value, row)
                            : String(value ?? "")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="bg-gray-100"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
