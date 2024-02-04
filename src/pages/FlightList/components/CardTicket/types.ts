import { HTMLAttributes } from 'react';
import { DataFlight, detailPassenger } from '../../../ProfileLayout/types';

export interface CardTicketProps extends HTMLAttributes<HTMLDivElement> {
  data: DataFlight;
  detailPassenger: detailPassenger;
}
