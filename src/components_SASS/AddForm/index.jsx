import React, { useEffect, useState } from "react";
import styles from "./AddForm.module.scss";

// redux
import { selectLogin } from "../../features/login/loginSlice";
import {
  selectProducts,
  createProductThunk,
  updateProductAsync,
} from "../../features/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
// MUI
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
// Components
// others
import { Formik } from "formik";
import * as Yup from "yup";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";

function AddForm({ isEdit, dataSend, afterSubmit }) {
  const [preData, setPreData] = useState();

  useEffect(() => {
    setPreData(dataSend);
  }, [dataSend]);
  console.log("dataSend", dataSend)
  // redux
  const loginState = useSelector(selectLogin);
  const listCategory = useSelector(selectProducts).category;
  const isLoading = useSelector(selectProducts).isLoading;
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    setCategory(listCategory[0].name);
  }, [listCategory.length]);

  const [selectedFile, setSelectedFile] = useState();
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  // useState
  const [category, setCategory] = useState("");
  const [mountInfo, setMountInfo] = useState(false);
  const [preview, setPreview] = useState();

  //   function when upload img

  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (values, func) => {
    // const form = new FormData();
    // form.append("fileUpload", selectedFile);
    // const accessToken = loginState.accessToken;
    // let data = {
    //   value: values,
    //   formImg: form,
    //   accessToken: accessToken,
    // };
    // if (!isEdit) {
    //   dispatch(createProductThunk(data));
    //   func();
    // } else {
    //   data = {
    //     ...dataSend,
    //     ...data,
    //     id: dataSend._id,
    //   };
    //   console.log("data send when edit", data);
    //   dispatch(updateProductAsync(data));
    //   afterSubmit();
    // }

    let form = null
    if (selectedFile) {
      form = new FormData()
      form.append("fileUpload", selectedFile);
    }
    const accessToken = loginState.accessToken;
    let data = {
      ...dataSend,
      value: values,
      formImg: form,
      accessToken: accessToken,
    }
    if (!isEdit) {
      if (form === null) {
        toast.warning("Vui l??ng ch???n ???nh", {
          style: {
            fontSize: "1.6rem",
          },
        });
      } else {
        console.log("dataSubmit", data)
        dispatch(createProductThunk(data));
        afterSubmit();
        func();
      }
    } else {
      data = {
        ...data,
        id: dataSend._id,
      }
      dispatch(updateProductAsync(data));
      afterSubmit();
      func();
    }
  };

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  return (
    <div className={styles.container}>
      <Formik
        initialValues={
          dataSend
            ? {
                name: dataSend.name,
                productID: dataSend.productId,
                category: dataSend.category,
                price: dataSend.price,
                description: dataSend.description,
              }
            : {
                name: "",
                productID: "",
                category: "",
                price: "",
                description: "",
              }
        }
        validationSchema={Yup.object({
          name: Yup.string().required("Th??ng tin n??y b???t bu???c ph???i c??"),
          productID: Yup.string().required("Th??ng tin n??y b???t bu???c ph???i c??"),
          category: Yup.string().required("Cho??n category"),
          price: Yup.string().required("Th??ng tin n??y b???t bu???c ph???i c??"),
          description: Yup.string().required("Th??ng tin n??y b???t bu???c ph???i c??"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.importantInfo}>
              <div className={styles.productInfo}>
                <div className={styles.field}>
                  <TextField
                    required
                    error={
                      // formik.errors.productID
                      // ? true
                      // : formik.touched.productID
                      // ? false
                      // : null
                      formik.errors.productID && formik.touched.productID
                        ? true
                        : false
                    }
                    helperText={
                      formik.errors.productID
                        ? formik.errors.productID
                        : formik.touched.productID
                        ? formik.touched.productID
                        : ""
                    }
                    color={
                      formik.errors.productID && formik.touched.productID
                        ? "error"
                        : "success"
                    }
                    focused={
                      formik.errors.productID
                        ? false
                        : formik.touched.productID && true
                    }
                    fullWidth
                    id="productID"
                    label="M?? ID s???n ph???m"
                    size="large"
                    {...formik.getFieldProps("productID")}
                  ></TextField>
                </div>

                <div className={styles.field}>
                  <TextField
                    required
                    error={
                      // formik.errors.productID
                      // ? true
                      // : formik.touched.productID
                      // ? false
                      // : null
                      formik.errors.name && formik.touched.name ? true : false
                    }
                    helperText={
                      formik.errors.name
                        ? formik.errors.name
                        : formik.touched.name
                        ? formik.touched.name
                        : ""
                    }
                    color={
                      formik.errors.name && formik.touched.name
                        ? "error"
                        : "success"
                    }
                    focused={
                      formik.errors.name ? false : formik.touched.name && true
                    }
                    fullWidth
                    id="name"
                    label="T??n s???n ph???m"
                    size="large"
                    {...formik.getFieldProps("name")}
                  ></TextField>
                </div>

                <div className={styles.field}>
                  <FormControl
                    fullWidth
                    error={
                      formik.errors.category && formik.touched.category
                        ? true
                        : false
                    }
                    helperText={
                      formik.errors.category
                        ? formik.errors.category
                        : formik.touched.category
                        ? formik.touched.category
                        : ""
                    }
                    color={
                      formik.errors.category && formik.touched.category
                        ? "error"
                        : "success"
                    }
                    focused={
                      formik.errors.category
                        ? false
                        : formik.touched.category && true
                    }
                  >
                    <InputLabel id="filter-data">Ph??n lo???i</InputLabel>
                    <Select
                      labelId="filter-data"
                      id="category"
                      value={category}
                      label="Filter"
                      {...formik.getFieldProps("category")}

                      // onChange={handleChangeCategory}
                    >
                      {listCategory.length !== 0 &&
                        listCategory.map((item) => {
                          return (
                            <MenuItem key={item._id} value={item.name}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>

                <div className={styles.field}>
                  <TextField
                    required
                    type="number"
                    error={
                      // formik.errors.productID
                      // ? true
                      // : formik.touched.productID
                      // ? false
                      // : null
                      formik.errors.price && formik.touched.price ? true : false
                    }
                    helperText={
                      formik.errors.price
                        ? formik.errors.price
                        : formik.touched.price
                        ? formik.touched.price
                        : ""
                    }
                    color={
                      formik.errors.price && formik.touched.price
                        ? "error"
                        : "success"
                    }
                    focused={
                      formik.errors.price ? false : formik.touched.price && true
                    }
                    fullWidth
                    id="price"
                    label="Gi?? ti???n"
                    size="large"
                    {...formik.getFieldProps("price")}
                  ></TextField>
                </div>

                <div className={styles.field}>
                  <TextField
                    sx={{ height: 200 }}
                    multiline
                    minRows={3}
                    required
                    error={
                      // formik.errors.productID
                      // ? true
                      // : formik.touched.productID
                      // ? false
                      // : null
                      formik.errors.description && formik.touched.description
                        ? true
                        : false
                    }
                    helperText={
                      formik.errors.description
                        ? formik.errors.description
                        : formik.touched.description
                        ? formik.touched.description
                        : ""
                    }
                    color={
                      formik.errors.description && formik.touched.description
                        ? "error"
                        : "success"
                    }
                    focused={
                      formik.errors.description
                        ? false
                        : formik.touched.description && true
                    }
                    style={{ width: "100%", minHeight: "200px" }}
                    id="description"
                    label=""
                    size="large"
                    placeholder="M?? t??? s???n ph???m"
                    {...formik.getFieldProps("description")}
                  ></TextField>
                </div>
              </div>

              <div className={styles.imgUpload}>
                <h1>???nh s???n ph???m</h1>
                <input
                  type="file"
                  onChange={handleUpload}
                  id="image"
                  name="Image"
                  style={{ margin: 8, marginRight: 0, marginLeft: 0 }}
                />
                {selectedFile && (
                  <div className={styles.preview}>
                    {console.log("image prevew", preview)}
                    <img src={preview} alt="..."></img>
                  </div>
                )}

                {dataSend?.images && <div className={styles.preview}>
                    <h3 style={{margin: "20px 0"}}>???nh tr?????c</h3>
                    <img src={dataSend.images[0].url} alt="..."></img>
                  </div>}

                <div className={styles.submitBtn}>
                  <Button
                    variant="contained"
                    type="submit"
                    isSubmitting={formik.isSubmitting}
                    disable={formik.isSubmitting}
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                  >
                    {isEdit ? "Ch???nh s???a" : "T???o m???i"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddForm;
