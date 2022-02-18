import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoard, fetchBoard, initView } from "../../reducers/boardReducer";

export default function BoardView() {
    
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {view, loading} = useSelector((state) => state.board);
    
    useEffect(() => {
        dispatch(fetchBoard({id:params.id}));
        return () => {dispatch(initView())}
    },[dispatch, params]);

    const Loading = () => { 
        return (loading) ? <>loading...</> : null;
    }

    return (
        <div>
            <Loading />
            <h3>게시판</h3>
            <Button component={Link} to={`/p/boardForm/${params.id}`}>수정</Button>
            <Button onClick={() => {navigate("/p/board"); dispatch(deleteBoard({id:params.id}))}}>삭제</Button>
            <Button component={Link} to={`/p/board`}>리스트로</Button>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>{view.id}</TableCell>
                    </TableRow>
                    <TableRow>                        
                        <TableCell>제목</TableCell>
                        <TableCell>{view.title}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>내용</TableCell>
                        <TableCell>{view.content}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>등록자</TableCell>
                        <TableCell>{view.writer}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>등록일</TableCell>
                        <TableCell>{view.regdate}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}