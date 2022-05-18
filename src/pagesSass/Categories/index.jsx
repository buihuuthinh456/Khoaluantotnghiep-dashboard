import React, { useEffect, useState } from "react";
import styles from "./Categories.module.scss";

// Redux
import {
  selectCategories,
  fetchCategories,
  deleteCategoryAsync,
} from "../../features/categories/categoriesSlice";
import { selectLogin } from "../../features/login/loginSlice";
// MUI
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import FormCreateCategory from "../../components/FormCreateCategory";

// Other
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function Categories() {
  // useState
  const [mountAdd, setMountAdd] = useState(false);
  const [dataRow, setDataRow] = useState(null)

  // redux
  const loginState = useSelector(selectLogin);
  const categories = useSelector(selectCategories);
  // function redux
  const dispatch = useDispatch();

  // fetch data first time
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // data collumns
  const columns = [
    { field: "id", headerName: "No", width: 70 },
    { field: "name", headerName: "Category Name", flex: 1, sortable: true },
    { field: "_id", headerName: "Category ID", flex: 1 },
    {
      field: "Option",
      headerName: "Option",
      flex: 1,
      renderCell: (param) => {

        const handleEdit = (param) => {
            console.log('row selected', param.row);
          }
        
          const handleDelete = (param) => {
            dispatch(deleteCategoryAsync(param.row))
          }

        return (
          <div className={styles.option}>
            <div className={styles.optionEdit}>
              <Button variant="contained" color="success" onClick={()=>handleEdit(param)}>
                <EditIcon></EditIcon>
              </Button>
            </div>
            <div className={styles.optionDelelte}>
              <Button variant="contained" color="error" onClick={()=>handleDelete(param)}>
                <DeleteIcon></DeleteIcon>
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  // data rows
  const rows =
    categories.categories &&
    categories.categories.map((item, index) => {
      return {
        ...item,
        id: index + 1,
      };
    });

  // function when Click button
  const handleSwitchPage = () => {
    if (loginState.isLogin && loginState.isAdmin) {
      setMountAdd((state) => !state);
    } else {
      toast.error(`You haven't login or not admin`, {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
  };

  //   loading
  if (categories.isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Categories</h2>
        {!mountAdd ? (
          <div className={styles.headerButton}>
            <Button variant="contained" onClick={() => handleSwitchPage()}>
              <AddIcon style={{ fontSize: 20 }}></AddIcon>
              ADD
            </Button>
          </div>
        ) : (
          <div className={styles.headerButton}>
            <Button variant="contained" onClick={() => handleSwitchPage()}>
              <ArrowBackIcon  style={{ fontSize: 20 }}/>
              Back
            </Button>
          </div>
        )}
      </div>

      {!mountAdd && rows && (
        <div className={styles.dataContainer}>
          <DataGrid
            style={{ fontSize: 16 }}
            rows={rows}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
          />
        </div>
      )}
      {mountAdd && <FormCreateCategory></FormCreateCategory>}
    </div>
  );
}

export default Categories;
