import { HTMLAttributes } from 'react';

export interface OrdererProp extends HTMLAttributes<HTMLDivElement> {
  name: string;
  phoneNumber: string;
  email: string;
}
export interface OrderPopProp extends HTMLAttributes<HTMLDivElement> {
  name: string;
  phoneNumber: string;
  email: string;

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
