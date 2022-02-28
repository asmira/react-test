import { Box, Button, Collapse, Grid, Icon, Typography } from "@mui/material"
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import React, { useState } from "react"
import { styled } from "@mui/system";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

const Pre = styled('pre')({
    border:"1px solid #9e9e9e",
    padding:"5px"
});

const Usage = () => {
    const [openp11, setOpenp11] = useState(false);
    const [openp12, setOpenp12] = useState(false);
    const [openp21, setOpenp21] = useState(false);
    const [openp22, setOpenp22] = useState(false);
    const [openp23, setOpenp23] = useState(false);
    const [openp24, setOpenp24] = useState(false);
    const [openp25, setOpenp25] = useState(false);
    const [openp26, setOpenp26] = useState(false);
    return (
        <Box>
            <Grid container>
                <h2>How to Use</h2>
            </Grid>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5"><Icon>abc</Icon>static 페이지 만들기</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        페이지를 만들기위해서는 다음 폴더/파일들을 생성/수정한다.
                    </Typography>
                    
                    <ol>
                        <li>/pages 하부에 폴더 생성</li>
                        <li>생성한 폴더에 js 파일 생성- [컴포넌트명(camelCase)].js <Button onClick={()=>{setOpenp11(!openp11)}}>소스보기</Button>
                            <Collapse in={openp11} timeout="auto" unmountOnExit>
                                <Pre>{`
import { Box, Grid, Typography } from "@mui/material"
import React from "react"

const *ComponentName(SnakeCase)* = () => {
    return (
        <Box>
            <Grid container>
                <h2>*title*</h2>
            </Grid>
            <Typography>
                hello! world!
            <Typography>
        </Box>
    );
}

export default React.memo(*ComponentName*);
                                `}</Pre>
                            </Collapse>
                        </li>
                        <li>/routes/authRoutes.js 에 해당 컴포넌트 추가 <Button onClick={()=>{setOpenp12(!openp12)}}>소스보기</Button>
                        <Collapse in={openp12} timeout="auto" unmountOnExit>
                            <Pre>{`
const authRoutes = [
    {
        index: true,
        element : <Introduce/>
    },
    ...
    {
        path: *urlPath*,
        name: *title*,
        visible: true,
        icon: *iconname* (https://mui.com/components/material-icons/),
        element: <*ComponentName* />
    },
    {
        path: "board",
        name: "게시판",
        icon: "notes",
        visible: true,
        element : <Board />
    },
    ...
];

export default authRoutes;                            
                            `}</Pre>
                        </Collapse>
                        </li>
                        <li>
                            위 작업을 마치면 로그인 후 lnb에 해당 컴포넌트로 링크가 자동으로 생성되며 접근가능해진다.
                        </li>
                    </ol>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5"><Icon>abc</Icon>dynamic 페이지(view) 만들기</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ol>
                        <li>staticPage만들기와 동일하게 view페이지를 생성한다.</li>
                        <li>/apis 폴더에 DB와 통신할 API를 작성한다. <Button onClick={()=>{setOpenp21(!openp21)}}>소스보기</Button>
                            <Collapse in={openp21} timeout="auto" unmountOnExit>
                                <Pre>{`
[/apis/boardApi.js 참조]
aget => axios.get, apost => axios.post... 
then,catch는 공통처리이므로 단순 호출만 처리하면됨. (/config/axiosConfig.js에 공통 처리)
                                `}</Pre>
                            </Collapse>
                        </li>
                        <li>/reducer 폴더에 createAsyncThunk(async action), createSlice를 작성하여 store,action,reducer등 redux소스를 생성한다. <Button onClick={()=>{setOpenp22(!openp22)}}>소스보기</Button>
                        <Collapse in={openp22} timeout="auto" unmountOnExit>
                                <Pre>{`
/*** reducer 설명 ***/
createAsyncThunk => thunk를 이용한 비동기 액션
createSlice => create action. createReducer등 boilerplate code들을 object로 일괄처리해주는 toolkit의 핵심
아래 소스를 참조하여 copy&paste후 자신에게 맞게 수정하여 사용.(이 부분 작성이 끝나면 사실상 제일 어려운 부분 넘어간 것!)

// 단순 호출시(payload 앞에 async를 넣어야 dispatch 때 then으로 받을 수 있음. 반드시 넣어주는것을 추천.)
export const someAction = createAsyncThunk("액션명", async (payload) => {
    return someApi(payload);
});

// 에러 메시지 처리 필요시
export const someComplexAction = createAsyncThunk('액션명', async (payload, {rejectWithValue}) => {
    const {data, errorMsg} = payload;
    return !!data 
        && postBoardApi(data)
          .catch((err) => rejectWithValue(errorMsg || err.response.data));
});

const initialState = {
    ...
}

export const 슬라이스 = createSlice({
    name : 'store에 저장될 이름',
    initialState,
    reducers : {
        //thunk를 통할 필요없는 동기식 reducer
        action1 : (state,action) => {
            ...//reduce some
        }
    },
    extraReducers : {
        //createAction 또는 createAsyncThunk으로 외부에서 생성한 리듀서
        [someAction.pending] : (state,_) => {
            ...//reduce for loading. 생략가능
        },
        [someAction.fulfilled] : (state,_) => {
            ...//처리가 성공했을경우 reduce. 작성해야 state에 정확한 타이밍에 값이 박힘..
        },
        [someAction.pending] : (state,_) => {
            ...//reduce for loading. 에러 메시지 처리필요시 작성. 아니면 생략
        },
    }
});
export const {action1, ...} = 슬라이스.actions; //slice내부에서 생성한 액션은 별도로 export 해준다
export default 슬라이스.reducer; //리듀서를 default로 export
                                `}</Pre>
                            </Collapse>
                        </li>
                        <li>rootReducer에 해당 slice를 연결하여 store를 추가한다.<Button onClick={()=>{setOpenp23(!openp23)}}>소스보기</Button>
                        <Collapse in={openp23} timeout="auto" unmountOnExit>
                                <Pre>{`
/* reducer는 자동으로 slice에서 name으로 정한것 + Reducer 이름으로 export된다 */
import *slice name*Reducer from './리듀서 파일 경로'
... 
const reducer = {
    ...
    *slice name* : *slice name*Reducer,
    ...
}

export default reducer;
                                `}</Pre>
                            </Collapse>
                        </li>
                        <li> 1.에서 만든 viewPage에 useSelector를 선언하여 store데이터를 받을 준비한다.<Button onClick={()=>{setOpenp24(!openp24)}}>소스보기</Button>
                            <Collapse in={openp24} timeout="auto" unmountOnExit>
                                <Pre>{`
const { ... (store에서 꺼낼 값들) } = useSelector((state) => state.*slice name*);
                                `}</Pre>
                            </Collapse>
                        </li>
                        <li>viewPage에 공통 loading,error처리 useEffect를 가져온다.<Button onClick={()=>{setOpenp25(!openp25)}}>소스보기</Button>
                        <Collapse in={openp25} timeout="auto" unmountOnExit>
                                <Pre>{`
const dispatch = useDispatch();
/* common loading, error handler */
useEffect(() => {dispatch(toggleLoader(loading))},[dispatch,loading]);
useEffect(() => {(error) && dispatch(snackError(error))},[dispatch, error]);
                                `}</Pre>
                            </Collapse>
                        </li>
                        <li>{`useEffect{()=>dispatch(asyncThunkName)}`}를 이용하여 store데이터를 받아온다.<Button onClick={()=>{setOpenp26(!openp26)}}>소스보기</Button>
                        <Collapse in={openp26} timeout="auto" unmountOnExit>
                                <Pre>{`
/* createAsyncThunk 호출!! */
useEffect(() => {
    dispatch(someAction({ ... (payload에 담길 값) }))
        .then(() => dispatch(snackSuccess("loaded"))); // 성공시 처리가 별도로 필요하면 추가! 아니면 생략가능
},[dispatch]);
                                `}</Pre>
                            </Collapse>                        
                        </li>
                        <li>view페이지에 useSelector로 받아온 데이터를 매핑하여 정상적으로 뜨는지 확인한다.</li>
                    </ol>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default React.memo(Usage);