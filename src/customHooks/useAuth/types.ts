export interface IUser {
  email: string;
  fullname: string;
}

export interface IJwtPayload extends IUser {
  exp: number;
}
