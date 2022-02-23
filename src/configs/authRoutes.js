import Introduce from "../pages/introduce/introduce";
import Board from "../pages/board/boardList";
import Faq from "../pages/faq/faq";
import BoardView from "../pages/board/boardView";
import Layout from "../layout/layout";
import BoardForm from "../pages/board/boardForm";
import { Memo } from "../pages/memo/memo";
import { Navigate } from "react-router-dom";
import Home from "../pages/home";

const authRoutes = (session) => [
    {
        path: "/",
        element: (session?.id)?<Layout />:<Navigate to="/login" />,
        children: [
        {
            index: true,
            element : <Introduce/>
        },
        {
            path: "introduce",
            name: "소개",
            icon: "accessibility",
            visible: true,
            element : <Introduce />
        },
        {
            path: "boardForm/",
            name: "게시판등록",
            element : <BoardForm />
        },
        {
            path: "boardForm/:id",
            name: "게시판수정",
            element : <BoardForm />
        },
        {
            path: "board",
            name: "게시판",
            icon: "notes",
            visible: true,
            element : <Board />
        },
        {
            path: "board/:id",
            name: "게시판상세",
            element : <BoardView />
        },
        {
            path: "faq",
            name: "FAQ",
            visible: true,
            icon: "question_answer",
            element : <Faq />
        },
        {
            path: "memo",
            name: "MEMO",
            visible: true,
            icon: "question_answer",
            element : <Memo />
        }
    ]},
    {
        path: '/login',
        element: <Home/>
    }
];

export default authRoutes;