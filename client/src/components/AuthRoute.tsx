import { ReactNode, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext, { UserState } from 'modules/context/userContext';
import Loading from 'screens/Loading/Loading';

interface AuthRouteProps {
  path: string;
  children?: ReactNode;
}

const AuthRoute = (props: AuthRouteProps) => {
  const [user, setUser] = useState<UserState>({ isLogged: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
        const res = await fetch('/userinfo');
        if (res.ok) {
          const userInfo = await res.json();
          if (isMounted) {
            setUser({
              isLogged: true,
              username: userInfo.username,
              picture: userInfo.picture,
            });
          }
        }
        else {
          isMounted && setUser({ isLogged: false })
        }
        isMounted && setLoading(false)
      }
      catch (e) {
        console.error(e)
      }
    }

    fetchUserInfo();

    return () => { isMounted = false }
  }, []);


  if (loading) {
    return <Loading />;
  }

  if (user.isLogged) {
    return <Route path={props.path}>
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    </Route>
  }

  return <Redirect to='/login' />
};

export default AuthRoute;
