import Select from 'react-select';
import Button from '../../../../components/Button';
import { Calendar, MapPin, X } from 'react-feather';
import {
  ForwardedRef,
  createElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { CustomInputProps, selectAirportProp } from './types';
import {
  FaAngleDown,
  FaBaby,
  FaChild,
  FaMinus,
  FaPerson,
  FaPlus,
} from 'react-icons/fa6';
import { Airport, classOptions } from './data';
import axiosInstance from '../../../../axios/axios';
import { useNavigate } from 'react-router-dom';
const FindTicket = () => {
  // grab airport data
  useEffect(() => {
    const getAirports = async () => {
      try {
        const result = await axiosInstance.get('/airport/list');
        const content = result.data.data.content;
        const airports: selectAirportProp[] = content.map(
          (airport: Airport) => {
            return {
              value: airport.id,
              label: (
                <div className="">
                  <p className="font-semibold">
                    {airport.city}, {airport.country}
                  </p>
                  <p className="font-semibold text-sm text-neutral-06">
                    {airport.airportCode} - {airport.name}
                  </p>
                </div>
              ),
            };
          }
        );
        setListAirport(airports);
      } catch (err) {
        console.error(err);
      }
    };
    getAirports();
  }, []);

  // state
  const [listAirport, setListAirport] = useState<selectAirportProp[]>([]);
  const [departureAirport, setDepartureAirport] = useState<
    selectAirportProp | undefined
  >();
  const [destinationAirport, setDestinationAirport] = useState<
    selectAirportProp | undefined
  >();
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>();
  const [showInputPassenger, setShowInputPassenger] = useState<boolean>(false);
  const [adult, setAdult] = useState<number>(1);
  const [child, setChild] = useState<number>(0);
  const [infant, setInfant] = useState<number>(0);
  const [classPassenger, setClassPassenger] = useState<string>('Economy');
  const [disabled, setDisabled] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(
      `/flight-list?dep-airport=${departureAirport?.value}&des-airport=${destinationAirport?.value}&class=${classPassenger}`
    );
  };

  const addAdult = () => {
    setAdult(adult + 1);
  };
  const minAdult = () => {
    if (adult > 1) {
      setAdult(adult - 1);
    }
  };
  const addChild = () => {
    setChild(child + 1);
  };
  const minChild = () => {
    if (child > 0) {
      setChild(child - 1);
    }
  };
  const addInfant = () => {
    setInfant(infant + 1);
  };
  const minInfant = () => {
    if (infant > 0) {
      setInfant(infant - 1);
    }
  };

  // forwardRef
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

  useEffect(() => {
    if (departureAirport && destinationAirport && departureDate) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [departureAirport, departureDate, destinationAirport]);
  return (
    <section className="relative z-[1]">
      <div className="bg-[url('https://i.ibb.co/p04HSxH/image-1.png')] bg-cover bg-center">
        <div className="bg-black bg-opacity-50">
          <div className="pl-20 pr-20 md:pr-0 pt-28 lg:pt-48 pb-20">
            <h1 className="text-white font-bold text-5xl">
              WeFly - Limitless Travel Solutions
            </h1>
            <p className="text-white mt-3">
              Discover travel convenience at your fingertips.
            </p>
            <p className="text-white">
              Book tickets and track flights with the WeFly website.
            </p>

            <div className="mt-20 lg:flex w-full lg:w-3/4">
              <div className="w-full lg:w-1/2">
                <Button>One Way / Round Trip</Button>
                <Button
                  variant="tertiary"
                  className="bg-white text-black lg:w-[200px] mt-3 lg:mt-0 md:ml-3"
                >
                  Multi City
                </Button>
              </div>
              <div className="mt-3 lg:mt-0 w-full lg:w-1/2 md:flex gap-3">
                <div className="w-[300px] lg:w-3/5">
                  <Button
                    className="bg-transparent border-white border text-sm px-5 py-2.5 text-center inline-flex items-center w-full"
                    onClick={() => setShowInputPassenger(!showInputPassenger)}
                  >
                    {adult} Adult, {child} Child, {infant} Infant &nbsp;{' '}
                    <FaAngleDown
                      className={`ml-auto transition-transform ${
                        showInputPassenger ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                  <div className="relative w-full">
                    <div
                      className={`z-10 bg-white rounded-lg shadow absolute top-2 right-0 left-0 w-full  ${
                        showInputPassenger
                          ? 'max-h-[400px]'
                          : 'max-h-0 overflow-hidden'
                      }`}
                    >
                      <div>
                        <div className="text-gray-500 flex justify-between py-2 px-3 items-center">
                          <h4 className="font-semibold text-lg">
                            No. of Passengers
                          </h4>
                          <X
                            className="cursor-pointer"
                            onClick={() =>
                              setShowInputPassenger(!showInputPassenger)
                            }
                          />
                        </div>
                        {/* adult */}
                        <div className="pr-2 pb-2">
                          <div className="flex items-center">
                            <FaPerson
                              size={25}
                              className="w-1/6 text-primary-blue"
                            />
                            <div className="w-2/6">
                              <p className="font-semibold">Adult</p>
                              <p className="text-xs text-slate-400">
                                (age 12 and over)
                              </p>
                            </div>
                            <div className="flex items-stretch w-1/2 justify-evenly">
                              <button
                                className="bg-blue-50 rounded px-4"
                                onClick={minAdult}
                              >
                                <FaMinus className="text-primary-blue" />
                              </button>
                              <p className=" py-2 px-4 border-b-2 w-12">
                                {adult}
                              </p>
                              <button
                                className="bg-blue-50 rounded px-4"
                                onClick={addAdult}
                              >
                                <FaPlus className="text-primary-blue" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* child */}
                        <div className="pr-2 pb-2 mt-2">
                          <div className="flex items-center">
                            <FaChild
                              size={20}
                              className="w-1/6 text-primary-blue"
                            />
                            <div className="w-2/6">
                              <p className="font-semibold">Child</p>
                              <p className="text-xs text-slate-400">
                                (age 2 - 11)
                              </p>
                            </div>
                            <div className="flex items-stretch w-1/2 justify-evenly">
                              <button
                                className="bg-blue-50 rounded px-4"
                                onClick={minChild}
                              >
                                <FaMinus className="text-primary-blue" />
                              </button>
                              <p className=" py-2 px-4 border-b-2 w-12">
                                {child}
                              </p>
                              <button
                                className="bg-blue-50 rounded px-4"
                                onClick={addChild}
                              >
                                <FaPlus className="text-primary-blue" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* infant */}
                        <div className="pr-2 pb-2 mt-2">
                          <div className="flex items-center">
                            <FaBaby
                              size={20}
                              className="w-1/6 text-primary-blue"
                            />
                            <div className="w-2/6">
                              <p className="font-semibold">Infant</p>
                              <p className="text-xs text-slate-400">
                                (age under 2)
                              </p>
                            </div>
                            <div className="flex items-stretch w-1/2 justify-evenly">
                              <button
                                className="bg-blue-50 rounded px-4"
                                onClick={minInfant}
                              >
                                <FaMinus className="text-primary-blue" />
                              </button>
                              <p className=" py-2 px-4 border-b-2 w-12">
                                {infant}
                              </p>
                              <button
                                className="bg-blue-50 rounded px-4"
                                onClick={addInfant}
                              >
                                <FaPlus className="text-primary-blue" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* button done */}
                        <div className="text-center pb-2 mt-2">
                          <Button
                            className="mx-auto"
                            onClick={() =>
                              setShowInputPassenger(!showInputPassenger)
                            }
                          >
                            Done
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[300px] mt-3 md:mt-0 lg:w-2/5">
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    defaultValue={classOptions[0]}
                    onChange={(choice) => setClassPassenger(choice!.value)}
                    options={classOptions}
                    styles={{
                      dropdownIndicator: (base) => {
                        return {
                          ...base,
                          color: 'white',
                        };
                      },
                      singleValue: (base) => ({ ...base, color: 'white' }),
                      indicatorSeparator: () => ({ display: 'none' }),
                    }}
                    classNames={{
                      control: (state) =>
                        state.isFocused
                          ? '!bg-transparent !shadow !border !border-white !rounded-xl py-1'
                          : '!bg-transparent !shadow !border !border-white !rounded-xl py-1',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/4 ">
              <div className="grid grid-cols-1 md:grid-cols-2 mt-10 items-end">
                <div className="mb-4 md:mb-0">
                  <label className="block text-left text-white text-sm font-semibold pb-2">
                    From:
                  </label>
                  <div className="flex items-center border-b border-white mr-2 ">
                    <MapPin className="text-white mr-2" />
                    <Select
                      options={listAirport}
                      onChange={(val) =>
                        setDepartureAirport(val as selectAirportProp)
                      }
                      className="w-full"
                      placeholder="Where are you now?"
                      styles={{
                        indicatorSeparator: () => ({ display: 'none' }),
                        indicatorsContainer: () => ({ display: 'none' }),
                        control: () => ({
                          border: 'none',
                        }),
                        placeholder: (base) => ({ ...base, color: 'white' }),
                        singleValue: (base) => ({ ...base, color: 'white' }),
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
                      options={listAirport}
                      onChange={(val) =>
                        setDestinationAirport(val as selectAirportProp)
                      }
                      className="w-full"
                      placeholder="Where are your destination?"
                      styles={{
                        indicatorSeparator: () => ({ display: 'none' }),
                        indicatorsContainer: () => ({ display: 'none' }),
                        control: () => ({
                          border: 'none',
                        }),
                        placeholder: (base) => ({ ...base, color: 'white' }),
                        singleValue: (base) => ({ ...base, color: 'white' }),
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
                <Button
                  className=" rounded-full shadow-xl disabled:bg-opacity-30"
                  onClick={handleSearch}
                  disabled={disabled}
                >
                  Search Your Flight
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindTicket;
