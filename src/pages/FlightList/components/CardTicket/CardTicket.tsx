import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';
import { substractTime, thousandSeparator } from '../../../../utils/functions';
import { CardTicketProps } from './types';

const CardTicket = ({ className, data, detailPassenger }: CardTicketProps) => {
  const navigate = useNavigate();
  const handleChoose = (flightId: number) => {
    navigate(`/order-details/${flightId}`, {
      state: {
        data,
        detailPassenger,
      },
    });
  };

  return (
    <div
      className={`shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-lg p-6 ${className}`}
    >
      {/* top */}
      <div className="flex justify-between items-end">
        <div>
          <div className="mb-3 flex items-center">
            <img src="https://i.ibb.co/bHGk6bM/garuda.png" alt="garuda" />
            <label className="ml-3">{data.flight.airplane.airline.name}</label>
          </div>
          <div className="border rounded-full px-4 py-2 inline">20</div>
        </div>

        <div className="flex gap-1">
          {/* departure */}
          <div>
            <p>{data.flight.departureTime}</p>
            <p className="text-gray-300 text-center">
              {data.flight.departureAirport.iata}
            </p>
          </div>
          {/* simbol */}
          <div className="">
            <p className="text-center">
              {substractTime(
                data.flight.arrivalTime,
                data.flight.departureTime
              )}
            </p>
            <div className="flex items-center">
              <div className="rounded-full border border-black h-2 w-2 bg-white"></div>
              <div className="border w-[80px] border-black"></div>
              <div className="rounded-full border h-2 w-2 bg-black"></div>
            </div>
            <p className="text-center">Direct</p>
          </div>
          {/* arrive */}
          <div>
            <p>{data.flight.arrivalTime}</p>
            <p className="text-gray-300 text-center">
              {data.flight.arrivalAirport.iata}
            </p>
          </div>
        </div>
        <div>
          <p className="text-secondary-warning font-bold">
            Rp {thousandSeparator(Number(data.basePriceAdult))}
            <span className="text-black text-sm font-normal">/pax</span>
          </p>
        </div>
      </div>

      {/* mid */}
      <div className="flex gap-3 mt-10">
        <div className="border border-primary-blue rounded-full px-2 py-1 text-primary-blue">
          Taxi Coupon
        </div>
        <div className="border border-primary-blue rounded-full px-2 py-1 text-primary-blue">
          Free Domestic Hotels Coupon
        </div>
        <div className="border border-primary-blue rounded-full px-2 py-1 text-primary-blue">
          Free Devdan Show Coupon
        </div>
      </div>

      {/* bot */}
      <div className="flex items-center mt-5 justify-between">
        <div className="flex gap-4">
          <p>Flight Details</p>
          <p>Fare & Benefits</p>
          <p>Refund</p>
          <p>Reshedule</p>
          <p>Promos</p>
        </div>
        <Button
          className="w-auto px-8 rounded-full"
          onClick={() => handleChoose(data.id)}
        >
          Choose
        </Button>
      </div>
    </div>
  );
};

export default CardTicket;
