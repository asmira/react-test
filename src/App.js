import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import authRoutes from './configs/authRoutes';
import { useRoutes, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
//import anonymousRoutes from './configs/anonymousRoutes';

const AuthRoute = ({session}) => {
  return useRoutes(authRoutes(session));
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const {session} = useSelector((state)=>state.session)
  const navigate = useNavigate();
  useEffect(()=>{
    (!session.id) && navigate("/login",{replace:true});
  },[session,navigate])


  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AuthRoute session={session}/>
      </ThemeProvider>
  )
}

export default App;
