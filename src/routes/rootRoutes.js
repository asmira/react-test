import Layout from "../layout/layout";
import { Navigate } from "react-router-dom";
import anonymousRoutes from "./anonymousRoutes";
import authRoutes from "./authRoutes";
import UnauthorizedLayout from "../layout/unauthorizedLayout";

const rootRoutes = (session) => [
    {//routes for authorized user
        path: "/",
        element: (session?.id)?<Layout />:<Navigate to="/login" />,
        children: authRoutes
    },
    {
        path: "/login",
        element: <UnauthorizedLayout/>,
        children: anonymousRoutes
    }
];

export default rootRoutes;