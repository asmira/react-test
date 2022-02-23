import axios from "axios";

const axiosConfig = {
    withCredentials: true,
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log("error occured! : ", error.response)
    return Promise.reject(error);
});

const aget = (url, data, successFn, failFn) => {
    return axios({
        ...axiosConfig, 
        withCredentials:true,
        url,
        method : "get",
        params: data
    }).then((res) => {
        (!!successFn) && successFn();
        return res.data;
    }).catch((err) => {
        (!!failFn) && failFn();
        return Promise.reject(err);
    });
}

const apost = (url, data, successFn, failFn) => {
    return axios({
        ...axiosConfig, 
        url,
        method : "post",
        data
    }).then((res) => {
        (!!successFn) && successFn();
        return res.data;
    }).catch((err) => {
        (!!failFn) && failFn();
        return Promise.reject(err);
    });
}

const aput = (url, data, successFn, failFn) => {
    return axios({
        ...axiosConfig, 
        url,
        method : "put",
        data
    }).then((res) => {
        console.log(res)
        (!!successFn) && successFn();
        return res.data;
    }).catch((err) => {
        (!!failFn) && failFn();
        return Promise.reject(err);
    });
}

const adelete = (url, data, successFn, failFn) => {
    return axios({
        ...axiosConfig, 
        url,
        method : "delete",
        data
    }).then((res) => {
        (!!successFn) && successFn();
        return res.data;
    }).catch((err) => {
        (!!failFn) && failFn();
        return Promise.reject(err);
    });
}


export {aget, apost, aput, adelete};