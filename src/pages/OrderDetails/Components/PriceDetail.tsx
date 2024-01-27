import { HTMLAttributes, useContext } from 'react';
import { IoAirplaneOutline } from 'react-icons/io5';
import { OrderDetailContext, orderDetailContextType } from './types';
import { formatLongDate, substractTime } from '../../../utils/functions';

const PriceDetail = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { dataFlight } = useContext(
    OrderDetailContext
  ) as orderDetailContextType;

  return (
    <div className={`border-neutral-05 border rounded-lg ${className}`}>
      <div className="p-3">
        <div className="flex justify-between">
          <img src="https://i.ibb.co/pznRn82/garuda-title.png" alt="logo" />
          <div className="text-right">
            <h1 className="font-semibold">
              {dataFlight && dataFlight.flight.airplane.airline.name}
            </h1>
            <p className="text-neutral-06">
              {dataFlight && dataFlight.seatClass}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="text-neutral-06">
              {dataFlight && dataFlight.flight.departureAirport.city}
            </p>
            <p className="font-semibold">
              {dataFlight && dataFlight.flight.departureTime}
            </p>
          </div>
          <div>
            <div className="border-dashed border border-neutral-06 w-32" />
            <div className="-mt-3">
              <IoAirplaneOutline className=" mx-auto text-primary-blue text-xl bg-white" />
            </div>
            <div className="text-neutral-06 text-sm text-center mt-3">
              Duration{' '}
              {dataFlight &&
                substractTime(
                  dataFlight.flight.arrivalTime,
                  dataFlight.flight.departureTime
                )}
            </div>
            <div className="text-neutral-06 text-sm text-center mt-2">
              {dataFlight &&
                formatLongDate(dataFlight.flight.departureDate!.toString())}
            </div>
          </div>
          <div>
            <p className="text-neutral-06 text-right">
              {dataFlight && dataFlight.flight.arrivalAirport.city}
            </p>
            <p className="font-semibold text-right">
              {dataFlight && dataFlight.flight.arrivalTime}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-06 p-3">
        <p className="text-primary-blue font-bold text-2xl text-right">
          Rp 1.150.000
        </p>
      </div>
    </div>
  );
};

export default PriceDetail;
