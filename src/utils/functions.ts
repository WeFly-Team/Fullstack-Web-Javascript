import { Bounce, ToastOptions, TypeOptions, toast } from 'react-toastify';

export function getNameOfDay(day: number): string {
  switch (day) {
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    case 7:
      return 'Sun';
    default:
      return '';
  }
}

export function getNameOfMonth(month: number): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return months[month];
}

export const getInitials = (fullName: string) => {
  const allNames = fullName.trim().split(' ');
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
  return initials;
};

export const formatDate = (date: Date) => {
  const inputDate = date;

  const day = inputDate.getDate().toString().padStart(2, '0');
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const year = inputDate.getFullYear();

  return `${day}-${month}-${year}`;
};

export const substractTime = (time1: string, time2: string) => {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  let hoursDiff = hours1 - hours2;
  let minutesDiff = minutes1 - minutes2;

  if (minutesDiff < 0) {
    minutesDiff += 60;
    hoursDiff--;
  }

  const result = `${hoursDiff}h ${minutesDiff}m`;

  return result;
};

export const thousandSeparator = (num: number) => {
  return num.toLocaleString('en-US');
};

export function formatLongDate(inputDateString: string): string {
  const parts: number[] = inputDateString
    .split('-')
    .map((part) => parseInt(part, 10));

  const [day, month, year] = parts;

  const formattedDate: Date = new Date(year, month - 1, day);

  const formattedDay: string = getNameOfDay(formattedDate.getDay());
  const formattedMonth: string = getNameOfMonth(formattedDate.getMonth());
  const formattedYear: number = formattedDate.getFullYear();

  const result: string = `${formattedDay}, ${formattedMonth} ${day} ${formattedYear}`;

  return result;
}

export const getTotalPrice = (
  adultCount: number,
  childCount: number,
  adultTicketPrice: number,
  childTicketPrice: number
): number => {
  const validAdultCount: number = Math.max(0, Math.floor(adultCount));
  const validChildCount: number = Math.max(0, Math.floor(childCount));

  const totalAdultPrice: number = validAdultCount * adultTicketPrice;
  const totalChildPrice: number = validChildCount * childTicketPrice;

  const totalPrice: number = totalAdultPrice + totalChildPrice;

  return totalPrice;
};

export function extractNames(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const names: string[] = fullName.split(' ');

  const lastName: string = names.pop() || '';

  const firstName: string = names.join(' ');

  return { firstName, lastName };
}

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
const reactOpt: ToastOptions = {
  position: 'bottom-left',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};
export const triggerToast = (type: TypeOptions, message: string) => {
  if (type === 'error') {
    toast.error(message, reactOpt);
  } else if (type === 'info') {
    toast.info(message, reactOpt);
  } else if (type === 'success') {
    toast.success(message, reactOpt);
  }
};
export const formatDdMmYyyy = (
  day: string,
  month: string,
  year: number
): string => {
  const date = new Date(`${month} ${day}, ${year}`);
  const yyyy = date.getFullYear();
  let mm: string = (date.getMonth() + 1).toString(); // Months start at 0!
  let dd: string = date.getDate().toString();

  if (Number(dd) < 10) dd = '0' + dd;
  if (Number(mm) < 10) mm = '0' + mm;

  const formattedDate = dd + '-' + mm + '-' + yyyy;
  return formattedDate;
};

export const formatYyyyMmDd = (
  day: string,
  month: string,
  year: number
): string => {
  const date = new Date(`${month} ${day}, ${year}`);
  const yyyy = date.getFullYear();
  let mm: string = (date.getMonth() + 1).toString(); // Months start at 0!
  let dd: string = date.getDate().toString();

  if (Number(dd) < 10) dd = '0' + dd;
  if (Number(mm) < 10) mm = '0' + mm;

  const formattedDate = yyyy + '-' + mm + '-' + dd;
  return formattedDate;
};
