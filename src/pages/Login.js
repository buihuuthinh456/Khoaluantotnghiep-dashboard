import React, { useEffect } from "react";
import Button from "../components/Button/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.min.css";

import { useDispatch, useSelector } from "react-redux";
import {
  handleLogin as handleLoginAsync,
  selectLogin,
} from "../features/login/loginSlice";

function Login() {
  const loginUser = useSelector(selectLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (loginUser.isLogin === true) navigate("/");
  }, [loginUser.isLogin]);

  const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 0;
  `;

  const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const Text = styled.p`
    font-size: 1.6rem;
    margin-bottom: 8px;
  `;

  const Header = styled.h1`
    margin-bottom: 12px;
    position: relative;
    ::after {
      content: "";
      display: block;
      position: absolute;
      top: 120%;
      border: 1px solid var(--border-color);
      width: 200%;
      transform: translateX(-25%);
    }
  `;
  const Form = styled.form`
    width: 500px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 12px 12px 0;
  `;
  const Field = styled.div`
    display: flex;
    margin: 8px 0;
    position: relative;
    width: 100%;
  `;
  const Label = styled.label`
    font-size: 1.6rem;
    top: -15px;
    left: 23px;
    padding: 2px;
    z-index: 1;
    font-size: 16px;
    font-weight: 500;
    display: inline-block;
    margin-bottom: 0.5rem;
    position: absolute;
    color: ${(props) =>
      props.state === "error"
        ? "#ff4842"
        : props.state === "handling"
        ? "#00ab55"
        : "black"};
    ::after {
      content: " ";
      background-color: #fff;
      width: 100%;
      height: 13px;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: -1;
    }
    ::placeholder {
      color: #d8dde1;
    }
  `;

  const Input = styled.input`
    box-shadow: none !important;
    padding: 16px;
    width: 300px;
    border: 1px solid
      ${(props) =>
        props.state === "error"
          ? "#ff4842"
          : props.state === "handling"
          ? "#00ab55"
          : "#d8dde1"};
    border-radius: 4px;
    outline: none;
    width: 100%;
  `;
  const Error = styled.div`
    font-size: 1.6rem;
    color: #ff4842;
  `;

  const handleLogin = async (values, func) => {
    const { email, password } = values;

    const dataPost = {
      email,
      password,
    };
    dispatch(handleLoginAsync(dataPost));

    func();
  };

  return (
    <Container>
      <Header>????ng nh???p</Header>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Th??ng tin n??y b???t bu???c ph???i c??"),
          password: Yup.string().required("Th??ng tin n??y b???t bu???c ph???i c??"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values, resetForm);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Field>
              <Label
                htmlFor="email"
                state={
                  formik.errors.email
                    ? "error"
                    : formik.touched.email
                    ? "handling"
                    : null
                }
              >
                ?????a ch??? email<span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                state={
                  formik.errors.email
                    ? "error"
                    : formik.touched.email
                    ? "handling"
                    : null
                }
                placeholder="...?????a ch??? Email"
              />
            </Field>
            {formik.touched.email && formik.errors.email ? (
              <Error>{formik.errors.email}</Error>
            ) : null}
            <Field>
              <Label
                htmlFor="password"
                state={
                  formik.errors.password
                    ? "error"
                    : formik.touched.password
                    ? "handling"
                    : null
                }
              >
                M???t kh???u<span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                state={
                  formik.errors.password
                    ? "error"
                    : formik.touched.password
                    ? "handling"
                    : null
                }
                placeholder="...M???t kh???u"
              />
            </Field>
            {formik.touched.password && formik.errors.password ? (
              <Error>{formik.errors.password}</Error>
            ) : null}
            <Field>
              <Button
                type="submit"
                fontSize="1.6rem"
                size="large"
                width="100%"
                margin="12px 0 0 0"
                bgColor="#00ab55"
                isSubmitting={formik.isSubmitting}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
              >
                ????ng nh???p
              </Button>
            </Field>
            <Text>
              <Link to="/forgetPassWord">Qu??n m???t kh???u</Link>
            </Text>
            <Text>
              B???n ch??a c?? t??i kho???n? <Link to="/register">????ng k??</Link>
            </Text>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Login;
