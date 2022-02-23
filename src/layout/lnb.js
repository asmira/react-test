import {  Icon, List, ListItem, ListItemButton } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom"
import authRoutes from "../configs/authRoutes";

const Lnb = () => {
    const loc = useLocation();
    const {session} = useSelector((state)=>state.session);
    
    const sidemenus = authRoutes({session}).find((r) => {
        return r.path === '/';
    })?.children.filter((ch)=>{
        return ch.visible
    });

    const isSelected = (path) => loc.pathname.indexOf(path) > -1;
    
    return (
        <div>
            <List>
                {(sidemenus).map((sidemenu) => {
                    return (sidemenu.path) && 
                        <ListItem key={sidemenu.path} disablePadding>
                            <ListItemButton 
                                component={RouterLink} 
                                to={sidemenu.path} 
                                selected={isSelected(sidemenu.path)}
                            >
                                {sidemenu.icon && (<Icon style={{fontSize: 15, marginRight:'.8em'}}>{sidemenu.icon}</Icon>)}
                                {sidemenu.name}
                            </ListItemButton>
                        </ListItem>
                })}
            </List>
        </div>
    )
}

export default Lnb;