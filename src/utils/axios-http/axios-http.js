/* eslint-disable */
import axios from 'axios';

const baseURL = "http://localhost:5000/api/admin";
// const baseURL =
//     import.meta.env.VITE_APP_URL_BE;


const createAxiosInstance = (baseURL, headers = {}) => {
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL,
        headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Accept': 'application/json',
            ...headers,
        },
    });

};

// Instance dùng cho JSON
const axiosInstance = createAxiosInstance(baseURL, {
    'Content-Type': 'application/json'
});


// Instance dùng cho form data
const axiosInstanceForm = createAxiosInstance(baseURL);


// Hàm xử lý lỗi chung
const handleError = (error) => {
    console.error('Error:', error.response || error.message);
    throw error; // Ném lỗi để xử lý ở mức cao hơn nếu cần
};

// Phương thức GET

const get = async (path, params = {}) => {
    try {
        const response = await axiosInstance.get(`/${path}`, {
            params
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
// Phương thức POST
const post = async (path, data) => {
    try {
        const response = await axiosInstance.post(`/${path}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
// Phương thức POST
const postForm = async (path, data) => {
    try {
        const response = await axiosInstanceForm.post(`/${path}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Phương thức PATCH
const patch = async (path, data) => {
    try {
        const response = await axiosInstance.patch(`/${path}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Phương thức PATCH với form data
const patchForm = async (path, data) => {
    try {
        const response = await axiosInstanceForm.patch(`/${path}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Phương thức DELETE
const deleteMethod = async (path, data) => {
    try {
        const response = await axiosInstance.delete(`/${path}`, {
            data
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Xuất các phương thức để sử dụng ở nơi khác
export {
    get,
    post,
    postForm,
    patch,
    patchForm,
    deleteMethod
};