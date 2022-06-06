import axios from "axios";

const URL = "https://khoaluantotnghiep-ecommerce.herokuapp.com";

export const handleRegisterUser = (payload) =>
  axios({
    method: "post",
    url: `${URL}/user/register`,
    data: payload,
  });

export const handleLoginUser = (payload) =>
  axios({
    method: "post",
    url: `${URL}/user/login`,
    data: payload,
  });

export const createProduct = (payload, token) =>
  axios({
    method: "post",
    url: `${URL}/api/product`,
    data: payload,
    headers: { Authorization: token },
  });

export const updateProduct = (payload, token, id) => {
  return axios({
    method: "put",
    url: `${URL}/api/product/${id}`,
    headers: { Authorization: token },
    data: payload,
  });
};

export const deleteProduct = (id, token) => {
  return axios({
    method: "delete",
    url: `${URL}/api/product/${id}`,
    headers: { Authorization: token },
  });
};

export const getCategory = () =>
  axios({
    method: "get",
    url: `${URL}/api/category`,
  });

export const getAllProduct = () =>
  axios({
    method: "get",
    url: `${URL}/api/product`,
  });

export const uploadImage = (form, token) =>
  axios({
    method: "post",
    url: `${URL}/api/upload`,
    data: form,
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
  });

export const getDetailProduct = (id) =>
  axios({
    method: "get",
    url: `${URL}/api/product/${id}`,
  });

export const searchProductAPI = (regex) => {
  // Object.keys(regex)
  //     .forEach(key => {
  //         return (regex[key] === undefined||regex[key]==false) && delete regex[key]
  //     })
  const searchParam = new URLSearchParams(regex).toString();
  console.log(searchParam);
  return axios({
    method: "get",
    url: `${URL}/api/product?${searchParam}`,
  });
};

export const getUsers = (token) =>
  axios({
    method: "get",
    url: `${URL}/user/`,
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
  });

export const getInfoUser = () => {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  return axios({
    method: "get",
    url: `${URL}/user/infor`,
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
  });
};

export const createCategory = (payload, token) =>
  axios({
    method: "post",
    url: `${URL}/api/category`,
    data: payload,
    headers: { Authorization: token },
  });

export const updateCategory = (payload, token, id) => {
  return axios({
    method: "put",
    url: `${URL}/api/category/${id}`,
    headers: { Authorization: token },
    data: payload,
  });
};

export const deleteCategory = (id, token) => {
  console.log("callAPI", id);
  return axios({
    method: "delete",
    url: `${URL}/api/category/${id}`,
    headers: { Authorization: token },
  });
};

export const getOrders = () =>
  axios({
    method: "get",
    url: `${URL}/api/payment`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("accessToken"),
    },
  });

// Thêm thông tin cho sản phẩm

export const createMoreProductInfo = (id, payload) => {
  const dataPost = {
    moreInfoData: payload,
  };
  return axios({
    method: "post",
    url: `${URL}/api/product/${id}/more`,
    data: dataPost,
    headers: { Authorization: localStorage.getItem("accessToken") },
  });
};

export const updateMoreProductInfo = (id, payload) => {
  const dataPost = {
    moreInfoDataUpdate: payload,
  };
  return axios({
    method: "put",
    url: `${URL}/api/product/${id}/more`,
    data: dataPost,
    headers: { Authorization: localStorage.getItem("accessToken") },
  });
};

export const deleteMoreProductInfo = (id, payload) => {
  return axios({
    method: "delete",
    url: `${URL}/api/product/${id}/more`,
    headers: { Authorization: localStorage.getItem("accessToken") },
    data: {
      moreInfoDataUpdate: payload,
    },
  });
};

// Slider Image

export const createSliderImage = (payload) => {
  return axios({
    method: "post",
    url: `${URL}/api/topic-img`,
    headers: { Authorization: localStorage.getItem("accessToken") },
    data: payload,
  });
};

export const getSliderImage = () => {
  return axios({
    method: "get",
    url: `${URL}/api/topic-img`,
    headers: { Authorization: localStorage.getItem("accessToken") },
  });
};

export const deleteSliderImage = (payload) => {
  return axios({
    method: "delete",
    url: `${URL}/api/topic-img`,
    headers: { Authorization: localStorage.getItem("accessToken") },
    data: payload,
  });
};

// History
export const historyPayment = () =>
  axios({
    method: "get",
    url: `${URL}/api/payment/history`,
    headers: { Authorization: localStorage.getItem("accessToken") },
  });

// get user info by id
export const getUserByID = (id) => {
  return axios({
    method: "get",
    url: `${URL}/user/option/${id}`,
    headers: { Authorization: localStorage.getItem("accessToken") },
  });
};

// delete user 
export const deleteUser = (id) => {
  return axios({
    method: "delete",
    url: `${URL}/user/option/${id}`,
    headers: { Authorization: localStorage.getItem("accessToken") },
  })
}

// get history payment by ID

export const historyPaymentByID = (id) => {
  console.log(`${URL}/api/payment/history/user/${id}`)
  return axios({
    method: "get",
    url: `${URL}/api/payment/history/user/${id}`,
    headers: { Authorization: localStorage.getItem("accessToken") },
  });
};

// send request Password
export const requestResetPassword = (payload) => {
  return axios({
    method: "POST",
    url: `${URL}/user/password`,
    data: payload
  })
}

// Change password 

export const changePassword = (payload) => {
  return axios({
    method:"put",
    url: `${URL}/user/password`,
    headers: { Authorization: localStorage.getItem("accessToken") },
    data: payload
  })
}

// Data analysis
export const getDataAnalysis = (query) => {
  return axios({
    method:"get",
    url: `${URL}/analysis?${query}`,
    headers: { Authorization: localStorage.getItem("accessToken") },
  })
}
