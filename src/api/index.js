import requests from "./request";

export const reqEmailLogin = (email, password) => {
    return requests.post("/account/EmailLogin", {
        email: email,
        password: password,
    });
};

export const regNumberLogin = (mp_num, password) => {
    return requests.post("/sms/login", {
        mp_num: mp_num,
        password: password
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

export const regNumber = (mp_code, mp_num, password) => {
    return requests.post("/sms/reg_mp_num", {
        mp_code: mp_code,
        mp_num: mp_num,
        password: password
    });
};

export const isWechat = (token) => {
    return requests.post("weixin/info", {
        token: token,
    });
};