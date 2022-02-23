import { Button, Input, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FormText, FormTextArea } from "../../components/formComponents";
import { fetchBoard, initList, postBoard, putBoard } from "../../reducers/boardReducer";
import { toggleLoader } from "../../reducers/loaderReducer";
import { openSnackbar } from "../../reducers/snackbarReducer";

export default function BoardForm() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { view, error, loading } = useSelector((state) => state.board);
        
    /* 공통 오류/로딩 처리 시작 */
    useEffect(() => {dispatch(toggleLoader(loading))},[dispatch,loading]);
    useEffect(() => {(!!error) && dispatch(openSnackbar({message: error, severity : "error"}))},[dispatch, error]);
    /* 공통 오류/로딩 처리 끝 */

    const mode = (params.id) ? 'UPDATE' : 'CREATE';
    const modeTxt = (mode === 'UPDATE')?'수정':'등록';
    const cancelUrl = (mode === 'UPDATE') ? `/board/${params.id}` : `/board`
   
    const { handleSubmit, control, register, reset } = useForm();
    const onSubmit  = (data) => {
        if (mode === 'UPDATE') {
            dispatch(putBoard({data,navigate:()=>{navigate(cancelUrl,{replace:true})}}));
        } else if(mode === 'CREATE') {
            dispatch(initList());
            dispatch(postBoard({data,navigate:()=>{navigate(cancelUrl,{replace:true})}}));
        }
    }
    
    useEffect(() => {
        (mode === 'UPDATE') && dispatch(fetchBoard({id:params.id}))       
    },[dispatch, params, mode]);
    
    return (
        <div>
            <h3>게시물 {modeTxt}</h3>
            <form name="bform" onSubmit={handleSubmit(onSubmit)} noValidate>
                {(mode === 'UPDATE') && (
                    <Input {...register("id")} type="hidden" name="id" value={view.id||0}/>
                )}
                <Box sx={{justifyContent: 'flex-start'}}>
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
        </div>
    )
}