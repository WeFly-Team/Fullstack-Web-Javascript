import {
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axiosInstance from '../../../axios/axios';
import { TransactionReport } from '../types';
import { rangeDate } from '../../../utils/functions';
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import FocusTrap from 'focus-trap-react';
import { format } from 'date-fns';
import { usePopper } from 'react-popper';
import ReactSelect from 'react-select';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const lineOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Transaction Status',
      align: 'center',
      font: {
        size: 24,
        style: 'italic',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        minRotation: 45,
      },
      title: {
        display: true,
        text: 'Periode',
        align: 'center',
        padding: {
          top: 20,
        },
        font: {
          size: 20,
          weight: 'bolder',
        },
      },
    },
    y: {
      title: {
        display: true,
        text: 'Transaction Amount',
        align: 'center',
        padding: {
          bottom: 20,
        },
        font: {
          size: 20,
          weight: 'bolder',
        },
      },
    },
  },
};
const barOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Transaction Income',
      align: 'center',
      font: {
        size: 24,
        style: 'italic',
      },
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      ticks: {
        minRotation: 45,
      },
      title: {
        display: true,
        text: 'Periode',
        align: 'center',
        padding: {
          top: 20,
        },
        font: {
          size: 20,
          weight: 'bolder',
        },
      },
    },
    y: {
      title: {
        display: true,
        text: 'Income Amount',
        align: 'center',
        padding: {
          bottom: 20,
        },
        font: {
          size: 20,
          weight: 'bolder',
        },
      },
    },
  },
};

const intervalOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
];

const Report = () => {
  const [report, setReport] = useState<TransactionReport[] | null>(null);
  const [statusData, setStatusData] = useState<ChartData<'line'> | null>(null);
  const [incomeData, setIncomeData] = useState<ChartData<'bar'> | null>(null);

  const [interval, setInterval] = useState(intervalOptions[0].value);

  const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>('');
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start',
  });

  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [inputValueEndDate, setInputValueEndDate] = useState<string>('');
  const [isPopperOpenEndDate, setIsPopperOpenEndDate] = useState(false);
  const popperRefEndDate = useRef<HTMLDivElement>(null);
  const buttonRefEndDate = useRef<HTMLButtonElement>(null);
  const [popperElementEndDate, setPopperElementEndDate] =
    useState<HTMLDivElement | null>(null);
  const [limitDateBefore, setLimitDateBefore] = useState(new Date());
  // endDate
  const popperEndDate = usePopper(
    popperRefEndDate.current,
    popperElementEndDate,
    {
      placement: 'bottom-start',
    }
  );

  const closePopperEndDate = () => {
    setIsPopperOpenEndDate(false);
    buttonRefEndDate?.current?.focus();
  };

  const handleButtonClickEndDate = () => {
    setIsPopperOpenEndDate(!isPopperOpenEndDate);
  };

  const handleDaySelectEndDate: SelectSingleEventHandler = (date) => {
    setSelectedEndDate(date);
    if (date) {
      setInputValueEndDate(format(date, 'y-MM-dd'));
      closePopperEndDate();
    } else {
      setInputValueEndDate('');
      setSelectedEndDate(undefined);
    }
  };

  // start date
  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleButtonClick = () => {
    setIsPopperOpen(!isPopperOpen);
  };

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, 'y-MM-dd'));
      closePopper();
    } else {
      setInputValue('');
      setSelected(undefined);
    }
  };

  const getReport = async (
    startDate: string,
    endDate: string,
    interval: string
  ) => {
    try {
      const result = await axiosInstance.get(
        `/transaction/getReport?startDate=${startDate}&period=${interval}&endDate=${endDate}&size=100`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setReport(result.data.data.content);
    } catch (err) {}
  };
  // effect
  useEffect(() => {
    const date = new Date(new Date().getFullYear(), 0, 1);
    setSelected(date);
    setInputValue(format(date, 'y-MM-dd'));
    const endDate = new Date(new Date().getFullYear(), 11, 31);
    setSelectedEndDate(endDate);
    setInputValueEndDate(format(endDate, 'y-MM-dd'));
  }, []);

  useEffect(() => {
    if (selected && selectedEndDate && interval) {
      getReport(
        format(selected, 'y-MM-dd'),
        format(selectedEndDate, 'y-MM-dd'),
        interval
      );
    }
  }, [selected, selectedEndDate, interval]);

  useEffect(() => {
    if (selected) {
      const nextWeek = new Date(selected.getTime());
      nextWeek.setDate(selected.getDate() + 7);
      setLimitDateBefore(nextWeek);
    }
  }, [selected]);

  useEffect(() => {
    if (report) {
      setStatusData({
        labels: report.map((data) =>
          rangeDate(new Date(data.startDate), new Date(data.endDate))
        ),
        datasets: [
          {
            label: 'Successful Transactions',
            data: report.map((data) => data.successfulTransactions),
            borderColor: '#18af5e',
            backgroundColor: '#18af5e',
          },
          {
            label: 'Failed Transactions',
            data: report.map((data) => data.failedTransactions),
            borderColor: '#cb3a31',
            backgroundColor: '#cb3a31',
          },
        ],
      });
      setIncomeData({
        labels: report.map((data) =>
          rangeDate(new Date(data.startDate), new Date(data.endDate))
        ),
        datasets: [
          {
            label: 'Income',
            data: report.map((data) => (data.income ? data.income : 0)),
            backgroundColor: '#18af5e',
            stack: 'Stack 0',
          },
          {
            label: 'Potential Income',
            data: report.map((data) =>
              data.potentialIncome ? data.potentialIncome : 0
            ),
            backgroundColor: '#f1a025',
            stack: 'Stack 1',
          },
        ],
      });
    }
  }, [report]);
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Start Date:
            </label>
            <div ref={popperRef}>
              <button
                ref={buttonRef}
                type="button"
                aria-label="Pick a date"
                onClick={handleButtonClick}
                className="bg-white rounded border-neutral-03 border text-sm px-5 py-2.5 text-black text-center inline-flex items-center w-full"
              >
                {inputValue}
              </button>
            </div>
            {isPopperOpen && (
              <FocusTrap
                active
                focusTrapOptions={{
                  initialFocus: false,
                  allowOutsideClick: true,
                  clickOutsideDeactivates: true,
                  // onDeactivate: closePopper,
                  fallbackFocus: buttonRef.current || undefined,
                }}
              >
                <div
                  tabIndex={-1}
                  style={popper.styles.popper}
                  className="dialog-sheet"
                  {...popper.attributes.popper}
                  ref={setPopperElement}
                  role="dialog"
                  aria-label="DayPicker calendar"
                >
                  <DayPicker
                    initialFocus={isPopperOpen}
                    mode="single"
                    className="bg-white p-4 z-20"
                    defaultMonth={selected}
                    selected={selected}
                    onSelect={handleDaySelect}
                  />
                </div>
              </FocusTrap>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              End Date:
            </label>
            <div ref={popperRefEndDate}>
              <button
                ref={buttonRefEndDate}
                type="button"
                aria-label="Pick a date"
                onClick={handleButtonClickEndDate}
                className="bg-white rounded border-neutral-03 border text-sm px-5 py-2.5 text-black text-center inline-flex items-center w-full"
              >
                {inputValueEndDate}
              </button>
            </div>
            {isPopperOpenEndDate && (
              <FocusTrap
                active
                focusTrapOptions={{
                  initialFocus: false,
                  allowOutsideClick: true,
                  clickOutsideDeactivates: true,
                  // onDeactivate: closePopperEndDate,
                  fallbackFocus: buttonRef.current || undefined,
                }}
              >
                <div
                  tabIndex={-1}
                  style={popperEndDate.styles.popper}
                  className="dialog-sheet"
                  {...popperEndDate.attributes.popper}
                  ref={setPopperElementEndDate}
                  role="dialog"
                  aria-label="DayPicker calendar"
                >
                  <DayPicker
                    initialFocus={isPopperOpenEndDate}
                    mode="single"
                    className="bg-white p-4"
                    defaultMonth={selectedEndDate}
                    selected={selectedEndDate}
                    onSelect={handleDaySelectEndDate}
                    disabled={{
                      before: limitDateBefore,
                    }}
                  />
                </div>
              </FocusTrap>
            )}
          </div>
          <div className="flex flex-col ">
            <label className="text-sm font-medium text-gray-700">
              Interval:
            </label>
            <ReactSelect
              options={intervalOptions}
              defaultValue={intervalOptions[0]}
              onChange={(selected) =>
                setInterval(selected ? selected.value : 'monthly')
              }
            />
          </div>
        </div>
      </div>
      <div className="mt-4 p-6 rounded-xl bg-white">
        {statusData && <Line options={lineOptions} data={statusData}></Line>}
      </div>
      <div className="mt-4 bg-white p-6 rounded-xl">
        {incomeData && <Bar options={barOptions} data={incomeData}></Bar>}
      </div>
    </>
  );
};
export default Report;
