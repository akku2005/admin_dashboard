import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import axios from 'axios';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
  [HANDLERS.RESET_PASSWORD]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const signIn = async (email, password) => {
    if (email == null || password == null) {
      throw new Error('Please check your email and password');
    }

    try {
      const response = await axios.post('http://localhost:8080/v1/auth/login', {
        email: email,
        password: password,
      });

      const user = response.data.user;

      window.localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('access_token', response.data.tokens.access.token, {
        expires: new Date(response.data.tokens.access.expires),
      });
      Cookies.set('refresh_token', response.data.tokens.refresh.token, {
        expires: new Date(response.data.tokens.refresh.expires),
      });
      window.sessionStorage.setItem('authenticated', 'true');

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw new Error('Sign-in failed');
    }
  };

  const signUp = async (email, name, password) => {
    if (email == null || password == null) {
      throw new Error('Please check your email and password');
    }

    try {
      const response = await axios.post('http://localhost:8080/v1/auth/register', {
        email: email,
        name: name,
        password: password,
      });

      const user = response.data.user;

      window.localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('access_token', response.data.tokens.access.token, {
        expires: new Date(response.data.tokens.access.expires),
      });
      Cookies.set('refresh_token', response.data.tokens.refresh.token, {
        expires: new Date(response.data.tokens.refresh.expires),
      });
      window.sessionStorage.setItem('authenticated', 'true');

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } catch (error) {
      console.error('Error during sign-up:', error);
      throw new Error('Sign-up failed');
    }
  };

  const signOut = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    window.localStorage.removeItem('user');
    window.sessionStorage.removeItem('authenticated');
    clearBrowserData();

    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const resetPassword = async (email) => {
    try {
      const response = await axios.post('http://localhost:8080/v1/auth/reset-password', {
        email: email,
      });

      const user = response.data.user;

      window.localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('access_token', response.data.tokens.access.token, {
        expires: new Date(response.data.tokens.access.expires),
      });
      Cookies.set('refresh_token', response.data.tokens.refresh.token, {
        expires: new Date(response.data.tokens.refresh.expires),
      });
      window.sessionStorage.setItem('authenticated', 'true');

      dispatch({
        type: HANDLERS.RESET_PASSWORD,
        payload: user,
      });
    } catch (error) {
      console.error('Error during password reset:', error);
      throw new Error('Password reset failed');
    }
  };

  const clearBrowserData = () => {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const cookieParts = cookie.split('=');
      const cookieName = cookieParts[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    window.localStorage.clear();
    window.sessionStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
