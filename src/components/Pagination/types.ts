import { HTMLAttributes } from 'react';

export interface pagination extends HTMLAttributes<HTMLDivElement> {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
