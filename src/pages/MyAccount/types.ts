export interface optionsProp {
  value: string;
  label: string;
}

export interface IFormInput {
    fullname: string;
    cityofresidence:string;
    gender:{ label: string; value: string};
    day: { label: string; value: string };
    month: { label: string; value: string };
    year: { label: number; value: number };
   }
  