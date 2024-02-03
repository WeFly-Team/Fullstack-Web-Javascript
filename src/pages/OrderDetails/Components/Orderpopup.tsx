import React, { useContext, useEffect, useState } from 'react';
import {
  GenderType,
  OrderDetailContext,
  OrderPopProp,
  OrdererInput,
  orderDetailContextType,
} from './types';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import { AiOutlineLeft } from 'react-icons/ai';
import { extractNames } from '../../../utils/functions';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const Orderpopup = ({ className, isClose }: OrderPopProp) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrdererInput>({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
    },
  });
  const { orderer, saveOrderer } = useContext(
    OrderDetailContext
  ) as orderDetailContextType;

  const [isgender, setIsGender] = useState<GenderType>('Mr');
  const genders = ['Mr', 'Mrs', 'Miss'];

  const handleGenderChange = (selectedGender: GenderType) => {
    setIsGender(selectedGender);
  };
  const handleShowPopUp = async (e: any) => {
    if (e.target.id === 'order-popup') {
      isClose();
    }
    return;
  };

  const handleSave: SubmitHandler<OrdererInput> = (data) => {
    console.log(data);
    // if (newOrderer) {
    //   saveOrderer(newOrderer);
    //   isClose();
    // }
    if (orderer) {
      const { firstName, lastName } = extractNames(data.fullName);
      // setNewOrderer();
      saveOrderer({
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        dateOfBirth: orderer.dateOfBirth,
        firstName,
        lastName,
        type: isgender,
      });
      isClose();
    }
  };

  useEffect(() => {
    if (orderer) {
      // setNewOrderer(orderer);
      setValue('email', orderer.email);
      setValue('fullName', orderer.fullName);
      setValue('phoneNumber', orderer.phoneNumber);
      setIsGender(orderer.type);
    }
  }, [orderer]);

  // useEffect(() => {
  //   if (orderer) {
  //     const { firstName, lastName } = extractNames(newFullname);
  //     setNewOrderer({
  //       email: newEmail,
  //       fullName: newFullname,
  //       phoneNumber: newPhoneNumber,
  //       dateOfBirth: orderer.dateOfBirth,
  //       firstName,
  //       lastName,
  //       type: isgender,
  //     });
  //   }
  // }, [newEmail, newFullname, newPhoneNumber, isgender]);
  return (
    <div
      id="order-popup"
      className={`order-popup z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${className}`}
      onClick={handleShowPopUp}
    >
      <div className="bg-white pb-[53px] px-[74px] rounded-lg w-[47%] max-w-[664px] h-fit min-h-[200px]">
        <div className="top-poup grid w-full items-center">
          <AiOutlineLeft
            className="absolute  text-2xl cursor-pointer"
            onClick={isClose}
          />
          <h1 className="font-bold text-3xl  justify-self-center py-[27px]">
            Order Detail
          </h1>
        </div>
        <hr />
        <div className="w-full mt-3">
          <div>
            <p className="font-normal text-md text-gray-400">
              This data will be used for E-Ticket delivery
            </p>
            {orderer && (
              <Controller
                name="fullName"
                control={control}
                render={({ field: { name, onChange, value } }) => (
                  <FormInput
                    type="text"
                    children="Full name"
                    label="Full name"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder="Enter your full name"
                    className={
                      errors.fullName
                        ? 'border-secondary-danger focus:border-secondary-danger w-full'
                        : 'w-full'
                    }
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: 'Full name is required',
                  },
                  pattern: {
                    value:
                      /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/i,
                    message: 'Please enter your first name and last name',
                  },
                }}
              />
            )}
            {errors.fullName && (
              <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold w-full">
                {errors.fullName.message}
              </p>
            )}
            <p className="relative font-normal text-md text-gray-400 top-[-16px]">
              *Corresponds to ID card
            </p>
          </div>

          <div className="radio-button flex justify-between pb-4">
            {genders.map((genderOption) => (
              <React.Fragment key={genderOption}>
                <div className="flex gap-x-2 text-xl font-semibold">
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={isgender === genderOption}
                    onChange={() =>
                      handleGenderChange(genderOption as GenderType)
                    }
                  />
                  {genderOption}
                </div>
              </React.Fragment>
            ))}
          </div>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { name, onChange, value } }) => (
              <FormInput
                type="text"
                children="Phone number"
                label="Phone number"
                name={name}
                value={value}
                onChange={onChange}
                placeholder="Enter your phone number"
                className={
                  errors.phoneNumber
                    ? 'border-secondary-danger focus:border-secondary-danger w-full'
                    : 'w-full'
                }
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Phone number is required',
              },
              pattern: {
                value: /^(\+62|62|0)8[1-9][0-9]{6,9}$/i,
                message: 'Invalid Phone Number',
              },
            }}
          />
          {errors.phoneNumber && (
            <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold w-full">
              {errors.phoneNumber.message}
            </p>
          )}
          <Controller
            name="email"
            control={control}
            render={({ field: { name, onChange, value } }) => (
              <FormInput
                type="email"
                children="Email Address"
                label="Email Address"
                name={name}
                value={value}
                onChange={onChange}
                placeholder="Enter your email address"
                className={
                  errors.email
                    ? 'border-secondary-danger focus:border-secondary-danger w-full'
                    : 'w-full'
                }
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message: 'Invalid email format',
              },
            }}
          />
          {errors.email && (
            <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold w-full">
              {errors.email.message}
            </p>
          )}
          <Button
            disabled={false}
            className="w-full"
            variant="primary"
            size="md"
            id="save"
            onClick={handleSubmit(handleSave)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Orderpopup;
