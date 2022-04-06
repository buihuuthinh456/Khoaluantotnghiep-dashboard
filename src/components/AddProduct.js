import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from './Button/Button'
import { getCategory, uploadImage, createProduct, getProduct} from '../api'
import { selectLogin } from '../features/login/loginSlice'
import {useSelector} from 'react-redux'

function AddProduct() {
  const loginState = useSelector(selectLogin)
  useEffect(()=>{
    const getData = async() => {
      try {
        const data = await getCategory()
        setListCategory(data.data)
        setCategory(data.data[0].name)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])

  const [name,setName] = useState('')
  const [productID,setProductID] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState(0)
  const [description,setDescription] = useState('')
  const [listCategory, setListCategory] = useState([])
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(()=>{
    if(!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    console.log(objectUrl);
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const form = new FormData();
    // form.append('fileUpload', selectedFile)

    try {
      const res = await uploadImage(form, loginState.accessToken)
      const {data} = res
      const resUpProduct = await createProduct({
        productId: productID,
        name: name,
        description: description,
        price: price,
        category: category,
        images: [data]
      }, loginState.accessToken);

      console.log(resUpProduct)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <Header>
        <h1>Add Product</h1>
      </Header>
      <Formik
        initialValues={{
          name: '',
          productID: '',
          category:'',
          price: '',
          description: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Thông tin này bắt buộc phải có'),
          productID: Yup.string().required('Thông tin này bắt buộc phải có'),
          category: Yup.string().required('Chọn category'),
          price: Yup.string().required('Thông tin này bắt buộc phải có'),
          description: Yup.string().required('Thông tin này bắt buộc phải có'),
        })}
      >
        {(formik)=>(
          <Form onSubmit={handleSubmit}>
        <ProductInfo>
          <Field>
            <Label 
              htmlFor='productID'
              state={formik.errors.productID?"error":formik.touched.productID?"handling":null}
            >
              Product ID
              <span style={{color: 'red'}}>*</span>
            </Label>
            <Input 
              id='productID'
              type='text'
              {...formik.getFieldProps('productID')}
              state = {formik.errors.productID?"error":formik.touched.productID?"handling":null}
              placeholder='Product ID'
            />
          </Field>
          {formik.errors.productID&&formik.touched.productID?(
            <Error>{formik.errors.productID}</Error>
          ):null}
          <Field>
            <Label 
              htmlFor='name'
              state={formik.errors.name?"error":formik.touched.name?"handling":null}
            >
              Name
              <span style={{color: 'red'}}>*</span>
            </Label>
            <Input 
              type='text'
              id='name'
              {...formik.getFieldProps('name')}
              state={formik.errors.name?"error":formik.touched.name?"handling":null}
              placeholder='Product name'
            />
          </Field>
          {formik.errors.name&&formik.touched.name?(
            <Error>{formik.errors.name}</Error>
          ):null}
          <Field>
            <Label 
              htmlFor='category'
              state={formik.errors.category?"error":formik.touched.category?"handling":null}
            >
              Category
              <span style={{color: 'red'}}>*</span>
            </Label>
            <Select 
            name="category" 
            {...formik.getFieldProps('category')}
            state={formik.errors.category?"error":formik.touched.category?"handling":null}
            id="category"
            >
            <Option defaultValue >Choose category</Option>
              {listCategory.length!==0 && listCategory.map(item=>(
                <Option key={item._id} value={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Field>
          {formik.errors.category&&formik.touched.category?(
            <Error>{formik.errors.category}</Error>
          ):null}
          <Field>
            <Label 
              htmlFor='price'
              state={formik.errors.price?"error":formik.touched.price?"handling":null}
            >
              Price
              <span style={{color: 'red'}}>*</span>
            </Label>
            <Input 
              type='number'
              {...formik.getFieldProps('price')}
              id='price' 
              placeholder="Product Price"
              state={formik.errors.price?"error":formik.touched.price?"handling":null}
            />
          </Field>
          {formik.errors.price&&formik.touched.price?(
            <Error>{formik.errors.price}</Error>
          ):null}
          <Field>
            <Label 
              htmlFor='description'
              state={formik.errors.description?"error":formik.touched.description?"handling":null}
            >
              Description
              {/* <span style={{color: 'red'}}>*</span> */}
            </Label>
            <TextArea
              type='text'
              state={formik.errors.description?"error":formik.touched.description?"handling":null}
              {...formik.getFieldProps('description')}
              id="description" 
              placeholder="Write description.."
            />
          </Field>
          {formik.errors.description&&formik.touched.description?(
            <Error>{formik.errors.description}</Error>
          ):null}
        </ProductInfo>
        <ImageUpload>
            <h1>Image</h1>
            <input type="file" onChange={handleUpload} id="image" name="Image" />
            {selectedFile && <Preview src={preview}></Preview>}
            <Button 
            type="submit" 
            fontSize="1.6rem" 
            size="large" 
            width="100%" 
            margin="12px 0 0 0" 
            bgColor="#00ab55"
            value="123"
            // onMouseDown={(event)=>{event.preventDefault()}}
          >Create Product
          </Button>
        </ImageUpload>
      </Form>
        )}
      </Formik>
            
    </Container>
  )
}

export default AddProduct

const Container = styled.div`

`

const Header = styled.div`
  margin-bottom: 24px;
  h1 {
    font-size: 2.4rem;
  }
`

const ProductInfo = styled.div`
  flex: 1;
  margin-right: 24px;
`

const Form = styled.form`
  display: flex;
  width: 100%;
  min-height: 400px;
`

const Field = styled.div`
  display: flex;
  margin:8px 0;
  position:relative;
  width: 100%;
`

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
  margin-bottom: .5rem;
  position: absolute;
  color:${props=>props.state==="error"?"#ff4842":props.state==="handling"?"#00ab55":"black"};
  ::after{
    content: " ";
    background-color: #fff;
    width: 100%;
    height: 13px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
  };
  ::placeholder{
    color:#d8dde1;
  }
`

const Input = styled.input`
  box-shadow: none !important;
  padding: 16px;
  width: 300px;
  border:1px solid ${props=>props.state==="error"?"#ff4842":props.state==="handling"?"#00ab55":"#d8dde1"};
  border-radius: 4px;
  outline: none;
  width: 100%;
`

const Select = styled.select`
  width: 100%;
  margin-top: 16px;
  padding: 8px;
  border:1px solid ${props=>props.state==="error"?"#ff4842":props.state==="handling"?"#00ab55":"#d8dde1"};
  border-radius: 4px;
`

const Option = styled.option`
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--text-color);
`

const Error = styled.div`
  font-size:1.6rem;
  color:#ff4842;
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 16px 8px;
  border:1px solid ${props=>props.state==="error"?"#ff4842":props.state==="handling"?"#00ab55":"#d8dde1"};
  border-radius: 4px;
`

const ImageUpload = styled.div`
  flex: 1;
`

const Preview = styled.image`
  width: 100%;
  height: 50vh;
`