import { HTMLAttributes, createContext } from 'react';
import { DataFlight, detailPassenger } from '../../ProfileLayout/types';

export interface OrdererProp extends HTMLAttributes<HTMLDivElement> {
  isShow: () => void;
}

export interface OrderPopProp extends HTMLAttributes<HTMLDivElement> {
  isClose: () => void;
}

export interface PassengerPopProp extends HTMLAttributes<HTMLDivElement> {
  name: string;
  gender?: string;
  isClose: () => void;
}

export interface PassengerCardProp extends HTMLAttributes<HTMLDivElement> {
  orderer?: boolean;
  isShow: () => void;
}

export interface TotalPriceProp extends HTMLAttributes<HTMLDivElement> {
  payNow: () => void;
}
export interface PaymentDetailProp extends HTMLAttributes<HTMLDivElement> {
  continueOrder: () => void;
}

export type GenderType = 'Mr' | 'Mrs' | 'Miss';
export interface OrderDetailOrderer {
  fullName: string;
  phoneNumber?: string;
  email: string;
  type: GenderType;
}
export interface orderDetailContextType {
  dataFlight?: DataFlight;
  detailPassenger?: detailPassenger;
  totalPrice: number;
  orderer?: OrderDetailOrderer;
  saveOrderer: (orderer: OrderDetailOrderer) => void;
}

export const OrderDetailContext = createContext<orderDetailContextType | null>(
  null
);
