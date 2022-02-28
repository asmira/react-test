import Layout from "../layout/layout";
import { Navigate } from "react-router-dom";
import anonymousRoutes from "./anonymousRoutes";
import authRoutes from "./authRoutes";

const rootRoutes = (session) => [
    {//routes for authorized user
        path: "/",
        element: (session?.id)?<Layout />:<Navigate to="/login" />,
        children: authRoutes
    },
    ...anonymousRoutes
];

export default rootRoutes;