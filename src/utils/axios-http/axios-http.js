/* eslint-disable */

import axios from 'axios';

// Lấy token từ localStorage
const token = localStorage.getItem("token");

if (!token) {
  // Nếu không có token, có thể chuyển hướng về trang login hoặc làm gì đó
  console.log("Token không tồn tại. Vui lòng đăng nhập.");
  // window.location.href = "/login"; // Ví dụ chuyển hướng
}



const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};


// Tạo instance dùng cho các request công khai
const axiosInstance = createAxiosInstance(
  import.meta.env.VITE_APP_URL_BE);



// Phương thức GET
const get = (path) => {
  return axiosInstance.get(`/${path}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        // Lỗi từ server trả về
        console.error('Server Error:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // Lỗi không nhận được phản hồi từ server
        console.error('Request Error:', error.request);
      } else {
        // Lỗi cấu hình
        console.error('Error:', error.message);
      }
    });
};

// Phương thức POST
const post = (path, data) => {
  return axiosInstance.post(`/${path}`, data)
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error); // Xử lý lỗi
    });
};

// Phương thức PATCH
const patch = (path, data) => {
  return axiosInstance.patch(`/${path}`, data)
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error); // Xử lý lỗi
    });
};

const deleteMethod = (path) => {
  return axiosInstance.delete(`/${path}`)
    .then(response => {
      console.log('Response:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error); // Xử lý lỗi
    });
}

// Xuất các phương thức và instance để sử dụng ở nơi khác
export {
  get,
  post,
  patch,
  deleteMethod
};