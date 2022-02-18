import { adelete, aget, apost, aput } from "../configs/axiosConfig";

const targetBE = 'http://49.247.24.232:3000';

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
    console.log(id,payload)
    return aput(`${targetBE}/board/${id}`,payload)
}

const deleteBoardApi = (id) => {
    return adelete(`${targetBE}/board/${id}`)
}

export {getBoardsApi, getBoardApi, postBoardApi,putBoardApi, deleteBoardApi};