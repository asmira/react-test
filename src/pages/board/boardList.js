import { Button, Grid, Link, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@mui/material";
import { Link as RouterLink, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../../reducers/boardReducer";
import PagingLayout from "../../components/pagingComponent";

/* 게시판 목록 페이지 */
const Board = () => {

    const {list : {items, paging}, error, loading} = useSelector((state) => state.board);

    /* 공통 오류/로딩 처리 시작 */
    const { snackbar, loader } = useOutletContext();
    useEffect(() => loader.setLoading(loading), [loader, loading]);
    useEffect(() => (!!error) && snackbar.open(error, 'danger'), [error, snackbar]);
    /* 공통 오류/로딩 처리 끝 */

    //페이징처리 시작
    const [boardOffset, setBoardOffset] = useState(paging?.offset || 0)

    const dispatch = useDispatch();
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
                <Grid container justifyContent="flex-end">
                    총 {paging?.total || 0} 건
                    <Button variant="outlined" component={RouterLink} to="/p/boardForm">등록</Button>
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
                                    <Link component={RouterLink} to={`/p/board/${item.id}`}>{item.title}</Link>
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