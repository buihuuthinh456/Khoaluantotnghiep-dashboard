import React, {useState, useEffect} from "react";
import styled from "styled-components";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryThunk,
  selectCategories,
  updateCategoryAsync,
} from "../features/categories/categoriesSlice";
import { selectLogin } from "../features/login/loginSlice";

// Components
import Button from "./Button/Button";
import Modal from "./Modal";
import Loading from "./Loading";
// Other
import { Formik } from "formik";
import * as Yup from "yup";

function FormCreateCategory({ isEdit, dataRow }) {
  
  const [data, setData] =useState()

  useEffect(()=>{
    setData(dataRow)
  }, [dataRow])

  const loginState = useSelector(selectLogin);
  const isLoading = useSelector(selectCategories).isLoading;
  const dispatch = useDispatch();

  const handleSubmit = async (values, func) => {
    if (!isEdit) {
      const token = loginState.accessToken;
      const object = {
        values,
        token,
      };
      dispatch(createCategoryThunk(object));
      func();
    } else {
      const token = loginState.accessToken;
      const dataPost = {
        id: dataRow._id,
        token,
        values
      }
      dispatch(updateCategoryAsync(dataPost))
      dataRow.name = null
      func()
    }
  };

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );

  return (
    <Container>
      <Header>
        <h1>{isEdit ? "Edit Category" : "Create Category"}</h1>
      </Header>

      <Formik
        initialValues={
          isEdit && 
          dataRow
            ? {
                name: dataRow.name,
              }
            : {
                name: "",
              }
        }
        validationSchema={Yup.object({
          name: Yup.string().required("Thông tin này bắt buộc phải có"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Field>
              <Label
                htmlFor="name"
                state={
                  formik.errors.name
                    ? "error"
                    : formik.touched.name
                    ? "handling"
                    : null
                }
              >
                Name
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="text"
                id="name"
                {...formik.getFieldProps("name")}
                state={
                  formik.errors.name
                    ? "error"
                    : formik.touched.name
                    ? "handling"
                    : null
                }
                placeholder="Category name"
              />
            </Field>
            {formik.errors.name && formik.touched.name ? (
              <Error>{formik.errors.name}</Error>
            ) : null}
            <Field>
              <Button
                type="submit"
                fontSize="1.6rem"
                size="large"
                width="50%"
                margin="12px 0 0 0"
                bgColor="#00ab55"
                value="123"
                isSubmitting={formik.isSubmitting}
                disable={formik.isSubmitting}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
              >
                Create Product
              </Button>
            </Field>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default FormCreateCategory;

const Container = styled.div`
  padding: 12px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  margin-bottom: 24px;
  display: flex;
  h1 {
    font-size: 2.4rem;
    margin-left: 12px;
  }
`;

const Form = styled.form`
  /* display: flex; */
  width: 60%;
  min-height: 400px;
`;

const Field = styled.div`
  display: flex;
  margin: 16px 0;
  position: relative;
  width: 100%;
  justify-content: center;
`;

const Label = styled.label`
  background-color: transparent;
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
  margin: 12px 0;
`;
