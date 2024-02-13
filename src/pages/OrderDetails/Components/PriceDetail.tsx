import { HTMLAttributes, useContext } from 'react';
import { IoAirplaneOutline } from 'react-icons/io5';
import { OrderDetailContext, orderDetailContextType } from './types';
import {
  formatLongDate,
  substractTime,
  thousandSeparator,
} from '../../../utils/functions';

const PriceDetail = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { dataFlight, detailPassenger, totalPrice } = useContext(
    OrderDetailContext
  ) as orderDetailContextType;

  return (
    <div className={`border-neutral-05 border rounded-lg ${className}`}>
      <div className="p-3">
        <div className="flex justify-between">
          <img src="https://i.ibb.co/pznRn82/garuda-title.png" alt="logo" />
          <div className="text-right">
            <h1 className="font-semibold">
              {dataFlight &&
                dataFlight.flightSchedule.flight.airplane.airline.name}
            </h1>
            <p className="text-neutral-06">
              {dataFlight && dataFlight.seatClass}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 md:gap-8">
          <div>
            <p className="text-neutral-06">
              {dataFlight &&
                dataFlight.flightSchedule.flight.departureAirport.city}
            </p>
            <p className="font-semibold">
              {dataFlight && dataFlight.flightSchedule.flight.departureTime}
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
                  dataFlight.flightSchedule.flight.arrivalTime,
                  dataFlight.flightSchedule.flight.departureTime
                )}
            </div>
            <div className="text-neutral-06 text-sm text-center mt-2">
              {dataFlight &&
                formatLongDate(
                  dataFlight.flightSchedule.departureDate!.toString()
                )}
            </div>
          </div>
          <div>
            <p className="text-neutral-06 text-right">
              {dataFlight &&
                dataFlight.flightSchedule.flight.arrivalAirport.city}
            </p>
            <p className="font-semibold text-right">
              {dataFlight && dataFlight.flightSchedule.flight.arrivalTime}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-06 p-3 flex items-center justify-between">
        <div>
          <p className="font-bold text-lg">
            {dataFlight &&
              detailPassenger &&
              `${thousandSeparator(dataFlight.basePriceAdult)} x ${
                detailPassenger.adult
              } (Adult)`}
          </p>
          <p className="font-bold text-lg">
            {dataFlight &&
              detailPassenger &&
              detailPassenger.child > 0 &&
              `${thousandSeparator(dataFlight.basePriceChild)} x ${
                detailPassenger.child
              } (Child)`}
          </p>
        </div>

        <p className="text-primary-blue font-bold text-2xl text-right">
          Rp {thousandSeparator(totalPrice)}
        </p>
      </div>
    </div>
  );
};

export default PriceDetail;
