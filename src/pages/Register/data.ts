import { optionsProp } from './types';

// vars
const today = new Date();
export const yearsOption: optionsProp[] = [];
for (let i = today.getFullYear(); i >= 1950; i--) {
  yearsOption.push({ value: i.toString(), label: i.toString() });
}
export const monthsOption: optionsProp[] = [
  { label: 'January', value: 'January' },
  { label: 'February', value: 'February' },
  { label: 'March', value: 'March' },
  { label: 'April', value: 'April' },
  { label: 'May', value: 'May' },
  { label: 'June', value: 'June' },
  { label: 'July', value: 'July' },
  { label: 'August', value: 'August' },
  { label: 'September', value: 'September' },
  { label: 'October', value: 'October' },
  { label: 'November', value: 'November' },
  { label: 'December', value: 'December' },
];
export const datesOption: optionsProp[] = [];
