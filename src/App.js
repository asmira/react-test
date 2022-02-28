import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { useRoutes, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toggleLoader } from './reducers/loaderReducer';
import { snackError } from './reducers/snackbarReducer';
import rootRoutes from './routes/rootRoutes';

/**
 * dynamic routing with session
 * @param {session} session sessionStore value 
 * @returns useRoutes
 */
const Route = ({session}) => {
  return useRoutes(rootRoutes(session));
}

/**
 * MUI common theme
 */
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const {session, loading, error} = useSelector((state)=>state.session)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* common loading, error handler */
  useEffect(() => {dispatch(toggleLoader(loading))},[dispatch,loading]);
  useEffect(() => {(error) && dispatch(snackError(error))},[dispatch, error]);

  /* navigate to login when session not found */
  useEffect(()=>{
    (!session.id) && navigate("/login",{replace:true});
  },[session,navigate])

  /* base app rendering */
  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Route session={session}/>
      </ThemeProvider>
  )
}

export default App;