import {  Button, List, ListItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"
import routes from "../configs/rootRoutes";

const Lnb = () => {
    const sidemenus = routes.find((r) => {
        return r.path === '/p';
    })?.children;

    return (
        <div style={{"borderRight":"1px solid #999", "minHeight":"500px"}}>
            <h3>lnb</h3>
            <List>
                {
                    (sidemenus).map((sidemenu) => {
                        console.log(sidemenu.path)
                        return (sidemenu.path) && <ListItem key={sidemenu.path}><Button variant="outlined" fullWidth={true} component={RouterLink} to={sidemenu.path}>{sidemenu.name}</Button></ListItem>
                    })
                }
            </List>
        </div>
    )
}

export default Lnb;