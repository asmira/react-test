import { Button, Container, Grid, Input, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FormText, FormTextArea } from "../../components/formComponents";
import { fetchBoard, initList, postBoard, putBoard } from "../../reducers/boardReducer";
import { toggleLoader } from "../../reducers/loaderReducer";
import { snackError } from "../../reducers/snackbarReducer";

export default function BoardForm() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { view, error, loading } = useSelector((state) => state.board);
        
    /* common loading, error handler */
    useEffect(() => {dispatch(toggleLoader(loading))},[dispatch,loading]);
    useEffect(() => {(error) && dispatch(snackError(error))},[dispatch, error]);

    /* form mode variables */
    const mode = (params.id) ? 'UPDATE' : 'CREATE';
    const modeTxt = (mode === 'UPDATE')?'수정':'등록';
    const cancelUrl = (mode === 'UPDATE') ? `/board/${params.id}` : `/board`
    
    /* configs for react-hook-form */
    const { handleSubmit, control, register, reset } = useForm();
    const onSubmit  = (data) => {
        if (mode === 'UPDATE') {
            dispatch(putBoard({data, errorMsg:"수정중 오류가 발생하였습니다."}))
                .then((res)=>{(!res.error) && navigate(cancelUrl,{replace:true})});
        } else if(mode === 'CREATE') {
            dispatch(initList());
            dispatch(postBoard({data}))
                .then((res)=>{(!res.error) && navigate(cancelUrl,{replace:true})});
        }
    }
    
    /* get board data for update */
    useEffect(() => {
        (mode === 'UPDATE') 
            && dispatch(fetchBoard({id:params.id}));
    },[dispatch, params, mode]);
    
    return (
        <Box>
            <Grid container>
                <h2>게시판 {modeTxt}</h2>
            </Grid>
            <form name="bform" onSubmit={handleSubmit(onSubmit)} noValidate>
                {(mode === 'UPDATE') && (
                    <Input {...register("id")} type="hidden" name="id" value={view.id||0}/>
                )}
                <Box sx={{display: 'flex', justifyContent: 'flex-end',}}>
                    <Button variant="outlined" type="submit">{modeTxt}</Button>
                    <Button variant="outlined" onClick={()=>reset()}>리셋</Button>               
                    <Button variant="outlined" component={Link} to={cancelUrl}>취소</Button>
                </Box>
                <Table>
                    <TableBody>
                        <TableRow>                        
                            <TableCell>
                                <FormText 
                                    fullWidth
                                    name="title"
                                    control={control} 
                                    defaultValue={view.title} 
                                    rules={{required:"here1"}} 
                                    label="제목"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormTextArea
                                    fullWidth 
                                    name="content" 
                                    control={control} 
                                    defaultValue={view.content}
                                    rules={{required:"here2"}}
                                    label="내용"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <FormText 
                                    fullWidth
                                    name="writer" 
                                    control={control} 
                                    defaultValue={view.writer} 
                                    label="등록자"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </Box>
    )
}