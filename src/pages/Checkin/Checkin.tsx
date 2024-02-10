import { useState } from 'react';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import Navbar from '../FlightList/components/Navbar/Navbar';

const Checkin = () => {
  const [checkinCode, setCheckinCode] = useState<string>('');
  const [ordererLastName, setOrdererLastName] = useState<string>('');

  const handleCheckin = () => {
    console.log('checked in');
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full p-6 flex-1 flex justify-center items-center">
        <div>
          <div className="w-full shadow-card rounded-xl mx-auto p-6">
            <h1 className="font-bold text-2xl mb-4">Self Service Check In</h1>
            <FormInput
              type="text"
              name="checkin"
              id="checkin"
              label="Checkin Code"
              children="Checkin Code"
              placeholder="Check In Code"
              value={checkinCode}
              onChange={(e) => setCheckinCode(e.target.value)}
            />
            <FormInput
              type="text"
              name="orderer"
              id="checkin"
              label="Orderer's Last Name"
              children="Orderer's Last Name"
              placeholder="Orderer's Last Name"
              value={ordererLastName}
              onChange={(e) => setOrdererLastName(e.target.value)}
            />
            <Button onClick={handleCheckin}>Check In Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkin;
