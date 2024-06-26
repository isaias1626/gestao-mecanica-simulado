import axios from "axios";

const baseUrlApi = process.env.BASE_URL_API;

export const userLoginService = {
    ValidateLogin: (userName: string, password: string) => {
        let user = {
        email: "usuario@teste.com",
        password: "123456",
        };

        if (userName === user.email && password === user.password) {
        let stringSTR = JSON.stringify(user);
        localStorage.setItem("userLogin", stringSTR);
        return user;
        }
    },

    Logout: () => {
        localStorage.removeItem("userLogin");
    },

    VerifyAuth: () => {
        let isUserExist = false;

        let userSTR = localStorage.getItem("userLogin");

        if (userSTR) {
        isUserExist = true;
        }

        return isUserExist;
    },
};