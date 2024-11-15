import axios from "axios";
const baseUrl = import.meta.env.VITE_APP_URL_BE;

export const login = async (data) => {
    try {
        const { email, password } = data;

        // Gọi API với axios và đợi phản hồi
        const response = await axios.post(`${baseUrl}/auth/login`, {
            email,
            password,
        });

        // Lưu token vào localStorage nếu đăng nhập thành công
        const token = response.data.token;
        if (token) {
            localStorage.setItem("token", token);
        }

        return response.data; // Trả về dữ liệu nhận được từ API (thường có message và token)
    } catch (error) {
        console.error(error);
        throw new Error('Đã có lỗi khi đăng nhập. Vui lòng thử lại!');
    }
};
export const logout = async () => {
    try {
        await axios.get(`${baseUrl}/auth/logout`);
        localStorage.removeItem("token");  // Xóa token khỏi localStorage
        console.log('Đăng xuất thành công');
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
        throw new Error('Đã có lỗi khi đăng xuất. Vui lòng thử lại!');
    }
};
