import { useRoutes } from 'react-router-dom';
import routes from './configs/rootRoutes';

const MyRoute = () => {
  const myRoutes = useRoutes(routes);
  return myRoutes;
}

function App() {
  return (<MyRoute/>);
}

export default App;
