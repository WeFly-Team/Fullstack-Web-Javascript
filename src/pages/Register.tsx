import { ChangeEvent, useState } from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Heading from '../components/Heading';

const Register = () => {
  // state
  const [email, setEmail] = useState<String>('');
  const [username, setUsername] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [confirmPassword, setConfirmPassword] = useState<String>('');
  const [date, setDate] = useState<Number>(1);
  const [month, setMonth] = useState<String>('January');
  const [year, setYear] = useState<Number>(2024);
  const [phoneNumber, setPhoneNumber] = useState<String>('');

  // handler

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
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="col-span-2">
                <select
                  name="day"
                  id="day"
                  className="bg-white shadow border rounded-xl px-4 py-3 mb-2 focus:outline-none focus:border-primary-blue transition w-full"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div>
                <select
                  name="day"
                  id="day"
                  className="bg-white shadow border rounded-xl px-4 py-3 mb-2 focus:outline-none focus:border-primary-blue transition w-full"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
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
