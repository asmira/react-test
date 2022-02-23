import { Button, Grid, Link, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../../reducers/boardReducer";
import PagingLayout from "../../components/pagingComponent";
import { openSnackbar } from "../../reducers/snackbarReducer";
import { toggleLoader } from "../../reducers/loaderReducer";

/* 게시판 목록 페이지 */
const Board = () => {

    const {list : {items, paging}, error, loading} = useSelector((state) => state.board);
    const dispatch = useDispatch();
    
    /* 공통 오류/로딩 처리 시작 */
    useEffect(() => {dispatch(toggleLoader(loading))},[dispatch,loading]);
    useEffect(() => {(!!error) && dispatch(openSnackbar({message: error, severity : "error"}))},[dispatch, error]);
    /* 공통 오류/로딩 처리 끝 */

    //페이징처리 시작
    const [boardOffset, setBoardOffset] = useState(paging?.offset || 0)

    useEffect(() => {
        dispatch(fetchBoards({offset:boardOffset, limit:10}))
    },[dispatch, boardOffset]);
    //페이징처리 끝

    return (
        <div>
            <>
                <Grid container>
                    <h2>게시판</h2>
                </Grid>
                <Grid container justifyContent="space-between">
                    총 {paging?.total || 0} 건
                    <Button variant="outlined" component={RouterLink} to="/boardForm">등록</Button>
                </Grid>
                <Grid container>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>no</TableCell>
                                <TableCell>제목</TableCell>
                                <TableCell>등록자</TableCell>
                                <TableCell>등록일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(!!items) ? (items).map((item,idx) => {
                            return <TableRow key={idx}>
                                <TableCell>{paging.total - boardOffset - idx}</TableCell>
                                <TableCell>
                                    <Link component={RouterLink} to={`/board/${item.id}`}>{item.title}</Link>
                                </TableCell>
                                <TableCell>{item.writer}</TableCell>
                                <TableCell>{item.regdate}</TableCell>                                                                        
                            </TableRow>
                            }) : <TableRow><TableCell colSpan={4}>검색된 결과가 없습니다.</TableCell></TableRow>
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow >
                                <TableCell colSpan={4} align="center">
                                    <PagingLayout paging={paging} setter={setBoardOffset} /> 
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Grid>
            </>
        </div>
    );
}

export default React.memo(Board);