import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DetailOrder({ dataRow, isEdit }) {

    
  useEffect(() => {
    console.log(dataRow);
  }, [dataRow]);

  let row = []
  let extraData={}
  for(let key in dataRow ){
    if(key==="__v"||key==="id"||key==="requestId"||key=="stateTrans"||key==="updatedAt"){
        continue;
    }
    if(key==="extraData"){
        extraData = dataRow[key]
    }else{
        row.push({name:key,value:dataRow[key]})
    }
  }
  console.log("row",row)

//   Da trich extraData , dung de render chi tiet cart
  console.log("extraData",extraData)

  return (
    <>
        <h1>Thông tin hóa đơn</h1>
        <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell sx={{ fontSize:"1.6rem"}}>Thông tin</TableCell>
                <TableCell sx={{ fontSize:"1.6rem"}}>Giá trị</TableCell>
            </TableRow>
            </TableHead>

            <TableBody>
            {row.map((row,index) => (
                <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell component="th" scope="row" sx={{ fontSize:"1.6rem"}}>
                    {row.name}
                </TableCell>
                <TableCell align="left" sx={{ fontSize:"1.6rem"}}>{row.value}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}

export default DetailOrder;
