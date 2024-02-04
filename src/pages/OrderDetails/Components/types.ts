import { Dispatch, HTMLAttributes, SetStateAction, createContext } from 'react';
import {
  DataFlight,
  Passenger,
  detailPassenger,
} from '../../ProfileLayout/types';

export interface OrdererProp extends HTMLAttributes<HTMLDivElement> {
  isShow: () => void;
}

export interface OrderPopProp extends HTMLAttributes<HTMLDivElement> {
  isClose: () => void;
}

export interface PassengerPopProp extends HTMLAttributes<HTMLDivElement> {
  passenger?: Passenger;
  isClose: () => void;
}

export interface PassengerCardProp extends HTMLAttributes<HTMLDivElement> {
  selectPassenger: (passenger: Passenger) => void;
  asOrderer?: boolean;
  passenger: Passenger;
  isShow: () => void;
}

export interface TotalPriceProp extends HTMLAttributes<HTMLDivElement> {
  payNow: () => void;
  disabledContinueOrder: boolean;
}
export interface PaymentDetailProp extends HTMLAttributes<HTMLDivElement> {
  continueOrder: () => void;
}

export type GenderType = 'Mr' | 'Mrs' | 'Miss';
export interface OrderDetailOrderer {
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth: string;
  email: string;
  type: GenderType;
}

export interface Bank {
  id: number;
  img: string;
  alt: string;
  label: string;
}

export interface PaymentMethodProps {
  banks: Bank[];
  selectedBank: Bank;
  setSelectedBank: Dispatch<SetStateAction<Bank>>;
}

export interface PassengerInput {
  firstName: string;
  lastName: string;
  nationality: string;
  day: { label: string; value: string };
  month: { label: string; value: string };
  year: { label: string; value: string };
}
export interface OrdererInput {
  fullName: string;
  phoneNumber?: string;
  email: string;
}

export interface orderDetailContextType {
  dataFlight?: DataFlight;
  detailPassenger?: detailPassenger;
  totalPrice: number;
  orderer?: OrderDetailOrderer;
  saveOrderer: (orderer: OrderDetailOrderer) => void;
  savePassenger: (updatedPassenger: Passenger) => void;
}

export const OrderDetailContext = createContext<orderDetailContextType | null>(
  null
);
