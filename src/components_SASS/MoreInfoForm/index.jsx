import React, { useEffect, useState } from "react";
import styles from "./MoreInfoProduct.module.scss";
// redux
import { useSelector, useDispatch } from "react-redux";
// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Comp
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
// Others
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  createMoreInfoProductAsync,
  updateMoreInfoProductAsync,
} from "../../features/detailProduct/detailProductSlice";
//

function MoreInfoProduct({ id, isEdit, dataSend, afterSubmit }) {
  console.log("dataSend", dataSend);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState();

  //   function

  // image
  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  //   submit
  const handleSubmit = (values, callback) => {
    // const form = new FormData();
    // form.append("fileUpload", selectedFile);
    // if (localStorage.getItem("accessToken")) {
    //   let data = {
    //     id: id,
    //     value: values,
    //     formImg: form,
    //   };
    //   if (isEdit) {
    //     data = {
    //       ...data,
    //       _id: dataSend._id,
    //     };
    //     dispatch(updateMoreInfoProductAsync(data));
    //     afterSubmit();
    //   } else {
    //     dispatch(createMoreInfoProductAsync(data));
    //     afterSubmit();
    //   }
    // } else {
    //   console.log("vui lòng đăng nhập");
    // }
    // callback();

    let form = null;
    if (selectedFile) {
      form = new FormData();
      form.append("fileUpload", selectedFile);
    }
    const accessToken = localStorage.getItem("accessToken");
    let data = {
      ...dataSend,
      id: id,
      value: values,
      formImg: form,
      accessToken: accessToken,
    };
    if (!isEdit) {
      dispatch(createMoreInfoProductAsync(data));
      afterSubmit();
      callback();
    } else {
      data = {
        ...data,
        _id: dataSend._id,
      };
      dispatch(updateMoreInfoProductAsync(data));
      afterSubmit();
      callback();
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={
          dataSend
            ? {
                moreDesc: dataSend.moreDesc,
                table: dataSend.table,
              }
            : {
                moreDesc: "",
                table: "",
              }
        }
        validationSchema={Yup.object({
          moreDesc: Yup.string().required("Thông tin này bắt buộc phải có"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            {/* <h1>Ảnh sơ đồ chân</h1> */}
            <div className={styles.wrapper}>
              <div className={styles.imgUpload}>
                <input
                  placeholder="Chọn ảnh"
                  type="file"
                  onChange={handleUpload}
                  id="image"
                  name="Image"
                  style={{ margin: 8, marginRight: 0, marginLeft: 0 }}
                />

                {/* {dataSend?.url_img && (
                  <div className={styles.preview}>
                    <h3 style={{ margin: "20px 0" }}>Ảnh trước</h3>
                    <img src={dataSend.url_img[0].url} alt="..."></img>
                  </div>
                )} */}
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
                    Submit
                  </Button>
                </div>
              </div>
              <div className={styles.productInfo}>
                <div className={styles.field}>
                  <TextField
                    required
                    multiline
                    minRows={3}
                    error={
                      formik.errors.moreDesc && formik.touched.moreDesc
                        ? true
                        : false
                    }
                    helperText={
                      formik.errors.moreDesc
                        ? formik.errors.moreDesc
                        : formik.touched.moreDesc
                        ? formik.touched.moreDesc
                        : ""
                    }
                    color={
                      formik.errors.moreDesc && formik.touched.moreDesc
                        ? "error"
                        : "success"
                    }
                    focused={
                      formik.errors.moreDesc
                        ? false
                        : formik.touched.moreDesc && true
                    }
                    fullWidth
                    id="moreDesc"
                    label="Mô tả về sản phẩm"
                    size="large"
                    {...formik.getFieldProps("moreDesc")}
                  ></TextField>
                </div>
                <div className={styles.field}>
                  <TextField
                    id="table"
                    multiline
                    minRows={3}
                    style={{
                      width: "100%",
                      minHeight: "200px",
                      marginLeft: 20,
                    }}
                    label="Bảng thông số kỹ thuật (truyền dưới dạng html)"
                    size="large"
                    {...formik.getFieldProps("table")}
                  ></TextField>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default MoreInfoProduct;
