import VoucherCard from './VoucherCard';
import { VoucherPopUpProp } from './types';

const PopUpVoucherList = ({ handleShowPopUp }: VoucherPopUpProp) => {
  return (
    <div
      id="voucher-popup"
      className="voucher-popup z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white p-2 rounded-[4px] w-[902px] max-w-[902px] h-[600px] min-h-[200px] my-6">
        <button
          className="relative left-[96%] top-[2%] rounded-full bg-transparent"
          onClick={handleShowPopUp}
        >
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="h:www.w3.org/2000/svg"
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
          <VoucherCard
            vouchertitle="ini voucher asik"
            voucherdescription="voucher ini dapat di tukarkan ke toko
                terdekat"
            voucherimageurl="https://i.ibb.co/xgP9hXt/1705387995965-06335942abf22232a4caa74eb239ad59.jpg"
            vouchercode="asik2000"
          />
          <VoucherCard
            vouchertitle="ini voucher asik"
            voucherdescription="voucher ini dapat di tukarkan ke toko
                terdekat"
            voucherimageurl="https://i.ibb.co/xgP9hXt/1705387995965-06335942abf22232a4caa74eb239ad59.jpg"
            vouchercode="asik2000"
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpVoucherList;
