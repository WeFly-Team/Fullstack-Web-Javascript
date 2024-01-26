import { HTMLAttributes } from 'react';
import { Airport } from '../../../Homepage/components/FindTicket/data';
import { Airline } from '../../../ProfileLayout/types';

export interface CardTicketProps extends HTMLAttributes<HTMLDivElement> {
  basePrice: number;
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  airline: Airline;
}
