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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import FormCreateCategory from "../../components/FormCreateCategory";
import BeforeAction from "../../components_SASS/BeforeAction";

// Other
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function Categories() {
  // useState
  const [mountForm, setMountForm] = useState(false);
  const [dataRow, setDataRow] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [beforeAction, setBeforeAction] = useState(false);
  // redux
  const loginState = useSelector(selectLogin);
  const categories = useSelector(selectCategories);
  const isReload = useSelector(selectCategories).isReload;
  // function redux
  const dispatch = useDispatch();

  // fetch data first time
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (isReload) dispatch(fetchCategories());
  }, [isReload]);

  // data columns
  const columns = [
    { field: "id", headerName: "No", width: 70 },
    { field: "name", headerName: "Tên Phân Loại", flex: 1, sortable: true },
    { field: "_id", headerName: "Mã ID", flex: 1 },
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
        };

        const handleDelete = (param) => {
          setBeforeAction(true);
        };

        return (
          <div className={styles.option}>
            <div className={styles.optionEdit}>
              <Button
                variant="contained"
                color="success"
                onClick={(e) => handleEdit(e)}
              >
                <EditIcon></EditIcon>
              </Button>
            </div>
            <div className={styles.optionDelete}>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => handleDelete(e)}
              >
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
        <h2>Phân loại</h2>
        {!mountForm ? (
          <div className={styles.headerButton}>
            <Button variant="contained" onClick={() => handleSwitchPage()}>
              <AddIcon style={{ fontSize: 20 }}></AddIcon>
              ADD
            </Button>
          </div>
        ) : (
          <div className={styles.headerButton}>
            <Button variant="contained" onClick={() => handleSwitchPage()}>
              <ArrowBackIcon style={{ fontSize: 20 }} />
              Back
            </Button>
          </div>
        )}
      </div>

      {!mountForm && rows && (
        <div className={styles.dataContainer}>
          <DataGrid
            style={{ fontSize: 16 }}
            rows={rows}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
            onRowClick={(e) => setDataRow(e.row)}
          />
        </div>
      )}
      {mountForm && <FormCreateCategory isEdit={isEdit} dataRow={dataRow} />}
      {console.log("data row", dataRow)}
      {beforeAction && (
        <BeforeAction
          title="Xóa Category"
          onCancel={() => setBeforeAction(false)}
          onConfirm={() => {
            setBeforeAction(false);
            dispatch(deleteCategoryAsync(dataRow));
          }}
        ></BeforeAction>
      )}
    </div>
  );
}

export default Categories;
