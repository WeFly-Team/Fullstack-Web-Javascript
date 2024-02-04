import { HTMLAttributes } from 'react';

export interface BookingDetailCardProps extends HTMLAttributes<HTMLDivElement> {
  status: 'pending' | 'process' | 'sent' | 'finish';
}
