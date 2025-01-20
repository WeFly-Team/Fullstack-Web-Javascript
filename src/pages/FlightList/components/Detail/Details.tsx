import {
  getNameOfDay,
  getNameOfMonth,
  thousandSeparator,
} from '../../../../utils/functions';
import { DetailProps } from './types';

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
      <div className="rounded-lg bg-white p-4 w-full md:w-3/5 mb-4">
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
        <div className="w-full flex gap-3 justify-stretch overflow-x-scroll no-scrollbar">
          {schedules.map((schedule, idx) => {
            if (schedule.selected) {
              return (
                <div
                  className="bg-primary-lightViolet font-semibold py-3 rounded-lg min-w-[110px] basis-1/4 cursor-pointer"
                  key={idx}
                >
                  <p className="text-center text-white">
                    {getNameOfDay(schedule.date.getDay())},{' '}
                    {schedule.date.getDate()}{' '}
                    {getNameOfMonth(schedule.date.getMonth())}
                  </p>
                  <p className="text-center text-white">
                    Rp{thousandSeparator(schedule.lowestPrice)}
                  </p>
                </div>
              );
            }
            return (
              <div
                className="font-semibold py-3 rounded-lg min-w-[110px] basis-1/4 cursor-pointer hover:bg-primary-lightViolet"
                key={idx}
                onClick={() => updateSelectedSchedule(schedule)}
              >
                <p className="text-center text-white">
                  {getNameOfDay(schedule.date.getDay())},{' '}
                  {schedule.date.getDate()}{' '}
                  {getNameOfMonth(schedule.date.getMonth())}
                </p>
                <p className="text-center text-white">
                  Rp{thousandSeparator(schedule.lowestPrice)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
