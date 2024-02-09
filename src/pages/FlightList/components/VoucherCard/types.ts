import React, { HTMLAttributes } from 'react';

export interface VoucherProps extends HTMLAttributes<HTMLInputElement> {
  vouchertitle: React.ReactNode;
  voucherdescription: React.ReactNode;
  vouchercode: string;
  voucherimageurl: string;
}

export interface VoucherPopUpProp extends HTMLAttributes<HTMLDivElement> {
  handleShowPopUp: () => void;
}
