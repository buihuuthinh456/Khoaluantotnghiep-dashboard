import React, { useEffect, useState } from "react";
import styles from "./DetailOrder.module.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CurrencyFormat from "../../functionJS";

function DetailOrder({ dataRow }) {
  useEffect(() => {
    console.log(dataRow);
  }, [dataRow]);

  let row = [];
  let extraData = {};
  for (let key in dataRow) {
    if (
      key === "__v" ||
      key === "id" ||
      key === "requestId" ||
      key == "stateTrans" ||
      key === "updatedAt"
    ) {
      continue;
    }

    if (key === "amount") {
      dataRow[key] = CurrencyFormat(dataRow[key]);
    }

    if (key === "extraData") {
      extraData = dataRow[key];
    } else {
      row.push({ name: key, value: dataRow[key] });
    }
  }
  //   Da trich extraData , dung de render chi tiet cart
  const cart = extraData.cart;

  return (
    <>
      <div className={styles.content}>
        <div className={styles.table}>
          <h1 className={styles.header}>Thông tin hóa đơn</h1>
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "1.6rem" }}>Thông tin</TableCell>
                  <TableCell sx={{ fontSize: "1.6rem" }}>Giá trị</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {row.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: "1.6rem" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "1.6rem" }}>
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className={styles.extraData}>
          <h1 className={styles.header}>Thông tin giỏ hàng</h1>

          <ul className={styles.cartList}>
            {cart &&
              cart.map((item, index) => {
                return (
                  <li className={styles.cartItem} key={item._id}>
                    <div className={styles.imgWrapper}>
                      <img src={item.images[0].url} alt="1231231" />
                    </div>
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>{item.name}</div>
                      <div className={styles.productPrice}>
                        {CurrencyFormat(item.totalMoney)}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DetailOrder;
