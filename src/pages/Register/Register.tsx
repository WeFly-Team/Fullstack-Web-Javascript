import { useEffect } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Heading from '../../components/Heading';
import Select from 'react-select';
import { datesOption, monthsOption, yearsOption } from './data';
import { IFormInput } from './types';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
const today = new Date();
const Register = () => {
  // hook form
  const { control, handleSubmit, watch, setValue } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      fullname: '',
      phoneNumber: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
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
    setValue('year', {
      value: today.getFullYear(),
      label: today.getFullYear(),
    });
    setValue('month', {
      value: monthsOption[today.getMonth()].value,
      label: monthsOption[today.getMonth()].value,
    });

    getAllDatesInMonth(
      today.getFullYear(),
      monthsOption[today.getMonth()].value
    );
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'month' || name === 'year') {
        if (value.year?.value && value.month?.value) {
          getAllDatesInMonth(value.year?.value, value.month?.value);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  placeholder="example@gmail.com"
                  label="email"
                  className="w-full"
                  value={value}
                  name={name}
                  onChange={onChange}
                >
                  Email
                </FormInput>
              )}
            />
            <Controller
              name="fullname"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  value={value}
                  placeholder="Enter your full name"
                  label="fullname"
                  name={name}
                  onChange={onChange}
                  className="w-full"
                >
                  Full Name
                </FormInput>
              )}
            />

            <div className="mb-4">
              <label
                htmlFor="Date of Birth"
                className="block text-left text-black text-sm font-semibold pb-3"
              >
                Date of Birth
              </label>
              <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <Controller
                    name="day"
                    control={control}
                    render={({ field: { name, onChange } }) => (
                      <Select
                        name={name}
                        id="day"
                        styles={{
                          indicatorSeparator: () => ({ display: 'none' }),
                        }}
                        options={datesOption}
                        onChange={onChange}
                        classNames={{
                          control: (state) =>
                            state.isFocused
                              ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                              : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                        }}
                      />
                    )}
                  />
                </div>

                <div className="col-span-1 xl:col-span-2">
                  <Controller
                    name="month"
                    control={control}
                    render={({ field: { name, onChange } }) => (
                      <Select
                        name={name}
                        id="month"
                        defaultValue={monthsOption[today.getMonth()]}
                        options={monthsOption}
                        onChange={onChange}
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
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <Controller
                    name="year"
                    control={control}
                    render={({ field: { name, onChange } }) => (
                      <Select
                        name={name}
                        id="year"
                        defaultValue={yearsOption[0]}
                        options={yearsOption}
                        onChange={onChange}
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
                    )}
                  />
                </div>
              </div>
            </div>

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  value={value}
                  placeholder="081234567890"
                  label="phoneNumber"
                  name={name}
                  onChange={onChange}
                  className="w-full"
                >
                  Phone Number
                </FormInput>
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="password"
                  value={value}
                  placeholder="*******"
                  label="password"
                  name={name}
                  onChange={onChange}
                  className="w-full"
                >
                  Password
                </FormInput>
              )}
            />

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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
