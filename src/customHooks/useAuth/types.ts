export interface IUser {
  user_name: string;
  fullname: string;
}

export interface IJwtPayload extends IUser {
  exp: number;
}
