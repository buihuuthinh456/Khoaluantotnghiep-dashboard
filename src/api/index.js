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
