import { useEffect, useState } from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Heading from '../components/Heading';
import Select from 'react-select';
const Register = () => {
  // vars
  const today = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  // interface
  interface yearProp {
    value: string;
    label: string;
  }
  // state
  const [years, setYears] = useState<yearProp[]>([]);
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [date, setDate] = useState<string>('1');
  const [month, setMonth] = useState<string>('January');
  const [year, setYear] = useState<string>('2024');
  const [sizeYear, setSizeYear] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // handler
  const handlerYear = (pYear: string) => {
    setYear(pYear);
    setSizeYear(0);
  };
  // effect
  useEffect(() => {
    const tahun: yearProp[] = [];

    for (let i = today.getFullYear(); i >= 1950; i--) {
      tahun.push({ value: i.toString(), label: i.toString() });
    }
    setYears(tahun);
    setMonth(months[today.getMonth()]);
  }, []);
  return (
    <div className="h-dvh">
      <div className="grid grid-cols-2 justify-items-center lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7">
        <div className="bg-gradient-to-r from-transparent to-white hidden md:block md:col-span-1 lg:col-span-3 xl:col-span-4 xxl:col-span-5">
          <img
            src="https://i.ibb.co/p04HSxH/image-1.png"
            alt="plane-register"
            className="object-cover mix-blend-overlay h-screen w-screen"
          />
        </div>
        <div className="col-span-2 w-full h-screen flex flex-col justify-center px-10 md:col-span-1 lg:col-span-2 xl:col-span-2 xxl:col-span-2">
          <div className="mx-auto md:mx-0">
            <Heading>REGISTER NOW!</Heading>
          </div>

          <FormInput
            type="text"
            value={email}
            placeholder="example@gmail.com"
            label="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          >
            Email
          </FormInput>

          <FormInput
            type="text"
            value={username}
            placeholder="Enter your name"
            label="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          >
            Username
          </FormInput>

          <div className="mb-4">
            <label
              htmlFor="Date of Birth"
              className="block text-left text-black text-sm font-semibold pb-3"
            >
              Date of Birth{' '}
            </label>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <select
                  name="day"
                  id="day"
                  className="bg-white shadow border rounded-xl px-4 py-3 mb-2 focus:outline-none focus:border-primary-blue transition w-full"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="col-span-2">
                <select
                  name="month"
                  id="month"
                  className="bg-white shadow border rounded-xl px-4 py-3 mb-2 focus:outline-none focus:border-primary-blue transition w-full"
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  {months &&
                    months.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                {/* <select
                  name="year"
                  id="year"
                  className="bg-white shadow border rounded-xl px-4 py-3 mb-2 focus:outline-none focus:border-primary-blue transition w-full"
                  onChange={(e) => handlerYear(e.target.value)}
                  value={year}
                  size={sizeYear}
                  onMouseDown={() => {
                    setSizeYear(5);
                  }}
                  onBlur={() => setSizeYear(0)}
                >
                  {years &&
                    years.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                </select> */}
                <Select
                  name="year"
                  id="year"
                  defaultValue={years[1]}
                  options={years}
                  classNames={{
                    control: (state) =>
                      state.isFocused
                        ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                        : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                  }}
                />
              </div>
            </div>
          </div>

          <FormInput
            type="text"
            value={phoneNumber}
            placeholder="081234567890"
            label="phoneNumber"
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full"
          >
            Phone Number
          </FormInput>

          <FormInput
            type="password"
            value={password}
            placeholder="*******"
            label="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          >
            Password
          </FormInput>
          <div className="flex mb-4">
            <input type="checkbox" id="check" className="mr-2" />
            <label
              htmlFor="check"
              className="text-left text-black text-sm font-semibold"
            >
              Saya Menyetujui Syarat & Ketentuan
            </label>
          </div>
          {/* <Button className="mb-4">Sign Up</Button> */}
          <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
