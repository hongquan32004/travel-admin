import axios from "axios";
const baseUrl =
    import.meta.env.VITE_APP_URL_BE

export const login = async (data) => {
    try {
        const {
            email,
            password
        } = data;


        axios.post(`${baseUrl}/api/admin/auth/login`, {
                email: email,
                password: password
            })
            .then(function (response) {
                const token = response.data.token;
                localStorage.setItem("token", token);
            })
            .catch(function (error) {
                console.log(error);
            });


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
