export interface IUser {
  user_name: string;
  full_name: string;
}

export interface IJwtPayload extends IUser {
  exp: number;
}
