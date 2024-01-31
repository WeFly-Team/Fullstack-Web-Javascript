import BookingCard from './Component/BookingCard';
import NoResultCard from '../../components/NoResultCard/NoResultCard';
import { useContext, useEffect } from 'react';
import {
  UserTransactionContext,
  userTransactionContextType,
} from '../ProfileLayout/types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MyBooking = () => {
  const data = {
    labels: [
      '2018',
      '',
      '2019',
      '',
      '2020',
      '',
      '2021',
      '',
      '2022',
      '',
      '2023',
      '',
      '2024',
    ],
    datasets: [
      {
        data: [8, 9, 7.8, 7.9, 6, 7, 8, 6, 5, 7.8, 5, 8, 6, 7.5],
        backgroundColor: 'transparent',
        borderColor: '#f26c6d',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  };

  // const options = {
  //   plugins: {
  //     legend: false,
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //     },
  //     y: {
  //       min: 2,
  //       max: 10,
  //       ticks: {
  //         stepSize: 2,
  //         callback: (value) => value + 'K',
  //       },
  //       grid: {
  //         borderDash: [10],
  //       },
  //     },
  //   },
  // };

  const { transactions } = useContext(
    UserTransactionContext
  ) as userTransactionContextType;

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <div className="">
      <h1 className="font-bold text-2xl">Active E-tickets</h1>
      {transactions.length == 0 && (
        <NoResultCard
          title="No Active Bookings Found :("
          content="Anything you booked shows up here, but it seems like you haven't made any. Let's create one via homepage!"
          className="mt-4"
        />
      )}
      {transactions.length != 0 &&
        transactions.map((transaction) => (
          <BookingCard
            key={transaction.id}
            transaction={transaction}
            className="mt-4"
          />
        ))}
      <div className="mt-10" style={{ width: '750px', height: '500px' }}>
        <Line data={data}></Line>
      </div>
    </div>
  );
};

export default MyBooking;
