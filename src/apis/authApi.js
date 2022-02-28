import { aget, apost } from "../configs/axiosConfig";

const targetBE = process.env.REACT_APP_AUTH_URI + "/auth";

const getSessionInfoApi = (payload) => {
    return aget(`${targetBE}/sessionInfo`,payload);
};

const loginApi = (payload) => {
    return apost(`${targetBE}/login`,payload)
}

const logoutApi = () => {
    return apost(`${targetBE}/logout`)
}


export {getSessionInfoApi, loginApi, logoutApi};