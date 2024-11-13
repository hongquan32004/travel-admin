import {
    publicInstance,
    request
} from "../utils/axios-http/axios-http";
export const login = async (data) => {
    try {
        const {
            email,
            password
        } = data;

        const response = await request(publicInstance, {
            data: {
                email: email,
                password,
            },
            method: "post",
            url: "/api/admin/auth/login"
        });



        const token = response.data.token;
        localStorage.setItem("accessToken", token);

    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const logout = async () => {
    try {
        const respone = await request(publicInstance, {
            method: "get",
            url: "/api/admin/auth/logout"
        })
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}
