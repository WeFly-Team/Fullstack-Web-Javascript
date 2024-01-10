// interface
export interface optionsProp {
  value: string;
  label: string;
}

export interface IFormInput {
  email: string;
  fullname: string;
  phoneNumber: string;
  day: { label: string; value: string };
  month: { label: string; value: string };
  year: { label: number; value: number };
  password: string;
}
