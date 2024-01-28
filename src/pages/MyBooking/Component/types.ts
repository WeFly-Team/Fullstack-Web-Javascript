import { HTMLAttributes } from 'react';
import { Transaction } from '../../ProfileLayout/types';

export interface BookingCardProps extends HTMLAttributes<HTMLDivElement> {
  transaction: Transaction;
}
