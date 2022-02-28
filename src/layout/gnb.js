import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postLogout } from "../reducers/sessionReducer";

const Gnb = () => {
    const dispatch = useDispatch();
    const {session} = useSelector((state) => state.session)
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" noWrap component="div" sx={{ flexGrow:1 }}><b>React + MUI + ReduxToolkit</b></Typography>
                <Typography noWrap fontSize={13} component="div" sx={{ mr:2 }}>{session.userid}님 환영합니다.</Typography>
                <Button size="small" variant="outlined" onClick={()=>dispatch(postLogout())}>로그아웃</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Gnb;