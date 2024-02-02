export interface IUser {
  user_name: string;
  full_name: string;
  date_of_birth: Date;
  phone_number: string;
  authorities: string[];
}

export interface IJwtPayload extends IUser {
  exp: number;
}
