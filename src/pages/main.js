import { Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../layout/footer";
import Gnb from "../layout/gnb";
import Lnb from "../layout/lnb";

const Main = () => {
    return (<Stack spacing={1}>
        <Gnb/>
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Lnb />
            </Grid>
            <Grid item xs={9}>
                <Outlet />
            </Grid>
        </Grid>
        <Footer />
    </Stack>
    )}

export default Main;