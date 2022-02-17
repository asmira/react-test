import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../../reducers/boardSlice";

export default function Board() {
    const dispatch = useDispatch();
    const {value, loading, error} = useSelector((state) => state.board);
    
    useEffect(() => {
        dispatch(fetchBoards())
    },[]);

    return (
        <div>
            <h3>board</h3>
            <div>{value?.items?.length}</div>
        </div>
    )
}