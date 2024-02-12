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
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axiosInstance from '../../../axios/axios';
import { TransactionReport } from '../types';
import { rangeDate } from '../../../utils/functions';
import 'react-day-picker/dist/style.css';
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

const Report = () => {
  const [report, setReport] = useState<TransactionReport[] | null>(null);
  const [statusData, setStatusData] = useState<ChartData<'line'> | null>(null);
  const [incomeData, setIncomeData] = useState<ChartData<'bar'> | null>(null);

  const getReport = async () => {
    try {
      const result = await axiosInstance.get(
        '/transaction/getReport?startDate=2024-01-01&period=monthly&endDate=2024-12-31&size=100',
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
    getReport();
  }, []);

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
