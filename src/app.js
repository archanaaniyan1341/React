import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//const history = createBrowserHistory();
import Worklist from './components/worklist/worklist';
//const Home = React.lazy(() => import('./components/home/home'));
//const Layouts = React.lazy(() => import('./components/layouts'));
const App = () => {
    return (
       <Worklist />
       );
};

export default App;
