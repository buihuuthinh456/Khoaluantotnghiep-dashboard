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
  const dispatch = useDispatch();
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
      };
      console.log("dataSubmit", data)
      dispatch(createMoreInfoProductAsync(data));
    } else {
      console.log("vui lòng đăng nhập");
    }

    callback();
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          moreDesc: "",
          table: "",
        }}
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
