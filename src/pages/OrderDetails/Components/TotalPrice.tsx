import { useContext } from 'react';
import Button from '../../../components/Button';
import {
  OrderDetailContext,
  TotalPriceProp,
  orderDetailContextType,
} from './types';
import { thousandSeparator } from '../../../utils/functions';

const TotalPrice = ({ payNow, className }: TotalPriceProp) => {
  const { totalPrice } = useContext(
    OrderDetailContext
  ) as orderDetailContextType;
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <label className="text-sm text-neutral-06">Total Price</label>
        <p className="text-primary-blue font-bold text-2xl text-right">
          Rp {thousandSeparator(totalPrice)}
        </p>
      </div>
      <Button onClick={payNow} className="w-auto px-16">
        Pay Now
      </Button>
    </div>
  );
};

export default TotalPrice;
