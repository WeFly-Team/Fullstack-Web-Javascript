import Button from '../components/Button';
import Heading from '../components/Heading';

const Register = () => {
  return (
    <div className="h-dvh">
      <div className="grid grid-cols-2 justify-items-center lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7">
        <div className="hidden md:block md:col-span-1 lg:col-span-3 xl:col-span-4 xxl:col-span-5">
          <img
            src="https://i.ibb.co/p04HSxH/image-1.png"
            alt="plane-register"
            className="object-cover mix-blend-overlay h-screen w-screen"
          />
        </div>
        <div className="col-span-2 w-full h-screen flex flex-col justify-center px-10 md:col-span-1 lg:col-span-2 xl:col-span-2 xxl:col-span-2">
          <div className="mx-auto">
            <Heading>REGISTER NOW!</Heading>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="border-neutral-04 border-2 rounded-lg p-2 w-full focus:outline-none focus:border-primary-blue  transition"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block font-bold">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your name"
              className="border-neutral-04 border-2 rounded-lg p-2 w-full focus:outline-none focus:border-primary-blue  transition"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Date of Birth" className="block font-bold">
              Date of Birth{' '}
            </label>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <select
                  name="day"
                  id="day"
                  className="bg-transparent border-neutral-04 border-2 rounded-lg p-2 w-full focus:outline-none focus:border-primary-blue  transition"
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
                  className="bg-transparent border-neutral-04 border-2 rounded-lg p-2 w-full focus:outline-none focus:border-primary-blue  transition"
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
                  className="bg-transparent border-neutral-04 border-2 rounded-lg p-2 w-full focus:outline-none focus:border-primary-blue  transition"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block font-bold">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="081234567890"
              className="border-neutral-04 border-2 rounded-lg p-2 w-full focus:outline-none focus:border-primary-blue  transition"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-bold">
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="*********"
              className="border-neutral-04 border-2 rounded-lg p-2 w-full focus:outline-none focus:border-primary-blue  transition"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm" className="block font-bold">
              Confirm Password
            </label>
            <input
              type="text"
              id="confirm"
              name="confirm"
              placeholder="*********"
              className="border-neutral-04 border-2 rounded-lg p-2 w-full focus:outline-none focus:border-primary-blue  transition"
            />
          </div>
          <div className="flex mb-4">
            <input type="checkbox" id="check" className="mr-2" />
            <p className="font-bold">Saya Menyetujui Syarat & Ketentuan</p>
          </div>
          {/* <Button className="mb-4">Sign Up</Button> */}
          <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
