import { AUTH_INIT, AUTH_LOGIN, AUTH_LOGOUT } from '@/actions/actions';
import { TAuthState } from '@/contexts/AuthContext';

const authReducer = (state: TAuthState, action: any) => {
  const oldState = { ...state };

  switch (action.type) {
    case AUTH_INIT: {
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    }
    case AUTH_LOGIN: {
      return {
        ...oldState,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    }
    case AUTH_LOGOUT: {
      return {
        isInitialized: true,
        isAuthenticated: false,
        accessToken: '',
        user: {
          email: '',
          iat: 0,
        },
      };
    }
    default: {
      return oldState;
    }
  }
};

export default authReducer;
