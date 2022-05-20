import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "./Button/Button";
import { selectLogin } from "../features/login/loginSlice";
import {
  selectProducts,
  createProductThunk,
} from "../features/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";


// Component
import Modal from "../components/Modal";
import Loading from "../components/Loading";

// MUI
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddProduct({ callback }) {
  const loginState = useSelector(selectLogin);
  const listCategory = useSelector(selectProducts).category;
  const isLoading = useSelector(selectProducts).isLoading;
  const dispatch = useDispatch();
  useEffect(() => {
    setCategory(listCategory[0].name);
  }, [listCategory.length]);

  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (values, func) => {
    const form = new FormData();
    form.append("fileUpload", selectedFile);

    // try {
    //   const imgUpload = await toast.promise(uploadImage(form, loginState.accessToken),{
    //     pending: 'Upload image to cloud',
    //     success: 'Upload image successfully 👌',
    //     error: 'Upload image error 🤯'
    //   },{
    //     style:{fontSize:"1.6rem"}
    //   });

    //   const {data} = imgUpload
    //   const {name,
    //         productID,
    //         category,
    //         price,
    //         description} = values

    //   const dataPost = {
    //     productId: productID,
    //     name: name,
    //     description: description,
    //     price: price,
    //     category: category,
    //     images: [data]
    //   }
    //   const res = await toast.promise(createProduct(dataPost, loginState.accessToken),{
    //     pending: 'Creating a product',
    //     success: 'Create successfully 👌',
    //     error: 'Create Error 🤯'
    //   },{
    //     style:{fontSize:"1.6rem"}
    //   });
    // } catch (error) {
    //   console.log(error.response);
    //   toast.error(error.response.data.msg, {
    //     position: toast.POSITION.TOP_RIGHT,
    //     style:{fontSize:"1.6rem"}
    //   });
    // }
    const accessToken = loginState.accessToken
    const data = {
      value: values,
      img:form,
      accessToken:accessToken
    }
    console.log('data before submut', data);
    dispatch(createProductThunk(data));

    func();
  };

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );

  return (
    <Container>
      {/* <Header>
        <ButtonBack onClick={(e) => callback(false)}>
          <ArrowBackIcon style={{ fontSize: "2rem" }} />
        </ButtonBack>
        <h1>Add Product </h1>
      </Header> */}
      <Formik
        initialValues={{
          name: "",
          productID: "",
          category: "",
          price: "",
          description: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Thông tin này bắt buộc phải có"),
          productID: Yup.string().required("Thông tin này bắt buộc phải có"),
          category: Yup.string().required("Chọn category"),
          price: Yup.string().required("Thông tin này bắt buộc phải có"),
          description: Yup.string().required("Thông tin này bắt buộc phải có"),
        })}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <ProductInfo>
              <Field>
                <Label
                  htmlFor="productID"
                  state={
                    formik.errors.productID
                      ? "error"
                      : formik.touched.productID
                      ? "handling"
                      : null
                  }
                >
                  Product ID
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  id="productID"
                  type="text"
                  {...formik.getFieldProps("productID")}
                  state={
                    formik.errors.productID
                      ? "error"
                      : formik.touched.productID
                      ? "handling"
                      : null
                  }
                  placeholder="Product ID"
                />
              </Field>
              {formik.errors.productID && formik.touched.productID ? (
                <Error>{formik.errors.productID}</Error>
              ) : null}
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
                  placeholder="Product name"
                />
              </Field>
              {formik.errors.name && formik.touched.name ? (
                <Error>{formik.errors.name}</Error>
              ) : null}
              <Field>
                <Label
                  htmlFor="category"
                  state={
                    formik.errors.category
                      ? "error"
                      : formik.touched.category
                      ? "handling"
                      : null
                  }
                >
                  Category
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  name="category"
                  {...formik.getFieldProps("category")}
                  state={
                    formik.errors.category
                      ? "error"
                      : formik.touched.category
                      ? "handling"
                      : null
                  }
                  id="category"
                >
                  <Option defaultValue>Choose category</Option>
                  {listCategory.length !== 0 &&
                    listCategory.map((item) => (
                      <Option key={item._id} value={item.name}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </Field>
              {formik.errors.category && formik.touched.category ? (
                <Error>{formik.errors.category}</Error>
              ) : null}
              <Field>
                <Label
                  htmlFor="price"
                  state={
                    formik.errors.price
                      ? "error"
                      : formik.touched.price
                      ? "handling"
                      : null
                  }
                >
                  Price
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  type="number"
                  {...formik.getFieldProps("price")}
                  id="price"
                  placeholder="Product Price"
                  state={
                    formik.errors.price
                      ? "error"
                      : formik.touched.price
                      ? "handling"
                      : null
                  }
                />
              </Field>
              {formik.errors.price && formik.touched.price ? (
                <Error>{formik.errors.price}</Error>
              ) : null}
              <Field>
                <Label
                  htmlFor="description"
                  state={
                    formik.errors.description
                      ? "error"
                      : formik.touched.description
                      ? "handling"
                      : null
                  }
                >
                  Description
                  {/* <span style={{color: 'red'}}>*</span> */}
                </Label>
                <TextArea
                  type="text"
                  state={
                    formik.errors.description
                      ? "error"
                      : formik.touched.description
                      ? "handling"
                      : null
                  }
                  {...formik.getFieldProps("description")}
                  id="description"
                  placeholder="Write description.."
                />
              </Field>
              {formik.errors.description && formik.touched.description ? (
                <Error>{formik.errors.description}</Error>
              ) : null}
            </ProductInfo>
            <ImageUpload>
              <h1>Image</h1>
              <input
                type="file"
                onChange={handleUpload}
                id="image"
                name="Image"
                style={{ margin: 8, marginRight: 0, marginLeft: 0 }}
              />
              {selectedFile && (
                <Preview>
                  <img src={preview} alt="..."></img>
                </Preview>
              )}
              <Field>
                <Button
                  type="submit"
                  fontSize="1.6rem"
                  size="large"
                  width="100%"
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
            </ImageUpload>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AddProduct;

const Container = styled.div`
  padding: 12px 0;
`;

const Header = styled.div`
  margin-bottom: 24px;
  display: flex;
  h1 {
    font-size: 2.4rem;
    margin-left: 12px;
  }
`;

const ButtonBack = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  padding: 8px 16px;
  background-color: var(--primary-color);
  border-radius: 50px;
  box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
    rgb(145 158 171 / 24%) 0px 20px 40px;

  span {
    font-size: 1.6rem;
    font-weight: 400;
    text-transform: uppercase;
    margin-left: 8px;
  }

  &:hover {
    opacity: 0.85;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  margin-right: 24px;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  min-height: 400px;
`;

const Field = styled.div`
  display: flex;
  margin: 16px 0;
  position: relative;
  width: 100%;
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

const Select = styled.select`
  width: 100%;
  margin-top: 16px;
  padding: 8px;
  border: 1px solid
    ${(props) =>
      props.state === "error"
        ? "#ff4842"
        : props.state === "handling"
        ? "#00ab55"
        : "#d8dde1"};
  border-radius: 4px;
`;

const Option = styled.option`
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--text-color);
`;

const Error = styled.div`
  font-size: 1.6rem;
  color: #ff4842;
  margin: 12px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 16px 8px;
  border: 1px solid
    ${(props) =>
      props.state === "error"
        ? "#ff4842"
        : props.state === "handling"
        ? "#00ab55"
        : "#d8dde1"};
  border-radius: 4px;
`;

const ImageUpload = styled.div`
  flex: 1;
`;

const Preview = styled.div`
  width: 100%;
  height: 450px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;
  