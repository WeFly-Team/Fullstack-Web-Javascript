import { createContext } from 'react';
import { Airport } from '../Homepage/components/FindTicket/data';
import { GenderType } from '../OrderDetails/Components/types';

export type PassengerType = 'adult' | 'child' | 'infant';
export interface Passenger {
  id?: number;
  firstName: string;
  lastName?: string;
  nationality?: string;
  dateOfBirth?: string;
  type?: PassengerType;
  gender?: GenderType;
}

export interface detailPassenger {
  total: number;
  adult: number;
  child: number;
}

export interface Airline {
  businessMultiplier: number;
  createdDate?: Date;
  deletedDate?: Date;
  updatedDate?: Date;
  discountChild: number;
  discoundInfant: number;
  name: string;
}

export interface Seat {
  createdDate?: Date;
  deletedDate?: Date;
  updatedDate?: Date;
  id: number;
  seatClass: string;
  seatColumn: number;
  seatRow: number;
}

export interface Airplane {
  airline: Airline;
  createdDate?: Date;
  deletedDate?: Date;
  updatedDate?: Date;
  id: number;
  name: string;
  seats: Seat[];
  type: string;
}

export interface Flight {
  id: number;
  flighNumber?: string;
  departureAirport: Airport;
  arrivalAirport: Airport;
  airplane: Airplane;
  departureDate?: Date;
  arrivalDate?: Date;
  departureTime: string;
  arrivalTime: string;
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

export type TransactionStatus =
  | 'CHOOSING_PAYMENT'
  | 'AWAITING_PAYMENT'
  | 'PAID';

export interface Payment {
  id: number;
  issuer?: string;
  token: string;
  settlement_time?: Date;
  expiry_time: Date;
  transaction_status: TransactionStatus;
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
  seatClass: string;
  status: 'PENDING' | 'PROCESS' | 'SENT' | 'FINISH';
  paymentProof?: string;
}

export interface DataFlight {
  availableSeat: number;
  basePriceAdult: number;
  basePriceChild: number;
  basePriceInfant: number;
  id: number;
  seatClass: string;
  flight: Flight;
}

export interface userTransactionContextType {
  transactions: Transaction[];
}

export const UserTransactionContext =
  createContext<userTransactionContextType | null>(null);
