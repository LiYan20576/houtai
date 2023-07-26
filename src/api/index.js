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

export const changePassword = (password,password1,password2) => {
    return requests.post("/account/change_password", {
        password: password,
        password1:password1,
        password2:password2
    });
};

export const updateInfo = (nickname,email,mp,photo_data) => {
    return requests.post("/account/update_info", {
        nickname:nickname,
        email:email,
        mp:mp,
        photo_data: photo_data,
    });
};

export const lessons = () => {
    return requests.post("/learn/lessons");
};


export const getIndexData = () => {
    return requests.get("https://lovemedicine.cn/public/uesg/6.13/news/cover-ch.json");
};

export const getDetail = (index) => {
    return requests.get("https://lovemedicine.cn/public/uesg/6.13/news/01/" + index + ".json");
};

// https://weixin.uesg.cn
export const getWxCode = () => {
    return requests.get("https://weixin.uesg.cn/account/getid");
};

// "/acount/avator?unionID=oym-u6Z5ccaI-Z018tm icoxPaa"
export const getInfo = (unionId) => {
    return requests.post("https://weixin.uesg.cn/account/get_info", {
        unionID:unionId
    });
};


