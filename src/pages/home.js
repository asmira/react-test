import { Button, Container, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormText, FormPassword } from "../components/formComponents";
import SnackBarComponent from "../components/snackbarComponent";
import { fetchSessionInfo, postLogin } from "../reducers/sessionReducer";

const Home = () => {
    const {session} = useSelector((state)=>state.session)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("???")
        dispatch(fetchSessionInfo());
    },[dispatch]);

    useEffect(()=>{
      (session?.id) && navigate("/",{replace:true});
    },[session,navigate])

    const { handleSubmit, control } = useForm();
    const onSubmit  = (data) => {
        dispatch(postLogin({data,navigate:()=>{navigate("/",{replace:true})}}));
    }

    return (
        <>
            <form name="lform" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Container>
                    <Stack>
                        <FormText 
                            fullWidth
                            name="userid"
                            control={control} 
                            rules={{required:"here1"}} 
                            label="아이디"
                        />
                    </Stack>
                    <Stack>
                        <FormPassword 
                            fullWidth
                            name="passwd"
                            control={control} 
                            rules={{required:"here2"}} 
                            label="비밀번호"
                        />
                    </Stack>
                    <Stack>
                        <Button type="submit" variant="filled">로그인</Button>
                    </Stack>
                </Container>
            </form>
            <SnackBarComponent />
        </>
    )
}

export default Home;