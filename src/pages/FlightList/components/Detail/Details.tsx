import { FaCalendar } from 'react-icons/fa6';
import { DetailProps } from './types';
import { getNameOfDay, getNameOfMonth } from '../../../../utils/functions';

const Detail = ({
  departureAirport,
  destinationAirport,
  departureDate,
  totalPassengers,
  classPassenger,
}: DetailProps) => {
  return (
    <div className="bg-primary-blue rounded-lg p-8 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="rounded-lg bg-white p-8 w-3/5 mb-4">
        <p>
          {departureAirport.city} ({departureAirport.iata}) -{' '}
          {destinationAirport.city} ({destinationAirport.iata})
        </p>
        <div className="flex mt-5 justify-between">
          <p>
            {getNameOfDay(departureDate.getDay() + 1)},{' '}
            {departureDate.getDate()} {getNameOfMonth(departureDate.getMonth())}{' '}
            {departureDate.getFullYear()}
          </p>
          <p>{totalPassengers} Passenger(s)</p>
          <p>{classPassenger}</p>
        </div>
      </div>
      <div className="rounded-lg bg-white p-8 flex gap-3">
        <div className="bg-primary-blue py-3 rounded-lg basis-[30%]">
          <p className="text-center text-white">Sun, 14 Jan</p>
          <p className="text-center text-white">Rp774,500</p>
        </div>
        <div className=" py-3 rounded-lg basis-[30%]">
          <p className="text-center text-black">Mon, 15 Jan</p>
          <p className="text-center text-black">Rp794,500</p>
        </div>
        <div className=" py-3 rounded-lg basis-[30%]">
          <p className="text-center text-black">Tue, 16 Jan</p>
          <p className="text-center text-black">Rp894,500</p>
        </div>
        <div className="grow flex items-center justify-end basis-[10%]">
          <FaCalendar className="text-primary-blue" size={50} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
