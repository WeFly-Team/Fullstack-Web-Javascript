import { useSearchParams } from 'react-router-dom';
import CardTicket from './components/CardTicket/CardTicket';
import Detail from './components/Detail/Details';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import PriceFilter from './components/PriceFilter/PriceFilter';
import VoucherCard from './components/VoucherCard/VoucherCard';
import { useEffect, useState } from 'react';
import { Airport } from '../Homepage/components/FindTicket/data';
import axiosInstance from '../../axios/axios';
import {
  calculateTotalPages,
  formatDate,
  getDuration,
  paginateFlights,
  shuffleArray,
} from '../../utils/functions';
import { DataFlight, detailPassenger } from '../ProfileLayout/types';
import { Schedule } from './components/Detail/types';
import Pagination from '../../components/Pagination/Pagination';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import { filterType } from './components/PriceFilter/types';

const FlightList = () => {
  // hooks
  const [searchParams] = useSearchParams();

  // state
  const [departureAirport, setDepartureAirport] = useState<Airport>({
    name: '',
    iata: '',
    icao: '',
    city: '',
    country: '',
    id: 0,
    status: true,
  });
  const [arrivalAirport, setArrivalAirport] = useState<Airport>({
    name: '',
    iata: '',
    icao: '',
    city: '',
    country: '',
    id: 0,
    status: true,
  });
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [classPassenger, setClassPassenger] = useState<string>('');
  const [totalPassengers, setTotalPassengers] = useState<number>(0);
  const [detailPassenger, setDetailPassenger] = useState<detailPassenger>({
    total: 0,
    adult: 0,
    child: 0,
  });
  const [schedules, setSchedules] = useState<Schedule[]>();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();

  const [flights, setFlights] = useState<DataFlight[]>();
  const [paginatedFlights, setPaginatedFlights] = useState<DataFlight[]>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 3;

  const [filter, setFilter] = useState<filterType>();
  const [lowestPrice, setLowestPrice] = useState<number>();
  const [shortestDuration, setShortestDuration] = useState<number>();

  //function
  const getAirport = async (idDepAirport: string, idDesAirport: string) => {
    const depAirport = await axiosInstance.get(`/airport/${idDepAirport}`);
    setDepartureAirport(depAirport.data.data);
    const arrivalAirport = await axiosInstance.get(`/airport/${idDesAirport}`);
    setArrivalAirport(arrivalAirport.data.data);
  };

  const getFlightList = async (
    formattedDepartureDate: Date,
    idDepAirport: string,
    idDesAirport: string,
    classPenumpang: string,
    totPassengers: number
  ) => {
    const formatedDepartureDate = formatDate(formattedDepartureDate);
    const queryString = `departureAirportId=${idDepAirport}&arrivalAirportId=${idDesAirport}&departDate=${formatedDepartureDate}&seatClass=${classPenumpang.toUpperCase()}&numberOfPassenger=${totPassengers}`;

    const flightList = await axiosInstance.get(
      `/flight/list?${queryString}&size=100`
    );
    const dataFlight = flightList.data.data.content;
    shuffleArray(dataFlight);
    setFlights(dataFlight);
  };

  const updateSelectedSchedule = (selectedSchedule: Schedule) => {
    if (schedules) {
      const updatedSchedules = schedules.map((schedule) => ({
        ...schedule,
        selected: schedule === selectedSchedule,
      }));
      setSchedules(updatedSchedules);
      setSelectedSchedule(selectedSchedule);
    }
  };

  const onPageChange = (page: number) => {
    if (flights && flights.length > 0) {
      setCurrentPage(page);
      setPaginatedFlights(paginateFlights(flights, page, itemsPerPage));
    }
  };

  const getShortestFlight = (flights: DataFlight[]) => {
    const sortedFlights = flights.sort((a, b) => {
      const durationA = getDuration(
        a.flight.departureTime,
        a.flight.arrivalTime
      );
      const durationB = getDuration(
        b.flight.departureTime,
        b.flight.arrivalTime
      );

      if (durationA !== durationB) {
        return durationA.localeCompare(durationB);
      }

      return a.basePriceAdult - b.basePriceAdult;
    });
    return sortedFlights;
  };

  const handleSelectedFilter = (filter: filterType) => {
    setFilter(filter);
  };

  // effect
  useEffect(() => {
    const classPenumpang = searchParams.get('class')!;
    const depDate = new Date(searchParams.get('dep-date')!);
    const totPassengers = Number(searchParams.get('total-passengers'));
    const totalAdult = Number(searchParams.get('adult'));
    const totalChild = Number(searchParams.get('child'));
    const idDepAirport = searchParams.get('dep-airport')!;
    const idDesAirport = searchParams.get('des-airport')!;

    setClassPassenger(classPenumpang);
    setTotalPassengers(totPassengers);
    setDetailPassenger({
      total: totPassengers,
      adult: totalAdult,
      child: totalChild,
    });

    const depDateUTC = new Date(
      depDate.getUTCFullYear(),
      depDate.getUTCMonth(),
      depDate.getUTCDate(),
      depDate.getUTCHours(),
      depDate.getUTCMinutes(),
      depDate.getUTCSeconds()
    );

    const formattedDepDate = depDateUTC.toLocaleString('en-US', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });

    setDepartureDate(new Date(Date.parse(formattedDepDate)));
    const formattedDepartureDate = new Date(Date.parse(formattedDepDate));

    getAirport(idDepAirport, idDesAirport);
    getFlightList(
      formattedDepartureDate,
      idDepAirport!,
      idDesAirport!,
      classPenumpang,
      totPassengers
    );
  }, [searchParams]);

  useEffect(() => {
    const listOfSchedule = [];
    for (let i = 0; i < 4; i++) {
      const updatedDate = new Date(departureDate);
      updatedDate.setDate(departureDate.getDate() + i);
      if (i == 0) {
        listOfSchedule.push({ date: updatedDate, selected: true });
      } else {
        listOfSchedule.push({ date: updatedDate, selected: false });
      }
    }
    setSchedules(listOfSchedule);
  }, [departureDate]);

  useEffect(() => {
    if (flights && flights.length > 0) {
      const reducedFlights = [...flights];
      const lowest = reducedFlights.reduce((minFlight, currentFlight) => {
        return currentFlight.basePriceAdult < minFlight.basePriceAdult
          ? currentFlight
          : minFlight;
      }, reducedFlights[0]);
      setLowestPrice(lowest.basePriceAdult);

      const sortedFlights = getShortestFlight([...flights]);
      setShortestDuration(sortedFlights[0].basePriceAdult);

      setCurrentPage(1);
      setPaginatedFlights(paginateFlights(flights, 1, itemsPerPage));
      setTotalPages(calculateTotalPages(flights.length, itemsPerPage));
    }
  }, [flights]);

  useEffect(() => {
    if (selectedSchedule) {
      getFlightList(
        selectedSchedule.date,
        departureAirport.id.toString(),
        arrivalAirport.id.toString(),
        classPassenger,
        totalPassengers
      );
      setFilter(undefined);
    }
  }, [selectedSchedule]);

  useEffect(() => {
    if (flights && flights.length > 0) {
      if (filter == 'lowest') {
        const sortedFlights = [...flights];
        sortedFlights.sort((a, b) => a.basePriceAdult - b.basePriceAdult);
        setFlights(sortedFlights);
      } else if (filter == 'shortest') {
        setFlights(getShortestFlight(flights));
      }
    }
  }, [filter]);
  return (
    <>
      <Navbar className="fixed top-0 right-0 left-0 z-10 bg-white" />
      <div className="px-8 lg:px-0 lg:container mx-auto ">
        <div className="pt-40 flex">
          <div className="w-1/4 relative">
            <VoucherCard
              vouchertitle="ini voucher asik"
              voucherdescription="voucher ini dapat di tukarkan ke toko
                terdekat"
              voucherimageurl="https://i.ibb.co/xgP9hXt/1705387995965-06335942abf22232a4caa74eb239ad59.jpg"
              vouchercode="asik2000"
            />
          </div>
          <div className="w-3/4">
            {schedules && (
              <Detail
                departureAirport={departureAirport}
                destinationAirport={arrivalAirport}
                classPassenger={classPassenger}
                departureDate={
                  selectedSchedule ? selectedSchedule.date : departureDate
                }
                totalPassengers={totalPassengers}
                schedules={schedules}
                updateSelectedSchedule={updateSelectedSchedule}
              />
            )}
          </div>
        </div>
        <div className="flex">
          {/* filter */}
          <div className="w-1/4"></div>
          {/* card ticket */}
          <div className="w-3/4 mt-4">
            {lowestPrice && shortestDuration && (
              <PriceFilter
                handleSelectedFilter={handleSelectedFilter}
                filter={filter}
                lowestPrice={lowestPrice}
                shortestPrice={shortestDuration}
              />
            )}
            {flights && flights.length == 0 && (
              <NoResultCard
                title="Flights not found :("
                content="Please try another airport or schedule"
              />
            )}
            {paginatedFlights &&
              paginatedFlights.map((data) => (
                <CardTicket
                  key={data.id}
                  data={data}
                  detailPassenger={detailPassenger}
                  className="mt-4"
                />
              ))}
            {totalPages > 0 && (
              <div className=" mt-5">
                <Pagination
                  className="justify-center"
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FlightList;
