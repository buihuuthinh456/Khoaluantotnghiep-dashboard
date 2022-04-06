import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from './Button/Button'
import { getCategory, uploadImage, createProduct} from '../api'
import axios from 'axios'
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
  const [selectedFile, setSelectedFile] = useState()
  const [listCategory, setListCategory] = useState([])

  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const form = new FormData();
    form.append('fileUpload', selectedFile)

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
      <Form onSubmit={handleSubmit}>
        <ProductInfo>
          <Field>
            <Label htmlFor='productID'>
              Product ID
              <span style={{color: 'red'}}>*</span>
            </Label>
            <Input 
              type='text'
              value={productID}
              onChange={(e)=>setProductID(e.target.value)}
              id='productID'
              name='productID'
              placeholder='Product ID'
            />
          </Field>
          <Field>
            <Label htmlFor='name'>
              Name
              <span style={{color: 'red'}}>*</span>
            </Label>
            <Input 
              type='text'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id='name'
              name='name'
              placeholder='Product name'
            />
          </Field>
          <Field>
            <Label htmlFor='category'>
              Category
              <span style={{color: 'red'}}>*</span>
            </Label>
            <Select name="category" value={category} onChange={(e)=>setCategory(e.target.value)} id="category">
              {listCategory.length!==0 && listCategory.map(item=>(
                <Option key={item._id} value={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label htmlFor='price'>
              Price
              <span style={{color: 'red'}}>*</span>
            </Label>
            <Input 
              type='number'
              name="price"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              id='price' 
              placeholder="Product Price"
            />
          </Field>
          <Field>
            <Label htmlFor='description'>
              Description
              {/* <span style={{color: 'red'}}>*</span> */}
            </Label>
            <TextArea
              type='text' 
              value={description} 
              onChange={(e)=>setDescription(e.target.value)} 
              id="description" 
              name="description" 
              placeholder="Write description.."
            />
          </Field>
        </ProductInfo>
        <ImageUpload>
            <h1>Image</h1>
            <input type="file" onChange={handleUpload} id="image" name="Image" />
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

const ProductForm = styled.div`
  display: flex;
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