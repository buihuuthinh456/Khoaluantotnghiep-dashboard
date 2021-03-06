import React from 'react';
import Button from '../components/Button/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import {handleRegisterUser} from '../api';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


function Register() {
  const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 0;
  `
  const Header = styled.h1`
    margin-bottom:12px;
    position:relative;
    ::after{
      content:"";
      display: block;
      position: absolute;
      top:120%;
      border: 1px solid var(--border-color);
      width: 200%;
      transform: translateX(-25%);
    }
  `
  const Form = styled.form`
    width: 500px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 12px 12px 0;
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
  const Error = styled.div`
    font-size:1.6rem;
    color:#ff4842;
  `

  const Text = styled.p`
    font-size:1.6rem;
    margin-bottom: 8px;
  `

  const handleRegister = async(values,func)=>{
    const {firstName,lastName,email,password} = values;

    const dataPost = {
      name:firstName+lastName,
      email,
      password
    }

    const res = await toast.promise(handleRegisterUser(dataPost),{
      pending: 'Register is handling',
      success: 'Register successfull ????',
      error: 'Register error ????'
    },{
      style:{fontSize:"1.6rem"}
    });
    func()
    console.log(res)
  }

  return (
    <Container>
        <Header>????ng k??</Header>
        <Text>Nh???ng th??ng tin c?? d???u <span style={{color:'red'}}>*</span> l?? nh???ng th??ng tin b???t bu???c ph???i c??</Text>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '',password:'',passwordConfirm:'' }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Th??ng tin n??y b???t bu???c ph???i c??'),
            lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Th??ng tin n??y b???t bu???c ph???i c??'),
            email: Yup.string().email('Invalid email address').required('Th??ng tin n??y b???t bu???c ph???i c??'),
            password:Yup.string().min(8,'Must be at least 8 characters').required('Th??ng tin n??y b???t bu???c ph???i c??'),
            passwordConfirm:Yup.string().oneOf([Yup.ref('password'),null],'Password must match'),
          })}
          onSubmit={(values,{ resetForm }) => {
            handleRegister(values,resetForm)
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Field>
                <Label htmlFor="firstName"
                  state={formik.errors.firstName?"error":formik.touched.firstName?"handling":null}
                >H??? t??n<span style={{color:'red'}}>*</span></Label>
                <Input
                  id="firstName"
                  type="text"
                  {...formik.getFieldProps('firstName')}
                  state={formik.errors.firstName?"error":formik.touched.firstName?"handling":null}
                  
                  placeholder="...H??? t??n"
                  
                />
              </Field>
              {formik.touched.firstName && formik.errors.firstName ? (
                  <Error>{formik.errors.firstName}</Error>
                ) : null}
    
              <Field>
                <Label htmlFor="lastName"
                  state={formik.errors.lastName?"error":formik.touched.lastName?"handling":null}
                >T??n<span style={{color:'red'}}>*</span></Label>
                <Input
                  id="lastName"
                  type="text"
                  {...formik.getFieldProps('lastName')}
                  state={formik.errors.lastName?"error":formik.touched.lastName?"handling":null}
                  
                  placeholder="...T??n"
                />
              </Field>
              {formik.touched.lastName && formik.errors.lastName ? (
                  <Error>{formik.errors.lastName}</Error>
                ) : null}


              <Field>
                <Label 
                  htmlFor="email"
                  state={formik.errors.email?"error":formik.touched.email?"handling":null}
                >?????a ch??? email<span style={{color:'red'}}>*</span></Label>
                <Input 
                  id="email" 
                  type="email" 
                  {...formik.getFieldProps('email')} 
                  state={formik.errors.email?"error":formik.touched.email?"handling":null}
                  
                  placeholder="...Email c???a b???n"
                />
              </Field>
              {formik.touched.email && formik.errors.email ? (
                  <Error>{formik.errors.email}</Error>
                ) : null}
              <Field>
                <Label 
                  htmlFor="password"
                  state={formik.errors.password?"error":formik.touched.password?"handling":null}
                >M???t kh???u<span style={{color:'red'}}>*</span></Label>
                <Input 
                  id="password" 
                  type="password" 
                  {...formik.getFieldProps('password')} 
                  state={formik.errors.password?"error":formik.touched.password?"handling":null}
                  
                  placeholder="...M???t kh???u"
                />
              </Field>
              {formik.touched.password && formik.errors.password ? (
                  <Error>{formik.errors.password}</Error>
                ) : null}

              <Field>
                <Label 
                  htmlFor="passwordConfirm"
                  state={formik.errors.passwordConfirm?"error":formik.touched.passwordConfirm?"handling":null}
                >X??c nh???n m???t kh???u<span style={{color:'red'}}>*</span></Label>
                <Input 
                  id="passwordConfirm" 
                  type="password" 
                  {...formik.getFieldProps('passwordConfirm')} 
                  state={formik.errors.passwordConfirm?"error":formik.touched.passwordConfirm?"handling":null}
                  
                  placeholder="...X??c nh???n m???t kh???u"
                />
              </Field>
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                  <Error>{formik.errors.passwordConfirm}</Error>
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
                  onMouseDown={(event)=>{event.preventDefault()}}
                >????ng k??</Button>
              </Field>
            </Form>
            
          )}
        </Formik>
        <Text>B???n ???? ?????c v?? ?????ng ?? v???i ??i???u kho???n v?? quy ?????nh c???a ch??ng t??i</Text>
        <Text>B???n ???? c?? t??i kho???n? <Link to="/login">????ng nh???p</Link></Text>
    </Container>
  )
}

export default Register