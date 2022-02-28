import { Button, Grid, Link, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../../reducers/boardReducer";
import PagingLayout from "../../components/pagingComponent";
import { snackError, snackSuccess } from "../../reducers/snackbarReducer";
import { toggleLoader } from "../../reducers/loaderReducer";

/* 게시판 목록 페이지 */
const Board = () => {

    const dispatch = useDispatch();

    const {list : {items, paging}, error, loading} = useSelector((state) => state.board);

    /* common loading, error handler */
    useEffect(() => {dispatch(toggleLoader(loading))},[dispatch,loading]);
    useEffect(() => {(error) && dispatch(snackError(error))},[dispatch, error]);

    /* paging state */
    const [boardOffset, setBoardOffset] = useState(paging?.offset || 0)

    /* get list on loading and paging */
    useEffect(() => {
        dispatch(fetchBoards({offset:boardOffset, limit:10}))
            .then(() => dispatch(snackSuccess("loaded"))); // promise dispatch test
    },[dispatch, boardOffset]);

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