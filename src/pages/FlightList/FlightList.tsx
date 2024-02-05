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
import { formatDate } from '../../utils/functions';
import { DataFlight, detailPassenger } from '../ProfileLayout/types';

const FlightList = () => {
  const [departureAirport, setDepartureAirport] = useState<Airport>({
    name: '',
    iata: '',
    icao: '',
    city: '',
    country: '',
    id: 0,
    status: true,
  });
  const [destinationAirport, setDestinationAirport] = useState<Airport>({
    name: '',
    iata: '',
    icao: '',
    city: '',
    country: '',
    id: 0,
    status: true,
  });
  const [flights, setFlights] = useState<DataFlight[]>([]);
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [classPassenger, setClassPassenger] = useState<string>('');
  const [totalPassengers, setTotalPassengers] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const [detailPassenger, setDetailPassenger] = useState<detailPassenger>({
    total: 0,
    adult: 0,
    child: 0,
  });

  useEffect(() => {
    const classPenumpang = searchParams.get('class')!;
    setClassPassenger(classPenumpang);
    const depDate = new Date(searchParams.get('dep-date')!);
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
    const totPassengers = Number(searchParams.get('total-passengers'));
    const totalAdult = Number(searchParams.get('adult'));
    const totalChild = Number(searchParams.get('child'));
    setDetailPassenger({
      total: totPassengers,
      adult: totalAdult,
      child: totalChild,
    });
    setTotalPassengers(totPassengers);

    const idDepAirport = searchParams.get('dep-airport');
    const idDesAirport = searchParams.get('des-airport');

    const getAirport = async () => {
      const depAirport = await axiosInstance.get(`/airport/${idDepAirport}`);
      const dataDepAirport = depAirport.data.data;
      setDepartureAirport(dataDepAirport);
      const desAirport = await axiosInstance.get(`/airport/${idDesAirport}`);
      const dataDesAirport = desAirport.data.data;
      setDestinationAirport(dataDesAirport);
    };

    const getFlightList = async () => {
      const formatedDepartureDate = formatDate(depDate);
      const queryString = `departureAirportId=${idDepAirport}&arrivalAirportId=${idDesAirport}&departureDate=${formatedDepartureDate}&seatClass=${classPenumpang.toUpperCase()}&numberOfPassenger=${totPassengers}`;

      const flightList = await axiosInstance.get(`/flight/list?${queryString}`);
      const dataFlight = flightList.data.data.content;
      setFlights(dataFlight);
    };
    getAirport();
    getFlightList();
  }, []);

  return (
    <>
      <Navbar className="fixed top-0 right-0 left-0 z-10 bg-white" />
      <div className="px-8 lg:px-0 lg:container mx-auto ">
        <div className="pt-48 flex">
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
            <Detail
              departureAirport={departureAirport}
              destinationAirport={destinationAirport}
              classPassenger={classPassenger}
              departureDate={departureDate}
              totalPassengers={totalPassengers}
            />
          </div>
        </div>
        <div className="flex">
          {/* filter */}
          <div className="w-1/4"></div>
          {/* card ticket */}
          <div className="w-3/4 mt-4">
            <PriceFilter />
            {flights &&
              flights.map((data) => (
                <CardTicket
                  key={data.id}
                  data={data}
                  detailPassenger={detailPassenger}
                  className="mt-4"
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FlightList;
