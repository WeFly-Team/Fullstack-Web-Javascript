import { HTMLAttributes } from 'react';

export type filterType = 'lowest' | 'shortest';

export interface PriceFilterProp extends HTMLAttributes<HTMLDivElement> {
  lowestPrice: number;
  shortestPrice: number;
  handleSelectedFilter: (filter: filterType) => void;
  filter?: string;
}
