import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute'

import Dashboard from './screens/Dashboard/Dashboard';
import Login from './screens/Login/Login';
import Loading from './screens/Loading/Loading';
import Home from './screens/Home/Home';
import UserContext, { User } from 'modules/context/userContext';
import { fetchUserInfo } from 'modules/auth';

const App = () => {
  const [user, setUser] = useState({ isLogged: false } as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const userInfo = await fetchUserInfo();
      if (isMounted)
        setUser(userInfo)

      setLoading(false);
    })();

    return () => { isMounted = false }
  }, [])

  if (loading)
    return <Loading />

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
