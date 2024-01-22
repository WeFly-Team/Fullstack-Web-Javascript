const PaymentMethod = () => {
  return (
    <div>
      <div className="border border-neutral-06 rounded-lg p-4 flex items-center justify-between h-16 mb-4">
        <div className="flex gap-4 items-center">
          <img
            width={50}
            src="https://i.ibb.co/FqLmvmB/logo-bca.png"
            alt="logo-bca"
          />
          <p>Bank Bca</p>
        </div>
        <div>
          <input type="radio" name="payment" />
        </div>
      </div>
      <div className="border border-neutral-06 rounded-lg p-4 flex items-center justify-between h-16 mb-4">
        <div className="flex gap-4 items-center">
          <img
            width={50}
            src="https://i.ibb.co/8g6ydLs/logo-bni.png"
            alt="logo-bni"
          />
          <p>Bank Bca</p>
        </div>
        <div>
          <input type="radio" name="payment" />
        </div>
      </div>
      <div className="border border-neutral-06 rounded-lg p-4 flex items-center justify-between h-16 mb-4">
        <div className="flex gap-4 items-center">
          <img
            width={50}
            src="https://i.ibb.co/m6Pckrb/logo-bri.png"
            alt="logo-bri"
          />
          <p>Bank Bca</p>
        </div>
        <div>
          <input type="radio" name="payment" />
        </div>
      </div>
      <div className="border border-neutral-06 rounded-lg p-4 flex items-center justify-between h-16 mb-4">
        <div className="flex gap-4 items-center">
          <img
            width={50}
            src="https://i.ibb.co/ZVk3Dwn/logo-mandiri.png"
            alt="logo-mandiri"
          />
          <p>Bank Bca</p>
        </div>
        <div>
          <input type="radio" name="payment" />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
