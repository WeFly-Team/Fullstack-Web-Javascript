import { Airport } from '../../../Homepage/components/FindTicket/data';

export interface DetailProps {
  departureAirport: Airport;
  destinationAirport: Airport;
  departureDate: Date;
  totalPassengers: number;
  classPassenger: string;
  schedules: Schedule[];
  updateSelectedSchedule: (schedule: Schedule) => void;
}

export interface Schedule {
  date: Date;
  selected: boolean;
}
