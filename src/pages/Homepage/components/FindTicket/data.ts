import { classProp } from './types';

export const classOptions: classProp[] = [
  { label: 'Economy', value: 'Economy' },
  { label: 'Premium Economy', value: 'PremiumEconomy' },
  { label: 'Business', value: 'Business' },
  { label: 'First Class', value: 'FirstClass' },
];

export interface Airport {
  name: string;
  city: string;
  country: string;
  id: number;
  airportCode: string;
  status?: boolean;
}
