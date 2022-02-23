import { Box, Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoard, fetchBoard, initView } from "../../reducers/boardReducer";
import { toggleLoader } from "../../reducers/loaderReducer";
import { openSnackbar } from "../../reducers/snackbarReducer";

export default function BoardView() {
    
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {view, loading, error} = useSelector((state) => state.board);
    
    /* 공통 오류/로딩 처리 시작 */
    useEffect(() => {dispatch(toggleLoader(loading))},[dispatch,loading]);
    useEffect(() => {(!!error) && dispatch(openSnackbar({message: error, severity : "error"}))},[dispatch, error]);
    /* 공통 오류/로딩 처리 끝 */

    useEffect(() => {
        dispatch(fetchBoard({id:params.id}));
        return () => {dispatch(initView())}
    },[dispatch, params]);

    return (
        <div>
            <h3>게시판</h3>
            <Box sx={{justifyContent: 'flex-start'}}>
                <Button variant="outlined" component={Link} to={`/boardForm/${params.id}`}>수정</Button>
                <Button variant="outlined" onClick={
                () => {dispatch(deleteBoard({
                    data:{id:params.id},
                    navigate:()=>{navigate("/board",{replace:true})},
                }))}}>삭제</Button>
                <Button variant="outlined" component={Link} to={`/board`}>목록</Button>
            </Box>
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