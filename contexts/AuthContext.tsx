'use client';

import React, { createContext, useEffect, useReducer, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { axiosPublic } from '@/utils/axios';

import { AUTH_INIT, AUTH_LOGIN, AUTH_LOGOUT } from '@/actions/actions';
import reducer from '@/reducers/authReducer';
import { decodeJwt } from '@/utils/helper';

export type TAuthState = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  user: {
    email: string;
    iat: number;
  };
};

export type TRegisterRes = {
  isRegister: boolean;
  message: string;
  token?: string;
};

type TContextType = {
  state: TAuthState;
  login: (email: string, password: string) => Promise<string | undefined>;
  signup: (email: string, password: string) => Promise<TRegisterRes | undefined>;
  logout: () => void;
};

const initialState: TAuthState = {
  isInitialized: false,
  isAuthenticated: false,
  accessToken: '',
  user: {
    email: '',
    iat: 0,
  },
};

export const AuthContext = createContext<TContextType>({
  state: initialState,
  login: async (_email: string, _password: string) => {
    return 'success';
  },
  signup: async (_email: string, _password: string) => {
    return {
      isRegister: false,
      message: '',
      token: '',
    };
  },
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);
  const isMountedRef = useRef(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosPublic.post('login', {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        const user = decodeJwt(token);

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', token);
        }

        dispatch({ type: AUTH_LOGIN, payload: { accessToken: token, user } });
        return 'success';
      } else {
        return 'invalid email or password';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }

    router.push('/');
    dispatch({ type: AUTH_LOGOUT });
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await axiosPublic.post('/registerUser', {
        email,
        password,
      });

      return response.data as TRegisterRes;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const initializingApp = () => {
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

    let user = {
      email: '',
      iat: 0,
    };

    if (accessToken) {
      user = decodeJwt(accessToken as string);
    }

    dispatch({
      type: AUTH_INIT,
      payload: {
        accessToken: accessToken ? accessToken : '',
        user,
        isAuthenticated: accessToken ? true : false,
      },
    });
  };

  useEffect(() => {
    if (isMountedRef.current) return;
    initializingApp();

    isMountedRef.current = true;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
