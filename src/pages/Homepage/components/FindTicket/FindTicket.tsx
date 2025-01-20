import { AxiosError } from 'axios';
import {
  ForwardedRef,
  createElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, MapPin, X } from 'react-feather';
import {
  FaAngleDown,
  // FaBaby,
  FaChild,
  FaMinus,
  FaPerson,
  FaPlus,
} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Select, { StylesConfig, createFilter } from 'react-select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axiosInstance from '../../../../axios/axios';
import Button from '../../../../components/Button';
import { triggerToast } from '../../../../utils/functions';
import { Airport, classOptions } from './data';
import { CustomInputProps, OptionType, selectAirportProp } from './types';
const FindTicket = () => {
  // toast

  // grab airport data
  useEffect(() => {
    const getAirports = async () => {
      try {
        const result = await axiosInstance.get('/airport/list?size=50');
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
                    {airport.iata} - {airport.name}
                  </p>
                </div>
              ),
            };
          }
        );
        setListAirport(airports);
      } catch (err) {
        if (err instanceof AxiosError) {
          triggerToast('error', err.message);
        } else if (err instanceof Error) {
          triggerToast('error', err.message);
        }
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
  const [totalPassengers, setTotalPassengers] = useState<number>(0);
  // const [infant, setInfant] = useState<number>(0);
  const [classPassenger, setClassPassenger] = useState<string>('Economy');
  const [disabled, setDisabled] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSearch = () => {
    const queryString = `dep-airport=${departureAirport?.value}&des-airport=${destinationAirport?.value}&dep-date=${departureDate}&class=${classPassenger}&adult=${adult}&child=${child}&total-passengers=${totalPassengers}`;
    navigate(`/flight-list?${queryString}`);
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
  // const addInfant = () => {
  //   setInfant(infant + 1);
  // };
  // const minInfant = () => {
  //   if (infant > 0) {
  //     setInfant(infant - 1);
  //   }
  // };

  const filterConfig = createFilter({
    matchFrom: 'any',
    //@ts-expect-error
    stringify: (option: OptionType<selectAirportProp>) => {
      // Convert JSX to string for searching
      const textContent = option.label.props.children
        .map((child: any) =>
          typeof child === 'string' ? child : child.props.children
        )
        .join('');

      return `${textContent}`;
    },
  });

  const styleConfig: StylesConfig = {
    indicatorSeparator: () => ({ display: 'none' }),
    indicatorsContainer: () => ({ display: 'none' }),
    control: () => ({
      border: 'none',
    }),
    input: (base) => ({
      ...base,
      color: 'white',
    }),
    placeholder: (base) => ({ ...base, color: 'white' }),
    singleValue: (base) => ({ ...base, color: 'white' }),
  };

  useEffect(() => {}, [adult, child]);
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
    setTotalPassengers(adult + child);
  }, [adult, child]);

  useEffect(() => {
    if (departureAirport && destinationAirport && departureDate) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [departureAirport, departureDate, destinationAirport]);
  return (
    <section className="relative z-[1]">
      <div className="bg-[url('https://res.cloudinary.com/dwy823csd/image/upload/v1736875948/hero.png')] bg-cover bg-center">
        <div className="bg-black bg-opacity-50">
          <div className="px-10 sm:px-20 pt-28 2xl:pt-48 pb-20">
            <h1 className="text-white font-bold text-5xl">
              WeFly - Limitless Travel Solutions
            </h1>
            <p className="text-white mt-3">
              Discover travel convenience at your fingertips.
            </p>
            <p className="text-white">
              Book tickets and track flights with the WeFly website.
            </p>

            {/* <div className="mt-20 2xl:flex w-full 2xl:w-3/4"></div> */}
            <div className="w-full">
              <p className="mt-10">
                <label className="block text-left text-secondary-star text-lg font-semibold pb-2">
                  *Filghts only available for{' '}
                  <span className="font-bold">
                    Soekarno Hatta International Airport
                  </span>{' '}
                  To <span className="font-bold">Ngurah Rai Airport</span>
                </label>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2  items-end">
                <div className="mb-4 md:mb-0">
                  <label className="block text-left text-white text-sm font-semibold pb-2">
                    Flying From:
                  </label>
                  <div className="flex items-center border-b border-white mr-2 ">
                    <MapPin className="text-white mr-2" />
                    <Select
                      filterOption={filterConfig}
                      options={listAirport}
                      onChange={(val) =>
                        setDepartureAirport(val as selectAirportProp)
                      }
                      className="w-full"
                      placeholder="Where are you now?"
                      styles={styleConfig}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-left text-white text-sm font-semibold pb-2">
                    Flying To:
                  </label>
                  <div className="flex items-center border-b border-white">
                    <MapPin className="text-white mr-2" />
                    <Select
                      filterOption={filterConfig}
                      options={listAirport}
                      onChange={(val) =>
                        setDestinationAirport(val as selectAirportProp)
                      }
                      className="w-full"
                      placeholder="Where are your destination?"
                      styles={styleConfig}
                    />
                  </div>
                </div>
              </div>
              {/* departure */}
              <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
                <div className="">
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
                {/* <div className="mt-3 2xl:mt-0 w-full 2xl:w-1/2 md:flex gap-3"> */}
                <div className="mb-4 md:mb-0 mt-3 md:flex gap-3 items-end">
                  <div className="w-full md:w-1/2 lg:w-4/6 2xl:w-3/5">
                    <Button
                      className="bg-transparent border-white border text-sm px-5 py-2.5 text-center inline-flex items-center w-full"
                      onClick={() => setShowInputPassenger(!showInputPassenger)}
                    >
                      {adult} Adult, {child} Child{' '}
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
                          {/* button done */}
                          <div className="text-center p-2 mt-2">
                            <Button
                              className="w-full"
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
                  <div className="w-full md:w-1/2 lg:w-2/6 2xl:w-2/5 mt-3 md:mt-0 ">
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
      <ToastContainer />
    </section>
  );
};

export default FindTicket;
