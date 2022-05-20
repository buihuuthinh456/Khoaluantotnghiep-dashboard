import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
// router
import { Link, useSearchParams, useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  fetchProducts,
  searchProduct,
  deleteProductAsync,
} from "../../features/products/productsSlice";

import { selectLogin } from "../../features/login/loginSlice";
// MUI
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

// Components
import AddProduct from "../../components_SASS/AddForm";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
// Other
import { toast } from "react-toastify";
import CurrencyFormat from "../../functionJS";
import { MenuItem } from "@mui/material";
import BeforeAction from "../../components_SASS/BeforeAction";

function Products() {
  // redux
  const productList = useSelector(selectProducts).products;
  const categories = useSelector(selectProducts).category;
  const isLoading = useSelector(selectProducts).isLoading;
  const totalPageValue = useSelector(selectProducts).totalPage;
  const user = useSelector(selectLogin);
  const loginState = useSelector(selectLogin);
  //   useState
  const [totalPage, setTotalPage] = useState(totalPageValue);
  const [mountForm, setMountForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState();
  const [query, setQuery] = useState({
    page: 1,
    limit: 12,
    "category[regex]": undefined,
  });
  const [beforeAction, setBeforeAction] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [dataSelect, setDataSelect] = useState(null)

  //   function
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  //   useEffect
  useEffect(() => {
    setTotalPage(totalPageValue);
  }, [totalPageValue]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // useEffect(() => {
  //   // if (dataSelect._id) {
      
  //   //   // dispatch(deleteProductAsync(dataSelect._id))
  //   // }
  //   console.log('data confirm', isConfirm)
  // }, [isConfirm]);

  //   data columns
  const columns = [
    { field: "id", headerName: "No", width: 70},
    { field: "name", headerName: "Product Name", flex: 2 },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (param) => {
        return <span>{CurrencyFormat(param.row.price)}</span>;
      },
    },
    {
      field: "Option",
      headerName: "Option",
      sortable: true,
      flex: 1,
      renderCell: (param) => {
        //   const handleEdit = (e) => {
        //     e.stopPropagation()
        //     setIsEdit(true);
        //     setMountForm(true);
        //     setDataRow(param.row);
        //   };

          const handleDelete = (param) => {
            setBeforeAction(state=>!state)
          };

        const handleDetail = (e) => {
          navigate(`/products/${param.row._id}`)
        }

        return (
          <div className={styles.option}>
            <div className={styles.optionBtn}>
              <Button
                variant="contained"
                color="success"
                //   onClick={(e) => handleEdit(e)}
              >
                <EditIcon></EditIcon>
              </Button>
            </div>
            <div className={styles.optionBtn}>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => handleDelete(e)}
              >
                <DeleteIcon></DeleteIcon>
              </Button>
            </div>
            <div className={styles.optionBtn}>
              <Button
                variant="contained"
                color="info"
                  onClick={(e) => handleDetail(e)}
              >
                <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  // data rows
  const rows =
    productList &&
    productList.map((item, index) => {
      return {
        ...item,
        id: index + 1,
      };
    });

  // function when click
  const handleAddForm = () => {
    if (loginState.isLogin && loginState.isAdmin) {
      setMountForm((state) => !state);
    } else {
      toast.error(`You haven't login or not admin`, {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
  };

  const handleChangePage = (e, value) => {
    setPage(value);
    setQuery((state) => {
      const param = { ...state, page: value };
      Object.keys(param).forEach((key) => {
        return (
          (param[key] === undefined || param[key] === false) &&
          delete param[key]
        );
      });
      setSearchParams(param);
      dispatch(searchProduct(param));
      return param;
    });
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
    const value = e.target.value === 'all' ? undefined : e.target.value
    setQuery(state => {
      const param = { ...state, "category[regex]": value,}
      Object.keys(param).forEach((key) => {
        return (
          (param[key] === undefined || param[key] === false) &&
          delete param[key]
        );
      });
      setSearchParams(param);
      dispatch(searchProduct(param));
      return param;
    })
  };

  //   loading
  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{mountForm ? 'Add Product' : 'Products'}</h2>
        {!mountForm && 
          <div className={styles.category}>
            <FormControl>
              <InputLabel id="filter-data">Category</InputLabel>
              <Select
                labelId="filter-data"
                id="demo-simple-select"
                value={category}
                label="Filter"
                onChange={handleChangeCategory}
              >
                <MenuItem value="all">All</MenuItem>
                {categories &&
                  categories.map((item) => {
                    return (
                      <MenuItem key={item._id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
        }
        {!mountForm ? (
          <div className={styles.headerButton}>
            <Button variant="contained" onClick={() => handleAddForm()}>
              <AddIcon style={{ fontSize: 20 }}></AddIcon>
              ADD
            </Button>
          </div>
        ) : (
          <div className={styles.headerButton}>
            <Button variant="contained" onClick={() => handleAddForm()}>
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
            pageSize={12}
            rowsPerPageOptions={[5]}
            onRowClick={(e) => setDataSelect(e.row)}
          />
          <div className={styles.pagination}>
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      )}
      {mountForm && <AddProduct />}
      {beforeAction && <BeforeAction 
        title = "Xóa Sản phẩm"
        onCancel = {()=>setBeforeAction(false)}
        onConfirm = {()=>{
          setBeforeAction(false)
          dispatch(deleteProductAsync(dataSelect._id))
        }} 
      />}
    </div>
  );
}

export default Products;