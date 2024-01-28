import { useParams } from 'react-router-dom';
import BookingDetailCard from '../../components/BookingDetailCard/BookingDetailCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axios';
import { Transaction } from '../ProfileLayout/types';

const BookingDetail = () => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { id } = useParams();

  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    const getBookId = async () => {
      try {
        const detailBook = await axiosInstance.get(
          `/transaction/getById/${id}`,
          {
            headers,
          }
        );
        setTransaction(detailBook.data.data);
      } catch (err) {}
    };

    getBookId();
  }, [id]);
  return (
    <div>
      {transaction && (
        <BookingDetailCard transaction={transaction} className="mb-4" />
      )}
    </div>
  );
};

export default BookingDetail;
