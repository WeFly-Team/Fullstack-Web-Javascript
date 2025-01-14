import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axios';
import {
  capitalizeFirstLetter,
  formatLongDate,
  triggerToast,
} from '../../utils/functions';
import { Transaction } from '../ProfileLayout/types';
import { ETicketProp } from './types';

const token = localStorage.getItem('token');
const headers = {
  Authorization: `Bearer ${token}`,
};
const ETicket = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction>();
  const [eticketResponse, setEticket] = useState<ETicketProp>();

  const downloadInvoice = async () => {
    try {
      const result = await axiosInstance.get(`/transaction/getInvoice/${id}`, {
        headers,
        responseType: 'arraybuffer',
      });
      const blob = new Blob([result.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      if (err instanceof AxiosError) {
        triggerToast('error', err.message);
      } else if (err instanceof Error) {
        triggerToast('error', err.message);
      }
    }
  };
  const downloadEticket = async () => {
    try {
      const result = await axiosInstance.get(`/transaction/getETicket/${id}`, {
        headers,
        responseType: 'arraybuffer',
      });
      const blob = new Blob([result.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      if (err instanceof AxiosError) {
        triggerToast('error', err.message);
      } else if (err instanceof Error) {
        triggerToast('error', err.message);
      }
    }
  };

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
      } catch (err) {
        if (err instanceof AxiosError) {
          triggerToast('error', err.message);
        } else if (err instanceof Error) {
          triggerToast('error', err.message);
        }
      }
    };
    const getETicket = async () => {
      try {
        const result = await axiosInstance.get(
          `/transaction/getETicketResponse/${id}`,
          {
            headers,
          }
        );

        setEticket(result.data.data[0]);
      } catch (err) {
        if (err instanceof AxiosError) {
          triggerToast('error', err.message);
        } else if (err instanceof Error) {
          triggerToast('error', err.message);
        }
      }
    };

    getBookId();
    getETicket();
  }, [id]);
  return (
    <div className="sm:w-min-[720px]">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">E-Ticket</h1>
        <div className="sm:flex items-center gap-4">
          <p
            onClick={downloadInvoice}
            className="cursor-pointer text-primary-blue font-semibold"
          >
            Show Payment Proof
          </p>
          <p
            onClick={downloadEticket}
            className="cursor-pointer text-primary-blue font-semibold"
          >
            Show eTicket
          </p>
        </div>
      </div>

      <div className="border border-neutral-05 mt-4 rounded-lg shadow-card">
        <div className="flex justify-between sm:border-b sm:border-b-neutral-06 p-6 gap-4">
          <div>
            <img
              src="https://res.cloudinary.com/dwy823csd/image/upload/v1736875160/image_14_1.png"
              alt="logo"
            />
            <p className="font-semibold">
              {
                transaction?.transactionDetails[0].flightClass.flightSchedule
                  .flight.airplane.airline.name
              }
            </p>
            <p className="text-sm font-semibold text-neutral-06">
              {transaction?.seatClass}
            </p>
          </div>

          <div className="hidden sm:block">
            {transaction && (
              <p className="mb-4 font-semibold">
                {formatLongDate(
                  transaction.transactionDetails[0].flightClass.flightSchedule.departureDate!.toString()
                )}
              </p>
            )}
            <div className="flex justify-between gap-5">
              <div className="flex flex-col justify-between">
                <p className="font-bold text-neutral-07">
                  {
                    transaction?.transactionDetails[0].flightClass
                      .flightSchedule.flight.departureTime
                  }
                </p>
                <p className="font-bold text-neutral-07">
                  {
                    transaction?.transactionDetails[0].flightClass
                      .flightSchedule.flight.arrivalTime
                  }
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="rounded-full border border-primary-blue h-4 w-4 bg-primary-blue"></div>
                <div className="border min-h-[80px] w-0 border-neutral-06"></div>
                <div className="rounded-full border-2 h-4 w-4 border-primary-blue bg-white"></div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  {transaction && (
                    <p className="font-semibold text-neutral-07">
                      {
                        transaction.transactionDetails[0].flightClass
                          .flightSchedule.flight.departureAirport.city
                      }{' '}
                      (
                      {
                        transaction.transactionDetails[0].flightClass
                          .flightSchedule.flight.departureAirport.iata
                      }
                      )
                    </p>
                  )}
                  {transaction && (
                    <p className="font-semibold text-neutral-07">
                      {
                        transaction.transactionDetails[0].flightClass
                          .flightSchedule.flight.departureAirport.name
                      }
                    </p>
                  )}
                </div>
                <div>
                  {transaction && (
                    <p className="font-semibold text-neutral-07">
                      {
                        transaction.transactionDetails[0].flightClass
                          .flightSchedule.flight.arrivalAirport.city
                      }{' '}
                      (
                      {
                        transaction.transactionDetails[0].flightClass
                          .flightSchedule.flight.arrivalAirport.iata
                      }
                      )
                    </p>
                  )}
                  {transaction && (
                    <p className="font-semibold text-neutral-07">
                      {
                        transaction.transactionDetails[0].flightClass
                          .flightSchedule.flight.arrivalAirport.name
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3">
              <p className="text-sm font-semibold text-neutral-08">
                Booking Id
              </p>
              <p className="font-bold">{transaction && transaction.id}</p>
            </div>
            {eticketResponse && (
              <div>
                <p className="text-sm font-semibold text-neutral-08">
                  Airline Booking Code
                </p>

                <p className="font-bold">{eticketResponse.bookCode}</p>
              </div>
            )}
          </div>
        </div>

        <div className="sm:hidden border-b border-b-neutral-06 p-6">
          {transaction && (
            <p className="mb-4 font-semibold">
              {formatLongDate(
                transaction.transactionDetails[0].flightClass.flightSchedule.departureDate!.toString()
              )}
            </p>
          )}
          <div className="flex justify-between gap-5">
            <div className="flex flex-col justify-between">
              <p className="font-bold text-neutral-07">
                {
                  transaction?.transactionDetails[0].flightClass.flightSchedule
                    .flight.departureTime
                }
              </p>
              <p className="font-bold text-neutral-07">
                {
                  transaction?.transactionDetails[0].flightClass.flightSchedule
                    .flight.arrivalTime
                }
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="rounded-full border border-primary-blue h-4 w-4 bg-primary-blue"></div>
              <div className="border basis-full w-0 border-neutral-06"></div>
              <div className="rounded-full border-2 h-4 w-4 border-primary-blue bg-white"></div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                {transaction && (
                  <p className="font-bold text-black">
                    {
                      transaction.transactionDetails[0].flightClass
                        .flightSchedule.flight.departureAirport.city
                    }{' '}
                    (
                    {
                      transaction.transactionDetails[0].flightClass
                        .flightSchedule.flight.departureAirport.iata
                    }
                    )
                  </p>
                )}
                {transaction && (
                  <p className="font-semibold text-neutral-07">
                    {
                      transaction.transactionDetails[0].flightClass
                        .flightSchedule.flight.departureAirport.name
                    }
                  </p>
                )}
              </div>
              <div>
                {transaction && (
                  <p className="font-bold text-black mt-4">
                    {
                      transaction.transactionDetails[0].flightClass
                        .flightSchedule.flight.arrivalAirport.city
                    }{' '}
                    (
                    {
                      transaction.transactionDetails[0].flightClass
                        .flightSchedule.flight.arrivalAirport.iata
                    }
                    )
                  </p>
                )}
                {transaction && (
                  <p className="font-semibold text-neutral-07">
                    {
                      transaction.transactionDetails[0].flightClass
                        .flightSchedule.flight.arrivalAirport.name
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <table className="font-semibold text-neutral-08 w-full">
            <thead>
              <tr className="text-left">
                <th className="w-[10%] ">No.</th>
                <th className="w-1/2 ">Passengers</th>
                <th className="w-1/5">Route</th>
                <th className="w-[30%]">Flight Facilities</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.passengers &&
                transaction.passengers.map((passenger, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <span className="font-semibold text-sm"></span>{' '}
                      {passenger.firstName} {passenger.lastName} (
                      {capitalizeFirstLetter(
                        passenger.passengerType!.toLowerCase()
                      )}
                      )<span className="font-semibold text-sm"></span>
                    </td>
                    {transaction && (
                      <td className="text-xs">
                        {
                          transaction.transactionDetails[0].flightClass
                            .flightSchedule.flight.departureAirport.iata
                        }{' '}
                        -{' '}
                        {
                          transaction.transactionDetails[0].flightClass
                            .flightSchedule.flight.arrivalAirport.iata
                        }
                      </td>
                    )}
                    <td>Baggage 20 kg</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ETicket;
