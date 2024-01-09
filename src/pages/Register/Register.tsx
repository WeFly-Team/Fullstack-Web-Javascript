import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Heading from '../../components/Heading';
import Select from 'react-select';
import { datesOption, monthsOption, yearsOption } from './data';
const today = new Date();
const Register = () => {
  // state
  const [email, setEmail] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [date, setDate] = useState<string>('1');
  const [month, setMonth] = useState<string>('January');
  const [year, setYear] = useState<string>('2024');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // function
  const getAllDatesInMonth = (year: number, month: string): void => {
    const monthConverted =
      new Date(Date.parse(month + ' 1, 2012')).getMonth() + 1;
    const endDate = new Date(year, monthConverted, 0).getDate();

    datesOption.length = 0;
    for (let i = 1; i <= endDate; i++) {
      datesOption.push({ value: String(i), label: String(i) });
    }
  };
  // effect
  useEffect(() => {
    setMonth(monthsOption[today.getMonth()].value);
  }, []);

  useEffect(() => {
    getAllDatesInMonth(Number(year), month);
    console.log(date);
  }, [month, year]);
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
        <div className="relative col-span-2 w-full h-screen flex flex-col justify-center px-10 md:col-span-1 lg:col-span-2 xl:col-span-2 xxl:col-span-2">
          <div className="absolute left-2 top-2 md:right-2 md:left-auto">
            <img
              src="https://i.ibb.co/pxQ7DPC/logo-We-Fly.png"
              alt="logo"
              className="w-16"
            />
          </div>
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
            value={fullname}
            placeholder="Enter your full name"
            label="fullname"
            name="fullname"
            onChange={(e) => setFullname(e.target.value)}
            className="w-full"
          >
            Full Name
          </FormInput>

          <div className="mb-4">
            <label
              htmlFor="Date of Birth"
              className="block text-left text-black text-sm font-semibold pb-3"
            >
              Date of Birth
            </label>
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="col-span-1">
                <Select
                  name="day"
                  id="day"
                  styles={{
                    indicatorSeparator: () => ({ display: 'none' }),
                  }}
                  defaultValue={{ value: '1', label: '1' }}
                  options={datesOption}
                  onChange={(choice) => {
                    if (choice?.value) {
                      setDate(choice.value);
                    }
                  }}
                  classNames={{
                    control: (state) =>
                      state.isFocused
                        ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                        : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                  }}
                />
              </div>

              <div className="col-span-1 xl:col-span-2">
                <Select
                  name="month"
                  id="month"
                  defaultValue={monthsOption[today.getMonth()]}
                  options={monthsOption}
                  onChange={(choice) => {
                    if (choice?.value) {
                      setMonth(choice.value);
                    }
                  }}
                  styles={{
                    indicatorSeparator: () => ({ display: 'none' }),
                  }}
                  classNames={{
                    control: (state) =>
                      state.isFocused
                        ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                        : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                  }}
                />
              </div>
              <div className="col-span-1">
                <Select
                  name="year"
                  id="year"
                  defaultValue={yearsOption[0]}
                  options={yearsOption}
                  onChange={(choice) => {
                    if (choice?.value) {
                      setYear(choice.value);
                    }
                  }}
                  styles={{
                    indicatorSeparator: () => ({ display: 'none' }),
                  }}
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
          <Button className="w-full" variant="primary" size="md" id="signup">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
