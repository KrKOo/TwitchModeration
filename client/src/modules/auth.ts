import { User } from './context/userContext';

export const fetchUserInfo = async (): Promise<User> => {
  try {
    const res = await fetch('/userinfo');
    if (res.ok) {
      const userInfo = await res.json();

      return {
        isLogged: true,
        username: userInfo.username,
        picture: userInfo.picture,
      };
    }
  } catch (e) {
    console.error(e);
  }

  return { isLogged: false, username: undefined, picture: undefined };
};
