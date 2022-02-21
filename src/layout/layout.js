import { Container, Fab, Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import LoaderComponent from "../components/loaderComponent";
import SnackBarComponent from "../components/snackbarComponent";

//import Footer from "./footer";
import Gnb from "./gnb";
import Lnb from "./lnb";

const Layout = () => {

    return (
        <>
            <Stack spacing={1}>
                <Grid container spacing={1}>
                    <Grid item xs={12} xl={2}>
                        <Gnb/>
                        <Lnb/>
                    </Grid>
                    <Grid item xs={12} xl={10} style={{"minHeight":"600px"}}>
                        <Container>
                            <Outlet/>
                        </Container>
                    </Grid>
                </Grid>
            </Stack>
            <LoaderComponent/>
            <SnackBarComponent />
        </>
    )
}

export default Layout;