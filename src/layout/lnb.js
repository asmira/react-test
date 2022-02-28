import {  Box, Icon, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom"
import authRoutes from "../routes/authRoutes";

const Lnb = () => {
    const loc = useLocation();
    const sidemenus = authRoutes.filter((ch)=>{
        return ch.visible
    });

    const isSelected = (path) => loc.pathname.indexOf(path) > -1;
    
    return (
        <Box>
            <List>
            {(sidemenus).map((sidemenu) => {
            return (sidemenu.path) && 
                <ListItem key={sidemenu.path} disablePadding>
                    <ListItemButton 
                        component={RouterLink} 
                        to={sidemenu.path} 
                        selected={isSelected(sidemenu.path)}
                    >
                        {sidemenu.icon && (<ListItemIcon><Icon>{sidemenu.icon}</Icon></ListItemIcon>)}
                        {sidemenu.name}
                    </ListItemButton>
                </ListItem>
            })}
            </List>
        </Box>
    )
}

export default Lnb;