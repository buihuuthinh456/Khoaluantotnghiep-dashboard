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
import { Formik } from "formik";
import * as Yup from "yup";
import { createMoreInfoProductAsync } from "../../features/detailProduct/detailProductSlice";
//

function MoreInfoProduct({ id }) {

  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState();

  //   function

  // image
  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  //   submit
  const handleSubmit = (values, callback) => {
    const form = new FormData();
    form.append("fileUpload", selectedFile);
    if (localStorage.getItem("accessToken")) {
        const data = {
            id: id,
            value: values,
            formImg: form,
        }
        dispatch(createMoreInfoProductAsync(data))
    } else {
        console.log("vui lòng đăng nhập");
    }

    callback()
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          title: "",
          table: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Thông tin này bắt buộc phải có"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.wrapper}>
              <div className={styles.productInfo}>
                <div className={styles.field}>
                  <TextField
                    required
                    error={
                      formik.errors.title && formik.touched.title ? true : false
                    }
                    helperText={
                      formik.errors.title
                        ? formik.errors.title
                        : formik.touched.title
                        ? formik.touched.title
                        : ""
                    }
                    color={
                      formik.errors.title && formik.touched.title
                        ? "error"
                        : "success"
                    }
                    focused={
                      formik.errors.title ? false : formik.touched.title && true
                    }
                    id="title"
                    label="Enter title"
                    size="large"
                    {...formik.getFieldProps("title")}
                  ></TextField>
                </div>
                <div className={styles.field}>
                  <TextField
                    id="table"
                    multiline
                    minRows={3}
                    style={{ width: "100%", minHeight: "200px" }}
                    label="Nhập bảng thông số (nếu có)"
                    size="large"
                    {...formik.getFieldProps("table")}
                  ></TextField>
                </div>
              </div>

              <div className={styles.imgUpload}>
                <h1>Ảnh sơ đồ chân</h1>
                <input
                  type="file"
                  onChange={handleUpload}
                  id="image"
                  name="Image"
                  style={{ margin: 8, marginRight: 0, marginLeft: 0 }}
                />
              </div>
            </div>

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
          </form>
        )}
      </Formik>
    </div>
  );
}

export default MoreInfoProduct;
