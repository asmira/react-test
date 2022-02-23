import { adelete, aget, apost, aput } from "../configs/axiosConfig";

const targetBE = process.env.REACT_APP_BACKEND_URI;

const getBoardsApi = (payload) => { 
    return aget(`${targetBE}/board`,payload);
};

const getBoardApi = (id) => {
    return aget(`${targetBE}/board/${id}`)
}

const postBoardApi = (payload) => {
    return apost(`${targetBE}/board`,payload)
}

const putBoardApi = (id, payload) => {
    delete payload.id;
    return aput(`${targetBE}/board/${id}`,payload)
}

const deleteBoardApi = (id) => {
    return adelete(`${targetBE}/board/${id}`)
}

export {getBoardsApi, getBoardApi, postBoardApi,putBoardApi, deleteBoardApi};