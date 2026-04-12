export interface ITokenPayload {
  userId: string;
  email: string;
  role: string;
  isSuperAdmin: boolean;
}

export interface IAuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isSuperAdmin?: boolean;
  };
  token: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
