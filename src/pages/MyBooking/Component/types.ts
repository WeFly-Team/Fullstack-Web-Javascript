import { HTMLAttributes } from 'react';

export interface BookingCardProps extends HTMLAttributes<HTMLDivElement> {
  status: 'pending' | 'process' | 'sent' | 'finish';
}
