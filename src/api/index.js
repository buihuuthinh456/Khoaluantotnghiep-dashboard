import axios from 'axios';

const URL = "https://khoaluantotnghiep-ecommerce.herokuapp.com";

export const handleRegisterUser = (payload) =>axios({
    method:"post",
    url:`${URL}/user/register`,
    data:payload,
})

export const handleLoginUser = (payload) =>axios({
    method:"post",
    url:`${URL}/user/login`,
    data:payload,
})

export const createProduct = (payload, token) => axios({
    method:"post",
    url:`${URL}/api/product`,
    data:payload,
    headers: { Authorization: token },
})

export const getCategory = () => axios({
    method: 'get',
    url: `${URL}/api/category`
})

export const getProduct = () => axios({
    method: 'get',
    url: `${URL}/api/product`
})

export const uploadImage = (form, token) => axios({
    method: "post",
    url: `${URL}/api/upload`,
    data: form,
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
  });

export const getSingleProduct = (id, token) => axios({
    method: 'get',
    url: `${URL}/api/product/${id}`,
    headers: {Authorization: token}
}) 