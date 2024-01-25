import { createContext } from 'react';

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
  departureAirport?: string;
  arrivalAirport?: string;
  airplane?: string;
  departureDate?: Date;
  arrivalDate?: Date;
  departureTime?: string;
  arrivalTime?: string;
  basePrice?: number;
}

export interface TransactionDetail {
  id: number;
  flight: Flight;
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
  status: 'pending' | 'process' | 'sent' | 'finish';
  paymentProof?: string;
}

export interface userTransactionContextType {
  transactions: Transaction[];
}

export const UserTransactionContext =
  createContext<userTransactionContextType | null>(null);
