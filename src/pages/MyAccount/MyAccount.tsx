import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { IFormInput } from './types';
import { datesOption, genderOption, monthsOption, yearsOption } from './data';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import Select from 'react-select';
import axiosInstance from '../../axios/axios';
import { AxiosError } from 'axios';
import { triggerToast } from '../../utils/functions';
import {
  UserProfileContextType,
  userProfileContextType,
} from '../ProfileLayout/types';

const MyAccout = () => {
  const { user, handleUpdateUser } = useContext(
    UserProfileContextType
  ) as userProfileContextType;
  // hook form
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      fullname: '',
      city: '',
      phoneNumber: '',
    },
  });

  const formatDate = (day: string, month: string, year: number): string => {
    const date = new Date(`${month} ${day}, ${year}`);
    const yyyy = date.getFullYear();
    let mm: string = (date.getMonth() + 1).toString(); // Months start at 0!
    let dd: string = date.getDate().toString();

    if (Number(dd) < 10) dd = '0' + dd;
    if (Number(mm) < 10) mm = '0' + mm;

    const formattedDate = dd + '-' + mm + '-' + yyyy;
    return formattedDate;
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const dateOfBirth = formatDate(
        data.day.value,
        data.month.value,
        Number(data.year.value)
      );
      // return;
      const result = await axiosInstance.put(
        '/user/update',
        {
          fullName: data.fullname,
          dateOfBirth,
          phoneNumber: data.phoneNumber,
          city: data.city,
          gender: data.gender.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (result.data.code == 200) {
        handleUpdateUser({
          fullName: data.fullname,
          dateOfBirth,
          phoneNumber: data.phoneNumber,
          city: data.city,
          gender: data.gender.value,
        });
        triggerToast('success', 'Your account has been updated');
      } else if (result.data.code == 400) {
        triggerToast('error', result.data.error);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data && err.response?.data.code == 400) {
          triggerToast('error', err.response.data.error);
        } else {
          triggerToast('error', err.message);
        }
      } else if (err instanceof Error) {
        triggerToast('error', err.message);
      }
    }
  };

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
    const subscription = watch((value, { name }) => {
      if (name === 'month' || name === 'year') {
        if (value.year?.value && value.month?.value) {
          getAllDatesInMonth(Number(value.year?.value), value.month?.value);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (user) {
      setValue('fullname', user.fullName);
      if (user.dateOfBirth) {
        let [day, month, year] = user.dateOfBirth
          .toString()
          .split('-')
          .map(Number);

        setValue('year', {
          value: year.toString(),
          label: year.toString(),
        });
        setValue('month', {
          value: monthsOption[month - 1].value,
          label: monthsOption[month - 1].label,
        });
        setValue('day', {
          value: day.toString(),
          label: day.toString(),
        });
      }
      if (user.gender) {
        if (user.gender === 'Male') {
          setValue('gender', {
            value: genderOption[1].value,
            label: genderOption[1].label,
          });
        } else {
          setValue('gender', {
            value: genderOption[0].value,
            label: genderOption[0].label,
          });
        }
      }
      if (user.city) {
        setValue('city', user.city);
      }
      setValue('phoneNumber', user.phoneNumber);
    }
  }, [user]);

  return (
    <div>
      <div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-bold leading-7 text-gray-900">
              Personal Data
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6">
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

              <div className="mb-4 grid sm:grid-cols-3 gap-4 mt-4">
                <div className="col-span-3 md:col-span-1">
                  <label
                    htmlFor="Gender"
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
                              ? errors.gender
                                ? 'bg-white !shadow !border !rounded-xl py-1 w-full !border-secondary-danger transition'
                                : 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                              : errors.gender
                              ? 'bg-white !shadow !border !rounded-xl py-1 w-full !border-secondary-danger'
                              : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                        }}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors.gender?.type === 'required' && (
                    <p className=" text-right text-secondary-danger text-sm font-semibold">
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
                                  ? errors.gender
                                    ? 'bg-white !shadow !border !rounded-xl py-1 w-full !border-secondary-danger transition'
                                    : 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                                  : errors.gender
                                  ? 'bg-white !shadow !border !rounded-xl py-1 w-full !border-secondary-danger'
                                  : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                            }}
                          />
                        )}
                        rules={{ required: true }}
                      />
                      {errors.day?.type === 'required' && (
                        <p className=" text-right text-secondary-danger text-sm font-semibold">
                          Date is required
                        </p>
                      )}
                    </div>

                    <div className="col-span-1 xl:col-span-2">
                      <Controller
                        name="month"
                        control={control}
                        render={({ field: { name, onChange, value } }) => (
                          <Select
                            name={name}
                            value={value}
                            id="month"
                            options={monthsOption}
                            onChange={onChange}
                            styles={{
                              indicatorSeparator: () => ({ display: 'none' }),
                            }}
                            classNames={{
                              control: (state) =>
                                state.isFocused
                                  ? errors.month
                                    ? 'bg-white !shadow !border !rounded-xl py-1 w-full !border-secondary-danger transition'
                                    : 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                                  : errors.month
                                  ? 'bg-white !shadow !border !rounded-xl py-1 w-full !border-secondary-danger'
                                  : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                            }}
                          />
                        )}
                        rules={{
                          required: {
                            value: true,
                            message: 'Month is required',
                          },
                        }}
                      />
                      {errors.month && (
                        <p className=" text-right text-secondary-danger text-sm font-semibold">
                          {errors.month.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1">
                      <Controller
                        name="year"
                        control={control}
                        render={({ field: { name, onChange, value } }) => (
                          <Select
                            name={name}
                            id="year"
                            value={value}
                            options={yearsOption}
                            onChange={onChange}
                            styles={{
                              indicatorSeparator: () => ({ display: 'none' }),
                            }}
                            classNames={{
                              control: (state) =>
                                state.isFocused
                                  ? errors.year
                                    ? 'bg-white !shadow !border !rounded-xl py-1 w-full !border-secondary-danger transition'
                                    : 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                                  : errors.year
                                  ? 'bg-white !shadow !border !rounded-xl py-1 w-full !border-secondary-danger'
                                  : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                            }}
                          />
                        )}
                        rules={{
                          required: {
                            value: true,
                            message: 'Year is required',
                          },
                        }}
                      />
                      {errors.year && (
                        <p className=" text-right text-secondary-danger text-sm font-semibold">
                          {errors.year.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-5">
                <div className="flex-1">
                  <Controller
                    name="city"
                    control={control}
                    render={({ field: { name, onChange, value } }) => (
                      <FormInput
                        type="text"
                        value={value}
                        placeholder="City of Residence"
                        label="city"
                        name={name}
                        onChange={onChange}
                        className={
                          errors.city
                            ? 'border-secondary-danger focus:border-secondary-danger w-full'
                            : 'w-full'
                        }
                      >
                        City of Residence
                      </FormInput>
                    )}
                    rules={{ required: true }}
                  />
                  {errors.city?.type === 'required' && (
                    <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                      City of Residence is required
                    </p>
                  )}
                </div>
                <div className="flex-1">
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
                        className={
                          errors.phoneNumber
                            ? 'border-secondary-danger focus:border-secondary-danger w-full'
                            : 'w-full'
                        }
                      >
                        Phone Number
                      </FormInput>
                    )}
                    rules={{
                      required: true,
                      pattern: /^(\+62|62|0)8[1-9][0-9]{6,9}$/i,
                    }}
                  />
                  {errors.phoneNumber?.type === 'required' && (
                    <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                      Phone Number is required
                    </p>
                  )}
                  {errors.phoneNumber?.type === 'pattern' && (
                    <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                      Invalid phone number
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={true}
            className="w-32 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            id="cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-32 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyAccout;
