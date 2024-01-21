import { HTMLAttributes } from 'react';
import { IoAirplaneOutline } from 'react-icons/io5';

const PriceDetail = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`border-neutral-05 border rounded-lg ${className}`}>
      <div className="p-3">
        <div className="flex justify-between">
          <img src="https://i.ibb.co/pznRn82/garuda-title.png" alt="logo" />
          <div className="text-right">
            <h1 className="font-semibold">Garuda Indonesia</h1>
            <p className="text-neutral-06">Economy</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <div>
            <p className="text-neutral-06">Jakarta</p>
            <p className="font-semibold">18.45</p>
          </div>
          <div>
            <div className="border-dashed border border-neutral-06 w-32" />
            <div className="-mt-3">
              <IoAirplaneOutline className=" mx-auto text-primary-blue text-xl bg-white" />
            </div>
            <div className="text-neutral-06 text-sm text-center mt-3">
              Duration 3 hours
            </div>
            <div className="text-neutral-06 text-sm text-center mt-2">
              Sun, 14 Jan 2024
            </div>
          </div>
          <div>
            <p className="text-neutral-06 text-right">Bali</p>
            <p className="font-semibold text-right">18.45</p>
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
