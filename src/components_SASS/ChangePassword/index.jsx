import React from "react";
import styles from "./ChangePassword.module.scss";
import { toast } from "react-toastify";

// MUI
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Components
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
// Others
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePassword } from "../../api";

function ChangePassword({ onClose }) {
  const dispatch = useDispatch();
  const handleSubmit = async (values, callback) => {
    const { password, newPassword } = values;
    const dataSend = {
      password,
      newPassword,
    };
    try {
      await toast.promise(
        changePassword(dataSend),
        {
          pending: "Hệ thống đang xử lý",
          success: "Đổi mật khẩu thành công",
        },
        {
          style: { fontSize: "1.6rem" },
        }
      );
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
    onClose();
    callback();
  };
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.title}>
          <h3>Đổi mật khẩu</h3>
        </div>

        <div
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <CloseIcon />
        </div>

        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={Yup.object({
            password: Yup.string().required("Thông tin này bắt buộc phải có"),
            newPassword: Yup.string()
              .min(8, "Cần tối thiểu 8 kí tự")
              .required("Thông tin này bắt buộc phải có"),
            confirmNewPassword: Yup.string().oneOf(
              [Yup.ref("newPassword"), null],
              "Mật khẩu không giống"
            ),
          })}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, resetForm);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <TextField
                  type="password"
                  required
                  error={
                    formik.errors.password && formik.touched.password
                      ? true
                      : false
                  }
                  helperText={
                    formik.errors.password
                      ? formik.errors.password
                      : formik.touched.password
                      ? formik.touched.password
                      : ""
                  }
                  color={
                    formik.errors.password && formik.touched.password
                      ? "error"
                      : "success"
                  }
                  focused={
                    formik.errors.password
                      ? false
                      : formik.touched.password && true
                  }
                  fullWidth
                  id="password"
                  label="Nhập mật khẩu cũ"
                  size="large"
                  {...formik.getFieldProps("password")}
                ></TextField>
              </div>

              <div className={styles.field}>
                <TextField
                  type="password"
                  required
                  error={
                    formik.errors.newPassword && formik.touched.newPassword
                      ? true
                      : false
                  }
                  helperText={
                    formik.errors.newPassword
                      ? formik.errors.newPassword
                      : formik.touched.newPassword
                      ? formik.touched.newPassword
                      : ""
                  }
                  color={
                    formik.errors.newPassword && formik.touched.newPassword
                      ? "error"
                      : "success"
                  }
                  focused={
                    formik.errors.newPassword
                      ? false
                      : formik.touched.newPassword && true
                  }
                  fullWidth
                  id="newPassword"
                  label="Nhập mật khẩu mới"
                  size="large"
                  {...formik.getFieldProps("newPassword")}
                ></TextField>
              </div>

              <div className={styles.field}>
                <TextField
                  type="password"
                  required
                  error={
                    formik.errors.confirmNewPassword &&
                    formik.touched.confirmNewPassword
                      ? true
                      : false
                  }
                  helperText={
                    formik.errors.confirmNewPassword
                      ? formik.errors.confirmNewPassword
                      : formik.touched.confirmNewPassword
                      ? formik.touched.confirmNewPassword
                      : ""
                  }
                  color={
                    formik.errors.confirmNewPassword &&
                    formik.touched.confirmNewPassword
                      ? "error"
                      : "success"
                  }
                  focused={
                    formik.errors.confirmNewPassword
                      ? false
                      : formik.touched.confirmNewPassword && true
                  }
                  fullWidth
                  id="confirmNewPassword"
                  label="Xác nhận mật khẩu mới"
                  size="large"
                  {...formik.getFieldProps("confirmNewPassword")}
                ></TextField>
              </div>

              <div className={styles.button}>
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
                  Xác nhận
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ChangePassword;
