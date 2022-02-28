import { Box, Button, Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoard, fetchBoard } from "../../reducers/boardReducer";
import { toggleLoader } from "../../reducers/loaderReducer";
import { snackError } from "../../reducers/snackbarReducer";

const BoardView = () => {
    
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {view, loading, error} = useSelector((state) => state.board);
    
    /* common loading, error handler */
    useEffect(() => {dispatch(toggleLoader(loading))},[dispatch,loading]);
    useEffect(() => {(error) && dispatch(snackError(error))},[dispatch, error]);

    /* get board data on loading*/
    useEffect(() => {
        dispatch(fetchBoard({id:params.id}));
    },[dispatch, params]);

    /* delete board and move to list when there`s no error */
    const deleteBoardDispatch = () => {
        dispatch(deleteBoard({
            data:{id:params.id}, 
            errorMsg:"수정중 오류가 발생하였습니다."
        })).then((res)=>{
            (!res.error) && navigate("/board",{replace:true});
        });
    }

    /* render view */
    return (
        <Box>
            <Grid container>
                <h2>게시판</h2>
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'flex-end',}}>
                <Button variant="outlined" component={Link} to={`/boardForm/${params.id}`}>수정</Button>
                <Button variant="outlined" onClick={() => deleteBoardDispatch()}>삭제</Button>
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
        </Box>
    )
}

export default React.memo(BoardView);