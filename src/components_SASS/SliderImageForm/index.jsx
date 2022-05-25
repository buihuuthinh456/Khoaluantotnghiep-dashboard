import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./SliderImageForm.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  createSliderImageAsync,
  fetchImgSlider,
  selectImgSlider,
} from "../../features/imgSlider/imgSliderSlice";

import { Formik } from "formik";
import * as Yup from "yup";

function SliderImageForm() {
  const [selectedFile, setSelectedFile] = useState();
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = (values, callback) => {
    // console.log(values);
    if (!selectedFile) {
      toast.error("Vui lòng chọn ảnh", {
        style: {
          fontSize: "1.6rem",
        },
      });
    } else {
      const form = new FormData();
      form.append("fileUpload", selectedFile);
      const dataSend = {
        name: values.name,
        form: form,
      };
      console.log(dataSend);
      dispatch(createSliderImageAsync(dataSend));
      callback();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chọn ảnh Slider</h1>

      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Thông tin này bắt buộc phải có"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.wrapper}>
              <div className={styles.field}>
                <TextField
                  required
                  error={
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
                  id="name"
                  label="Enter name"
                  size="large"
                  {...formik.getFieldProps("name")}
                ></TextField>
              </div>
              <div className={styles.imgUpload}>
                <input
                  type="file"
                  onChange={handleUpload}
                  id="image"
                  name="Image"
                  style={{ margin: 8, marginRight: 0, marginLeft: 0 }}
                />
              </div>

              <div className={styles.btn}>
                <Button
                  color="success"
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
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SliderImageForm;
