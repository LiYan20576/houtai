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

export const SendCodeMp = (mp_num, vcode) => {
    return requests.post("/sms/SendCodeMp", {
        mp_num: mp_num,
        vcode: vcode
    });
};

export const SendCodeEmail = (email) => {
    return requests.post("/account/SendCodeEmail", {
        email: email
    });
};