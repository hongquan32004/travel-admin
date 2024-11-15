/* eslint-disable */

import axios from 'axios';



const createAxiosInstance = (baseURL) => {

    const token = localStorage.getItem("token");
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
            console.error('Error:', error);
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