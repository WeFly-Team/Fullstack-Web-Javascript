import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import { IFormInput } from './types';
import { datesOption, genderOption, monthsOption, yearsOption } from './data';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { useState, useEffect} from 'react';
import Select from 'react-select';
// import axiosInstance from '../../axios/axios';
// import { AxiosError } from 'axios';
// import { Link } from 'react-router-dom';


const today = new Date();
const MyAccout = () => {

    // useState
    // const [errorMessage, setErrorMessage] = useState<string>('');
    // const [successMessage, setSuccessMessage] = useState<string>('');
    // hook form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
    fullname: ''
    },

  //   const resetValue = () => {
  //   setValue('fullname', '');
  // };


  // const formatDate = (day: string, month: string, year: number): string => {
  //   const date = new Date(`${month} ${day}, ${year}`);
  //   const yyyy = date.getFullYear();
  //   let mm: string = (date.getMonth() + 1).toString(); // Months start at 0!
  //   let dd: string = date.getDate().toString();

  //   if (Number(dd) < 10) dd = '0' + dd;
  //   if (Number(mm) < 10) mm = '0' + mm;

  //   const formattedDate = dd + '-' + mm + '-' + yyyy;
  //   return formattedDate;
  // };

  });
  // const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  //   try {
  //       const dateOfBirth = formatDate(
  //       data.day.value,
  //       data.month.value,
  //       data.year.value
  //     );

  //           const result = await axiosInstance.post('/user-my-account/register-user', {
  //       ...data,
  //       fullName: data.fullname,
  //       dateOfBirth,
  //     });
  //     if (result.data.code == 200) {
  //       setSuccessMessage(result.data.data);
  //       resetValue();
  //     } else if (result.data.code == 400) {
  //       setErrorMessage(result.data.error);
  //     }
  //   } catch (err) {
  //     if (err instanceof AxiosError) {
  //       if (err.response?.data && err.response?.data.code == 400) {
  //         setErrorMessage(err.response.data.error);
  //       } else setErrorMessage(err.message);
  //     } else if (err instanceof Error) {
  //       setErrorMessage(err.message);
  //     }
  //   }
  // };

    const getAllDatesInMonth = (year: number, month: string): void => {
    const monthConverted =
      new Date(Date.parse(month + ' 1, 2012')).getMonth() + 1;
    const endDate = new Date(year, monthConverted, 0).getDate();

    datesOption.length = 0;
    for (let i = 1; i <= endDate; i++) {
      datesOption.push({ value: String(i), label: String(i) });
    }
  };

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

    setValue('day', { label: '1', value: '1' });
  }, []);

    useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'month' || name === 'year') {
        if (value.year?.value && value.month?.value) {
          getAllDatesInMonth(value.year?.value, value.month?.value);
          setValue('day', { label: '1', value: '1' });
        }
      }
    });

        return () => subscription.unsubscribe();
  }, [watch]);




  return <div>
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-bold leading-7 text-gray-900">Personal Data</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">


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
                  className={
                    errors.fullname
                      ? 'border-secondary-danger focus:border-secondary-danger w-full'
                      : 'w-full'
                  }
                >
                  Full Name
                </FormInput>
              )}
              rules={{ required: true }}
            />
            {errors.fullname?.type === 'required' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                Full Name is required
              </p>
            )}


              <div className="mb-4 grid sm:grid-cols-3 gap-4">
                <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="Date of Birth"
                  className="block text-left text-black text-sm font-semibold pb-3"
                >
                  Gender
                </label>
                      <Controller
                      name="gender"
                      control={control}
                      render={({ field: { name, onChange, value } }) => (
                        <Select
                          name={name}
                          id="Gender"
                          styles={{
                            indicatorSeparator: () => ({ display: 'none' }),
                          }}
                          value={value}
                          options={genderOption}
                          onChange={onChange}
                          classNames={{
                            control: (state) =>
                              state.isFocused
                                ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                                : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                          }}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {errors.day?.type === 'required' && (
                      <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                        Gender is required
                      </p>
                    )}
                </div>

                <div className="col-span-3 md:col-span-2">
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
                      render={({ field: { name, onChange, value } }) => (
                        <Select
                          name={name}
                          id="day"
                          styles={{
                            indicatorSeparator: () => ({ display: 'none' }),
                          }}
                          value={value}
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
                      rules={{ required: true }}
                    />
                    {errors.day?.type === 'required' && (
                      <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                        Date is required
                      </p>
                    )}
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
            </div>


                         <Controller
              name="cityofresidence"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  value={value}
                  placeholder="City of Residence"
                  label="cityofresidence"
                  name={name}
                  onChange={onChange}
                  className={
                    errors.fullname
                      ? 'border-secondary-danger focus:border-secondary-danger w-full'
                      : 'w-full'
                  }
                >
                  City of Residence
                </FormInput>
              )}
              rules={{ required: true }}
            />
            {errors.fullname?.type === 'required' && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                City of Residence is required
              </p>
            )}


          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button disabled={true} className="w-32 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        id="cancel">
          Cancel
        </Button>
        <Button
        disabled={true}
          className="w-32 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </Button>
      </div>
    </form>
  </div>;
};

export default MyAccout;
