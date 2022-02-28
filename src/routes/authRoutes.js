import Introduce from "../pages/introduce/introduce";
import Board from "../pages/board/boardList";
import Faq from "../pages/faq/faq";
import BoardView from "../pages/board/boardView";
import BoardForm from "../pages/board/boardForm";

const authRoutes = [
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
    }
];

export default authRoutes;