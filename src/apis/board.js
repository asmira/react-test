import axios from "axios"

const getBoards = () => { 
    return axios.get(`http://49.247.24.232:3000/board`)
         .then((res) => res.data)
         .catch((err) => err);
};

export {getBoards};