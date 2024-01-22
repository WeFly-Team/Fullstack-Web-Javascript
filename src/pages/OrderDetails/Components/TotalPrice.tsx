import Button from '../../../components/Button';
import { TotalPriceProp } from './types';

const TotalPrice = ({ payNow, className }: TotalPriceProp) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <label className="text-sm text-neutral-06">Total Price</label>
        <p className="text-primary-blue font-bold text-2xl text-right">
          Rp 1.150.000
        </p>
      </div>
      <Button onClick={payNow} className="w-auto px-16">
        Pay Now
      </Button>
    </div>
  );
};

export default TotalPrice;
