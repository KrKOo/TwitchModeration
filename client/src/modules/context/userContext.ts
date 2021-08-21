import React from 'react';

export interface UserState {
  username?: string;
  picture?: string;
  isLogged: boolean;
}

const UserContext = React.createContext({ isLogged: false } as UserState);

export default UserContext;
