<<<<<<< Updated upstream
import { FaCalendar } from 'react-icons/fa6';

const Detail = () => {
  return (
    <div className="bg-primary-blue rounded-lg p-8 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <div className="rounded-lg bg-white p-8 w-3/5 mb-4">
=======
const Detail = () => {
  return (
    <div className="bg-primary-blue rounded-lg p-8">
      <div className="rounded-lg bg-white p-8 w-3/5">
>>>>>>> Stashed changes
        <p>Jakarta (JKTA) - Bali (DPS)</p>
        <div className="flex mt-5 justify-between">
          <p>Sun, 14 Jan 2024</p>
          <p>1 Passenger(s)</p>
          <p>Economy</p>
        </div>
      </div>
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
    </div>
  );
};

export default Detail;
