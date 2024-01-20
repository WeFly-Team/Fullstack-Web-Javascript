import { useState } from 'react';
import { VoucherProps } from './types';

const VoucherCard = ({
  vouchertitle,
  vouchercode,
  voucherdescription,
  voucherimageurl,
  className,
}: VoucherProps) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleShowPopUp = async (e: any) => {
    if (e.target.id === 'voucher-popup') {
      setShowPopUp(false);
    }
  };
  return (
    <div
      className={`relative top-36 ml-7 w-[363px] overflow-x-hidden h-[190px] ${className}`}
    >
      <div className="flex flex-row gap-[13px] w-screen relative ">
        <div className="voucher-card ml-1 grid gap-5 w-[302px] h-[186px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border-[20px] border-transparent">
          <div className="voucher-body flex gap-3">
            <img
              src={
                voucherimageurl ||
                'https://i.ibb.co/xgP9hXt/1705387995965-06335942abf22232a4caa74eb239ad59.jpg'
              }
              className="w-16 h-16"
            />
            <div className="voucher-desc grid">
              <p className="text-sm font-semibold text-ellipsis text-left">
                {vouchertitle} ini voucher asik
              </p>
              <p className="text-sm font-light text-ellipsis text-left">
                {voucherdescription} voucher ini dapat di tukarkan ke toko
                terdekat
              </p>
            </div>
          </div>

          <div className="flex voucher-code h-12 rounded-[10px] border-dashed border-black border-[1px] bg-gray-100 items-center px-[15px] justify-between">
            <p className="text-sm font-semibold">{vouchercode}asik2000</p>
            <a href="#" className="text-blue-700">
              Copy
            </a>
          </div>
        </div>

        <button
          className="flex w-8 h-8 rounded-full bg-blue-700 absolute left-[24%] top-[45%] justify-center items-center"
          onClick={() => setShowPopUp(true)}
        >
          <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-5 w-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </button>
      </div>
      {showPopUp && (
        <div
          id="voucher-popup"
          className="voucher-popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleShowPopUp}
        >
          <div className="bg-white p-2 rounded-[4px] w-[902px] max-w-[902px] h-[600px] min-h-[200px] my-6">
            <button
              className="relative left-[96%] top-[2%] rounded-full bg-transparent"
              onClick={() => setShowPopUp(false)}
            >
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-7 w-7 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="content grid grid-cols-3 gap-3">
              <div className="voucher-card grid gap-2 h-[186px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border-[20px] border-transparent">
                <div className="voucher-body flex gap-3">
                  <img
                    src={
                      voucherimageurl ||
                      'https://i.ibb.co/xgP9hXt/1705387995965-06335942abf22232a4caa74eb239ad59.jpg'
                    }
                    className="w-16 h-16"
                  />
                  <div className="voucher-desc grid">
                    <p className="text-sm font-semibold text-warp">
                      {vouchertitle} ini voucher asik
                    </p>
                    <p className="text-sm font-normal text-warp">
                      {voucherdescription} voucher ini dapat di tukarkan ke toko
                      terdekat
                    </p>
                  </div>
                </div>
                <div className="flex voucher-code h-12 rounded-[10px] border-dashed border-black border-[1px] bg-gray-100 items-center px-[15px] justify-between">
                  <p className="text-sm font-semibold">{vouchercode}asik2000</p>
                  <a href="#" className="text-blue-700">
                    Copy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherCard;
