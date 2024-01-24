const ETicket = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">E-Ticket</h1>

      <div className="border border-neutral-05 mt-4 rounded-lg shadow-card">
        <div className="flex justify-between border-b border-b-neutral-06 p-6">
          <div>
            <img src="https://i.ibb.co/pznRn82/garuda-title.png" alt="logo" />
            <p className="font-semibold">Garuda Indonesia</p>
            <p className="text-sm font-semibold text-neutral-06">Economy</p>
          </div>

          <div>
            <p className="mb-4 font-semibold">Saturday, 24 June 2024</p>
            <div className="flex justify-between gap-5">
              <div className="flex flex-col justify-between">
                <p className="font-bold text-neutral-07">14.30</p>
                <p className="font-bold text-neutral-07">15.55</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="rounded-full border border-primary-blue h-4 w-4 bg-primary-blue"></div>
                <div className="border h-[80px] w-0 border-neutral-06"></div>
                <div className="rounded-full border-2 h-4 w-4 border-primary-blue bg-white"></div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-neutral-07">Jakarta (HLP)</p>
                  <p className="font-semibold text-neutral-07">
                    Halim Perdana Kusuma International Airport
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-07">
                    Surabaya (SUB)
                  </p>
                  <p className="font-semibold text-neutral-07">
                    Juanda - Terminal 1A
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3">
              <p className="text-sm font-semibold text-neutral-08">
                Booking Id
              </p>
              <p className="font-bold">773964232</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-08">
                Airline Booking Code
              </p>
              <p className="font-bold">M3SD3</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <table className="font-semibold text-neutral-08 w-full">
            <thead>
              <tr className="text-left">
                <th className="w-[10%] ">No.</th>
                <th className="w-1/2 ">Passengers</th>
                <th className="w-1/5">Route</th>
                <th className="w-[30%]">Flight Facilities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <span className="font-semibold text-sm">Mr.</span> Ahmad
                  Ghazali <span className="font-semibold text-sm">(Adult)</span>
                </td>
                <td className="text-xs">HLP - SUB</td>
                <td>Baggage 20 kg</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <span className="font-semibold text-sm">Mrs.</span> Rani
                  Ghazali <span className="font-semibold text-sm">(Adult)</span>
                </td>
                <td className="text-xs">HLP - SUB</td>
                <td>Baggage 20 kg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ETicket;
