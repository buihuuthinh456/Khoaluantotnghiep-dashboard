import React, { useEffect } from "react";
import styles from "./User.module.scss";
// router
import { useNavigate } from "react-router-dom";
// redux
import { selectUsers, fetchUsers } from "../../features/users/usersSlice";
import { selectLogin } from "../../features/login/loginSlice";
import { useSelector, useDispatch } from "react-redux";

// MUI
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";

// Others
import { toast } from "react-toastify";

function User() {
  // redux select
  const data = useSelector(selectUsers);
  console.log("user Data", data);
  const token = useSelector(selectLogin).accessToken;
  const isLogin = useSelector(selectLogin).isLogin;

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
    { field: "_id", headerName: "Code", flex: 1 },
    // { field: "Option", headerName: "Option", flex: 1, renderCell: (param) => {
    //     const handleClick = (e) => {
    //         // e.stopPropagation()
    //         console.log('hello World')
    //     }
    //     return (
    //         <div className={styles.option}>
    //             <div className={styles.optionEdit}>
    //                 <Button variant="contained" color="success">
    //                     <EditIcon></EditIcon>
    //                 </Button>
    //             </div>
    //             <div className={styles.optionDelelte}>
    //                 <Button variant="contained" color="error">
    //                     <DeleteIcon></DeleteIcon>
    //                 </Button>
    //             </div>
    //         </div>
    //     )
        
    // }}
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
    console.log("row select", e.row);
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
          onRowDoubleClick={(e)=>handleDetail(e)}
          // checkboxSelection
        />
      </div>
    </div>
  );
}

export default User;
