import requests from "./request";

export const reqEmailLogin = (email, password) => {
    return requests.post("/account/EmailLogin", {
        email: email,
        password: password,
    });
};

export const regEmail = (vcode, email, password) => {
    return requests.post("/account/RegEmail", {
        vcode: vcode,
        email: email,
        password: password
    });
};
