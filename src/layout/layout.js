import { Container, Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import LoaderComponent from "../components/loaderComponent";
import ModalComponent from "../components/modalComponent";
import SnackBarComponent from "../components/snackbarComponent";

//import Footer from "./footer";
import Gnb from "./gnb";
import Lnb from "./lnb";

const Layout = () => {
    return (
        <>
            <Stack>
                <Gnb/>
            </Stack>
            <Stack spacing={1}>
                <Grid container spacing={1}>
                    <Grid item xs={12} xl={2}>
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
            <ModalComponent />
        </>
    )
}

export default Layout;