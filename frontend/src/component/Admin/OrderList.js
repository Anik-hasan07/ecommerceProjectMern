import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalQty, setTotalQty] = useState([]);



  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const calculateTotalQty = () => {
    if(orders) {
      const newOrders = [...orders];
      const totals = [];

      newOrders.map((order) => {
        var total = 0;
        order.orderItems.map((item) => {
          total = total + parseInt(item.quantity); 
        })
        order = {...order, total: total};
        totals.push(total);
      })
      setTotalQty(totals);
    }
  }

  useEffect(() => {
    calculateTotalQty();
  }, [orders]);

  useEffect(() => {
    if (error) {

      dispatch(clearErrors());
    }

    if (deleteError) { 
      
      dispatch(clearErrors());
    }

    if (isDeleted) {
  
        navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError,  isDeleted,navigate]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        itemsQty:  totalQty[index] ? totalQty[index] : 0,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;