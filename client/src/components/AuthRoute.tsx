import { ReactNode, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from 'modules/context/userContext';

interface AuthRouteProps {
  path: string;
  children?: ReactNode;
}

const AuthRoute = (props: AuthRouteProps) => {
  const { user } = useContext(UserContext);

  if (user.isLogged) {
    return <Route path={props.path}>
      {props.children}
    </Route>
  }

  return <Redirect to='/login' />
};

export default AuthRoute;
