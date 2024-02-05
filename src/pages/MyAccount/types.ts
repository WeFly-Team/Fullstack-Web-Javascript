export interface optionsProp {
  value: string;
  label: string;
}

export interface IFormInput {
  fullname: string;
  city: string;
  phoneNumber: string;
  gender: { label: string; value: string };
  day: { label: string; value: string };
  month: { label: string; value: string };
  year: { label: string; value: string };
}

export interface User {
  fullName: string;
  city: string;
  phoneNumber: string;
  gender?: string;
  dateOfBirth: string;
}
