import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  email: string;
  iat: number;
};

export const decodeJwt = (token: string) => {
  const { email, iat } = jwtDecode<JwtPayload>(token);

  return { email, iat };
};
