import { Container, Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import LoaderComponent from "../components/loaderComponent";
import SnackBarComponent from "../components/snackbarComponent";

//import Footer from "./footer";
import Gnb from "./gnb";

const UnauthorizedLayout = () => {
    return (
        <>
            <Stack>
                <Gnb/>
            </Stack>
            <Stack spacing={1}>
                <Container>
                    <Outlet/>
                </Container>
            </Stack>
            <LoaderComponent/>
            <SnackBarComponent />
        </>
    )
}

export default UnauthorizedLayout;