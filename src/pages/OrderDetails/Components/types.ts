import { HTMLAttributes } from 'react';

export interface OrdererProp extends HTMLAttributes<HTMLDivElement> {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface PassengerCardProp extends HTMLAttributes<HTMLDivElement> {
  orderer?: boolean;
}

export interface TotalPriceProp extends HTMLAttributes<HTMLDivElement> {
  payNow: () => void;
}
export interface PaymentDetailProp extends HTMLAttributes<HTMLDivElement> {
  continueOrder: () => void;
  orderDetail: () => void;
}
