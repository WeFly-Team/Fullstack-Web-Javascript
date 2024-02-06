import { FaCalendar } from 'react-icons/fa6';
import { DetailProps } from './types';
import { getNameOfDay, getNameOfMonth } from '../../../../utils/functions';

const Detail = ({
  departureAirport,
  destinationAirport,
  departureDate,
  totalPassengers,
  classPassenger,
  schedules,
  updateSelectedSchedule,
}: DetailProps) => {
  return (
    <div className="bg-primary-lightViolet rounded-lg p-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="rounded-lg bg-white p-4 w-3/5 mb-4">
        <p className="font-bold text-lg">
          {departureAirport.city} ({departureAirport.iata}) -{' '}
          {destinationAirport.city} ({destinationAirport.iata})
        </p>
        <div className="flex mt-2 justify-between font-semibold text-sm text-neutral-07">
          <p>
            {getNameOfDay(departureDate.getDay())}, {departureDate.getDate()}{' '}
            {getNameOfMonth(departureDate.getMonth())}{' '}
            {departureDate.getFullYear()}
          </p>
          <p>{totalPassengers} Passenger(s)</p>
          <p>{classPassenger}</p>
        </div>
      </div>
      <div className="rounded-lg bg-primary-darkBlue p-4 flex gap-3">
        {schedules.map((schedule, idx) => {
          if (schedule.selected) {
            return (
              <div
                className="bg-primary-lightViolet font-semibold py-3 rounded-lg basis-[22.5%] cursor-pointer"
                key={idx}
              >
                <p className="text-center text-white">
                  {getNameOfDay(schedule.date.getDay())},{' '}
                  {schedule.date.getDate()}{' '}
                  {getNameOfMonth(schedule.date.getMonth())}
                </p>
                <p className="text-center text-white">Rp774,500</p>
              </div>
            );
          }
          return (
            <div
              className="font-semibold py-3 rounded-lg basis-[22.5%] cursor-pointer hover:bg-primary-lightViolet"
              key={idx}
              onClick={() => updateSelectedSchedule(schedule)}
            >
              <p className="text-center text-white">
                {getNameOfDay(schedule.date.getDay())},{' '}
                {schedule.date.getDate()}{' '}
                {getNameOfMonth(schedule.date.getMonth())}
              </p>
              <p className="text-center text-white">Rp774,500</p>
            </div>
          );
        })}
        <div className="grow flex items-center justify-end basis-[10%] cursor-pointer">
          <FaCalendar className="text-white" size={40} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
