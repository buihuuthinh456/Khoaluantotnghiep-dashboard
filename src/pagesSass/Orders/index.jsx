import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectOrders, fetchOrders } from "../../features/orders/ordersSlice";
import { selectLogin } from "../../features/login/loginSlice";

import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import DetailOrder from "../../components_SASS/DetailOrder";

import styles from "./Orders.module.scss";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import CurrencyFormat from "../../functionJS";

function Orders() {
  const loginState = useSelector(selectLogin);
  const orders = useSelector(selectOrders);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mountForm, setMountForm] = useState(false);
  const [dataRow, setDataRow] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
    if (!loginState.isLogin) {
      navigate("/login");
      toast.warning("You have to login", {
        style: {
          fontSize: "1.6rem",
        },
      });
    }
  }, []);

  const handleSwitchPage = () => {
    if (loginState.isLogin && loginState.isAdmin) {
      setMountForm((state) => !state);
      setDataRow(null);
      setIsEdit(false);
    } else {
      toast.error(`You haven't login or not admin`, {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
  };

  const columns = [
    { field: "id", headerName: "STT", width: 50 },
    { field: "transId", headerName: "Trans ID", width: 150 },
    {
      field: "amount",
      headerName: "Giá tiền",
      width: 150,
    },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "createdAt", headerName: "Ngày giao dịch", flex: 1 },
    {
      field: "Option",
      headerName: "Option",
      flex: 1,
      renderCell: (param) => {
        const handleEdit = (e) => {
          e.stopPropagation();
          setIsEdit(true);
          setMountForm(true);
          setDataRow(param.row);
          console.log(param.row);
        };
        return (
          <div className={styles.option}>
            <div className={styles.optionEdit}>
              <Button
                variant="contained"
                color="success"
                sx={{
                  fontSize: "1.2rem",
                }}
                onClick={(e) => handleEdit(e)}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const rows = orders.orders.map((item, index) => {
    return {
      ...item,
      amount: CurrencyFormat(item.amount),
      id: index + 1,
      createdAt: item.createdAt,
    };
  });

  if (orders.isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Đơn hàng</h2>

        {!mountForm ? (
          ""
        ) : (
          <div className={styles.headerButton}>
            <Button variant="contained" onClick={() => handleSwitchPage()}>
              <ArrowBackIcon style={{ fontSize: 20 }} />
              Back
            </Button>
          </div>
        )}
      </div>

      <div className={styles.dataContainer}>
        {!mountForm ? (
          <DataGrid
            style={{ fontSize: "1.6rem" }}
            rows={rows}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
            autoHeight
            //   onRowClick={(e) => console.log("user select", e.row)}
            // checkboxSelection
          />
        ) : (
          <DetailOrder dataRow={dataRow} />
        )}
      </div>
    </div>
  );
}

export default Orders;
