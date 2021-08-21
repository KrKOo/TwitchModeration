import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute'

import Dashboard from './screens/Dashboard/Dashboard';
import Login from './screens/Login/Login';
import Loading from './screens/Loading/Loading';
import Home from './screens/Home/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <AuthRoute path="/dashboard">
          <Dashboard />
        </AuthRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/loading">
          <Loading />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
