import { publicInstance, request } from "../utils/axios-http/axios-http";
export const login = async (data) => {
    try {
        const { email, password } = data;

        const response = await request(publicInstance, {
            data: {
                email: email,
                password,
            },
            method: "post",
            url: "/api/admin/auth/login"
        });



        const { accessToken, id } = response;
        localStorage.setItem("accessToken", accessToken);
        //có getMe sẽ lưu vào redux user
        localStorage.setItem("userId", id);
        //getMe();
    } catch (error) {
        console.log(error);
        throw error;
    }
};