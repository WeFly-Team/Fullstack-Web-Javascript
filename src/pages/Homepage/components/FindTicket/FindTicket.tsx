import Select from 'react-select';
import Button from '../../../../components/Button';
import { Calendar, MapPin } from 'react-feather';
import { ForwardedRef, createElement, forwardRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { CustomInputProps } from './types';

const FindTicket = () => {
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>();
  const CustomInput = forwardRef(
    (
      { value, onClick }: CustomInputProps,
      ref: ForwardedRef<HTMLButtonElement>
    ) => (
      <button className="w-full text-white" onClick={onClick} ref={ref}>
        {value ? value : 'Return Date'}
      </button>
    )
  );
  return (
    <>
      <div className="relative z-[1]">
        <div className="bg-[url('https://i.ibb.co/p04HSxH/image-1.png')] bg-cover">
          <div className="bg-black bg-opacity-50">
            <div className="pl-20 pr-20 md:pr-0 pt-48 pb-20">
              <h1 className="text-white font-bold text-5xl">
                WeFly - Limitless Travel Solutions
              </h1>
              <p className="text-white mt-3">
                Discover travel convenience at your fingertips.
              </p>
              <p className="text-white">
                Book tickets and track flights with the WeFly website.
              </p>

              <div className="mt-20">
                <Button>One Way / Round Trip</Button>
                <Button
                  variant="tertiary"
                  className="bg-white text-black md:w-[200px] mt-3 md:mt-0 md:ml-3"
                >
                  Multi City
                </Button>
              </div>
              <div className="w-full md:w-3/4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                  <div className="mb-4 md:mb-0">
                    <label className="block text-left text-white text-sm font-semibold pb-2">
                      From:
                    </label>
                    <div className="flex items-center border-b border-white mr-2 ">
                      <MapPin className="text-white mr-2" />
                      <Select
                        className="w-full"
                        placeholder="Where are you now?"
                        styles={{
                          indicatorSeparator: () => ({ display: 'none' }),
                          indicatorsContainer: () => ({ display: 'none' }),
                          control: () => ({
                            border: 'none',
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-left text-white text-sm font-semibold pb-2">
                      To:
                    </label>
                    <div className="flex items-center border-b border-white">
                      <MapPin className="text-white mr-2" />
                      <Select
                        className="w-full"
                        placeholder="Where are you now?"
                        styles={{
                          indicatorSeparator: () => ({ display: 'none' }),
                          indicatorsContainer: () => ({ display: 'none' }),
                          control: () => ({
                            border: 'none',
                            width: '100%',
                          }),
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* departure */}
                <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                  <div className="mb-4 md:mb-0">
                    <label className="block text-left text-white text-sm font-semibold pb-2">
                      Departure Date:
                    </label>
                    <div className="flex items-center border-b border-white mr-2 pb-2">
                      <Calendar className="text-white mr-2" />
                      <div className=" w-full">
                        <DatePicker
                          minDate={new Date()}
                          className="w-full"
                          selected={departureDate}
                          onChange={(date) => setDepartureDate(date)}
                          customInput={createElement(CustomInput)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-left text-white text-sm font-semibold pb-2">
                      Return Date:
                    </label>
                    <div className="flex items-center border-b border-white pb-2">
                      <Calendar className="text-white mr-2" />
                      <DatePicker
                        minDate={new Date()}
                        className="w-full"
                        selected={returnDate}
                        onChange={(date) => setReturnDate(date)}
                        customInput={createElement(CustomInput)}
                      />
                    </div>
                  </div>
                </div>
                {/* button cari tiket */}
                <div className="mt-6 flex justify-end">
                  <Button className=" rounded-full shadow-xl ">
                    Search Your Flight
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img
          src="https://i.ibb.co/p04HSxH/image-1.png"
          className="object-cover w-full"
        /> */}
      </div>
    </>
  );
};

export default FindTicket;
