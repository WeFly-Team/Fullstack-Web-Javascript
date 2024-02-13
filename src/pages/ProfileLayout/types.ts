import { createContext } from 'react';
import { Airport } from '../Homepage/components/FindTicket/data';
import { GenderType } from '../OrderDetails/Components/types';
import { User } from '../MyAccount/types';

export type PassengerType = 'adult' | 'child' | 'infant';
export interface Passenger {
  id?: number;
  firstName: string;
  lastName?: string;
  nationality?: string;
  dateOfBirth?: string;
  passengerType?: PassengerType;
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
  code: string;
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
  code: string;
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
  airline: Airline;
  departureTime: string;
  arrivalTime: string;
  basePrice?: number;
  scheduleMonday: boolean;
  scheduleTuesday: boolean;
  scheduleWednesday: boolean;
  scheduleThursday: boolean;
  scheduleFriday: boolean;
  scheduleSaturday: boolean;
  scheduleSunday: boolean;
}

export interface FlightClass {
  availableSeat: number;
  basePriceAdult: number;
  basePriceChild: number;
  basePriceInfant: number;
  flightSchedule: flightSchedule;
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
  | 'PENDING'
  | 'PAID'
  | 'EXPIRE';

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
  payment: Payment;
  paymentProof?: string;
}

export interface flightSchedule {
  departureDate?: Date;
  arrivalDate?: Date;
  flight: Flight;
}

export interface DataFlight {
  availableSeat: number;
  basePriceAdult: number;
  basePriceChild: number;
  basePriceInfant: number;
  id: number;
  seatClass: string;
  flightSchedule: flightSchedule;
}

export interface userTransactionContextType {
  transactions: Transaction[];
}

export const UserTransactionContext =
  createContext<userTransactionContextType | null>(null);

export interface userProfileContextType {
  user?: User;
  handleUpdateUser: (user: User) => void;
}

export const UserProfileContextType =
  createContext<userProfileContextType | null>(null);
