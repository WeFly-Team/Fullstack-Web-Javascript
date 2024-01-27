export function getNameOfDay(day: number): string {
  console.log(day);

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

  console.log(formattedDate.getDay());
  const formattedDay: string = getNameOfDay(formattedDate.getDay());
  const formattedMonth: string = getNameOfMonth(formattedDate.getMonth());
  const formattedYear: number = formattedDate.getFullYear();

  // Construct the formatted date string
  const result: string = `${formattedDay}, ${formattedMonth} ${day} ${formattedYear}`;

  return result;
}
