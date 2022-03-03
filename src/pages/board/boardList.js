import { Box, Button, Grid, Link, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../../reducers/boardReducer";
import PagingLayout from "../../components/pagingComponent";
import { snackError, snackSuccess } from "../../reducers/snackbarReducer";
import { toggleLoader } from "../../reducers/loaderReducer";
import { closeChildModal, closeGrandChildModal, closeModal, openChildModal, openGrandChildModal, openModal } from "../../reducers/modalReducer";

const TestGrandChildModal =() => {
    const dispatch = useDispatch();
    const handleClose = () => dispatch(closeGrandChildModal());
    return (
        <>
            <Typography>GRAND CHILD</Typography>
            <Button onClick={handleClose}>close this</Button>
        </>
    )
}

const TestChildModal = () => {
    const dispatch = useDispatch();
    const handleGrandChildOpen = () => dispatch(openGrandChildModal({
        title: "grand child modal",
        content: <TestGrandChildModal/>
    }));
    const handleClose = () => dispatch(closeChildModal());
    return (
        <>
            <Typography>CHILD</Typography>
            <Button onClick={handleGrandChildOpen}>open grandchildModal</Button>
            <Button onClick={handleClose}>close this</Button>
        </>
    )
}

const TestModal = () => {
    const dispatch = useDispatch();
    const handleChildOpen = () => dispatch(openChildModal({
        title: "child modal",
        content: <TestChildModal/>
    }));
    const handleClose = () => dispatch(closeModal());
    return (
        <>
            <Typography>MODAL</Typography>
            <Button onClick={handleChildOpen}>open childModal</Button>
            <Button onClick={handleClose}>close this</Button>
        </>
    )
}

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

    /* open modal test */
    const handleModal = () =>{
        dispatch(openModal({
            type: "",//component, alert, confirm
            title: "title",
            content: <TestModal />,
        }))
    }

    return (
        <Box>
            <Grid container>
                <h2>게시판</h2>
            </Grid>
            <Grid container justifyContent="space-between">
                총 {paging?.total || 0} 건
                <Button variant="outlined" component={RouterLink} to="/boardForm">등록</Button>
                <Button onClick={handleModal}>모달테스트</Button>
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
        </Box>
    );
}

export default React.memo(Board);