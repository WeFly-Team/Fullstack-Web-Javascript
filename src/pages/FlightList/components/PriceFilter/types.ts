import { HTMLAttributes } from 'react';

export interface PriceFilterProp extends HTMLAttributes<HTMLDivElement> {
  lowestPrice: number;
  shortestPrice: number;
  handleSelectedFilter: (filter: string) => void;
  filter?: string;
}
