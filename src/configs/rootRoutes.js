//import type { RouteObject } from "react-router-dom";

import Home from "../pages/home";
import Introduce from "../pages/introduce/introduce";
import Main from "../pages/main";
import Board from "../pages/board/board";
import Faq from "../pages/faq/faq";


const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/p",
        element: <Main />,
        children: [
        {
            index: true,
            element : <Introduce />
        },
        {
            path: "introduce",
            name: "소개",
            element : <Introduce />
        },
        {
            path: "board",
            name: "게시판",
            element : <Board />
        },
        {
            path: "faq",
            name: "FAQ",
            element : <Faq />
        }]
    }
];

export default routes;