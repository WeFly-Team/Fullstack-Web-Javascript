import { createContext } from 'react';
import { Airport } from '../Homepage/components/FindTicket/data';

export interface Passenger {
  id: number;
  firsName: string;
  lastName?: string;
  nationality?: string;
  dateOfBirth?: string;
}

export interface Flight {
  id: number;
  flighNumber?: string;
  departureAirport: Airport;
  arrivalAirport: Airport;
  airplane?: string;
  departureDate?: Date;
  arrivalDate?: Date;
  departureTime?: string;
  arrivalTime?: string;
  basePrice?: number;
}

export interface FlightClass {
  availableSeat: number;
  basePriceAdult: number;
  basePriceChild: number;
  basePriceInfant: number;
  flight: Flight;
}

export interface TransactionDetail {
  id: number;
  flightClass: FlightClass;
  totalPriceAdult: number;
  totalPriceChild: number;
  totalPriceInfant?: number;
}

export interface Orderer {
  createdDate?: Date;
  deletedDate?: Date;
  updatedDate: Date;
  id: number;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
}

export interface Transaction {
  createdDate?: Date;
  deletedDate?: Date;
  updatedDate?: Date;
  id: number;
  passengers: Passenger[];
  transactionDetails: TransactionDetail[];
  orderer: Orderer;
  adultPassenger: number;
  childPassenger?: number;
  infantPassenger?: number;
  totalPrice: number;
  status: 'PENDING' | 'PROCESS' | 'SENT' | 'FINISH';
  paymentProof?: string;
}

export interface userTransactionContextType {
  transactions: Transaction[];
}

export const UserTransactionContext =
  createContext<userTransactionContextType | null>(null);
