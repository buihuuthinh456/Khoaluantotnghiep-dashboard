import React, { useEffect, useState } from "react";
import styles from "./User.module.scss";
// router
import { useNavigate } from "react-router-dom";
// redux
import { selectUsers, fetchUsers, deleteUserThunk } from "../../features/users/usersSlice";
import { selectLogin } from "../../features/login/loginSlice";
import { useSelector, useDispatch } from "react-redux";

// MUI
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

// Others
import { toast } from "react-toastify";
import BeforeAction from "../../components_SASS/BeforeAction";
import { Button } from "@mui/material";

function User() {
  // redux select
  const data = useSelector(selectUsers);
  const token = useSelector(selectLogin).accessToken;
  const isLogin = useSelector(selectLogin).isLogin;
  const isReload = useSelector(selectUsers).isReload
  // useState
  const [dataRow, setDataRow] = useState(null)
  const [beforeAction, setBeforeAction] = useState(false)

  // function
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect hooks
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      toast.warning("You have to login", {
        style: {
          fontSize: "1.6rem",
        },
      });
    } else {
      dispatch(fetchUsers(token));
    }
  }, [dispatch]);

  useEffect(()=>{
    if (isReload) dispatch(fetchUsers(token));
  }, [isReload])

  // collumns table
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "user",
      headerName: "Tên người dùng",
      sortable: true,
      flex: 1,
      renderCell: (param) => {
          return (
              <div className={styles.cellWithImg}>
                  <img src={param.row.userImg} alt="user-img" />
                  <span>{`${param.row.name}`}</span>
              </div>
          )
      },
    },
    { field: "isAdmin", headerName: "Admin", flex: 1, type: 'boolean' },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "Option", headerName: "Option", flex: 1, renderCell: (param) => {
        return (
            <div className={styles.option}>
                <div className={styles.optionEdit}>
                    <Button variant="contained" color="success" onClick={()=>navigate(`/profile/${param.row._id}`)}>
                        <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                    </Button>
                </div>
                <div className={styles.optionDelelte}>
                    <Button variant="contained" color="error" onClick={()=>setBeforeAction(true)}>
                        <DeleteIcon></DeleteIcon>
                    </Button>
                </div>
            </div>
        )
        
    }}
  ];
  //   rows table
  const rows = data.users.map((item, index) => {
    return {
      ...item,
      id: index + 1,
      userImg: "images/default-user-image.jpg",
    };
  });

  // function DOM
  const handleDetail = (e) => {
    navigate(`profile/${e.row._id}`)
  }

  //   Loading
  if (data.isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  //   render
  return (
    <div className={styles.container}>
      <h2>Người dùng</h2>
      <div className={styles.dataContainer}>
        <DataGrid
          style={{ fontSize: "1.6rem" }}
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          autoHeight
          onRowClick={(e)=>setDataRow(e.row)}
          onRowDoubleClick={(e)=>handleDetail(e)}
          // checkboxSelection
        />
      </div>
      {console.log("dataRow", dataRow)}
      {beforeAction && <BeforeAction
        title = "Bạn có muốn xóa người dùng ?"
        onCancel={()=>setBeforeAction(false)}
        onConfirm={()=> {
          setBeforeAction(false)
          dispatch(deleteUserThunk(dataRow._id))
        }}
      ></BeforeAction>}
    </div>
  );
}

export default User;
