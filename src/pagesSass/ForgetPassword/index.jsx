import React from "react";
import styles from "./ForgetPassword.module.scss";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { requestResetPassword } from "../../api";
function ForgetPassword() {
  const handleSubmit = async(values, callback) => {
    const dataPost = values
    try {
        await toast.promise(
            requestResetPassword(dataPost),
          {
            pending: "Hệ thống đang xử lý",
            success: "Đã gửi request đến email",
          },
          {
            style: { fontSize: "1.6rem" },
          }
        );
        callback()
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          style: { fontSize: "1.6rem" },
        });
      }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Đây không phải là email")
              .required("Bạn phải nhập email"),
          })}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, resetForm);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <h3 className={styles.title}>
                    Vui lòng nhập email
                </h3>
              <div className={styles.field}>
                <TextField
                  type="email"
                  required
                  error={
                    formik.errors.email
                      ? true
                      : formik.touched.email
                      ? false
                      : null
                  }
                  helperText={
                    formik.errors.email
                      ? formik.errors.email
                      : formik.touched.email
                      ? formik.touched.email
                      : ""
                  }
                  color={
                    formik.errors.email
                      ? "error"
                      : formik.touched.email
                      ? "success"
                      : null
                  }
                  focused={
                    formik.errors.email
                      ? false
                      : formik.touched.email
                      ? true
                      : null
                  }
                  fullWidth
                  id="email"
                  label="Email của bạn"
                  size="large"
                  {...formik.getFieldProps("email")}
                />
              </div>
              <div className={styles.button}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  isSubmitting={formik.isSubmitting}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                >
                  Gửi yêu cầu
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgetPassword;
