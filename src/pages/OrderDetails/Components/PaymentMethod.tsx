import { PaymentMethodProps } from './types';

const PaymentMethod = ({
  banks,
  selectedBank,
  setSelectedBank,
}: PaymentMethodProps) => {
  return (
    <div>
      {banks &&
        banks.map((bank, index) => (
          <div
            className="border border-neutral-06 rounded-lg p-4 flex items-center justify-between h-16 mb-4"
            key={index}
          >
            <div className="flex gap-4 items-center">
              <img width={50} src={bank.img} alt={bank.alt} />
              <p>{bank.label}</p>
            </div>
            <div>
              <input
                type="radio"
                name="payment"
                value={selectedBank.label}
                checked={selectedBank.label === bank.label}
                onChange={() => {
                  setSelectedBank(bank);
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default PaymentMethod;
