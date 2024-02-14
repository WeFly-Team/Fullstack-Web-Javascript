import { useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Navbar from '../FlightList/components/Navbar/Navbar';
import axiosInstance from '../../axios/axios';
import { useAuth } from '../../customHooks/useAuth/useAuth';
import { AxiosError } from 'axios';

const Checkin = () => {
  useAuth();

  const [bookingCode, setBookingCode] = useState('');
  const [ordererLastName, setOrdererLastName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckin = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const result = await axiosInstance.post('/checkin/', {
        bookingCode,
        ordererLastName,
      });
      if (result.data.code == 200) {
        setSuccessMessage(result.data.data);
      } else if (result.data.code == 400) {
        setErrorMessage(result.data.error);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data && err.response?.data.code == 400) {
          setErrorMessage(err.response.data.error);
        } else setErrorMessage(err.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full p-6 flex-1 flex justify-center items-center">
        <div>
          <div className="w-full shadow-card rounded-xl mx-auto p-6">
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-8 sm:pr-4 py-3 rounded relative w-full mb-2"
                role="alert"
              >
                <span className="block sm:inline">{errorMessage}</span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setErrorMessage('')}
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            {successMessage && (
              <div
                className="bg-blue-100 border border-blue-400 text-blue-700 pl-4 pr-8 sm:pr-4 py-3 rounded relative w-full mb-2"
                role="alert"
              >
                <span className="block sm:inline">{successMessage}</span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setSuccessMessage('')}
                >
                  <svg
                    className="fill-current h-6 w-6 text-blue-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            <h1 className="font-bold text-2xl mb-4">Self Service Check In</h1>
            <FormInput
              type="text"
              name="checkin"
              id="checkin"
              label="Checkin Code"
              children="Checkin Code"
              placeholder="Check In Code"
              className="w-full"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
            />
            <FormInput
              type="text"
              name="orderer"
              id="checkin"
              label="Orderer's Last Name"
              children="Orderer's Last Name"
              placeholder="Orderer's Last Name"
              className="w-full"
              value={ordererLastName}
              onChange={(e) => setOrdererLastName(e.target.value)}
            />
            <Button onClick={handleCheckin} className="w-full">
              Check In Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkin;
