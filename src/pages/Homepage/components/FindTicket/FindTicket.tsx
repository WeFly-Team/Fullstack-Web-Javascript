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
      <div className="relative lg:h-screen z-[1]">
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="pl-20 mt-56">
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
                className="bg-white text-black w-[200px] ml-3"
              >
                Multi City
              </Button>
            </div>
            <div className="grid grid-cols-2 w-3/4 mt-10">
              <div>
                <label className="block text-left text-white text-sm font-semibold pb-3">
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
                <label className="block text-left text-white text-sm font-semibold pb-3">
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
            <div className="grid grid-cols-2 w-3/4 mt-10">
              <div>
                <label className="block text-left text-white text-sm font-semibold pb-3">
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
                <label className="block text-left text-white text-sm font-semibold pb-3">
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
            <div className="mt-6 w-3/4 flex justify-end">
              <Button className=" rounded-full shadow-xl ">
                Search Your Flight
              </Button>
            </div>
          </div>
        </div>
        <img
          src="https://i.ibb.co/p04HSxH/image-1.png"
          className="object-cover h-full w-full"
        />
      </div>
    </>
  );
};

export default FindTicket;
