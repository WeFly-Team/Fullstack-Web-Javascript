const Filter = () => {
  return (
    <>
      <div className="w-[430px] h-[1060px] bg-white mb-8 rounded-xl">
        <div className="flex w-full mb-2">
          <div className="p-5">
            <p className="font-semibold">Filter:</p>
          </div>
          <div className="grow"></div>
          <div>
            <button type="reset" className="text-blue-500 p-4">
              Reset
            </button>
          </div>
        </div>

        <div className="border-b border-t border-b-black border-t-black pt-4 pb-4">
          <div className="flex w-full">
            <div className="ml-10">
              <p className="font-normal">No. of Transit</p>
            </div>
            <div className="grow"></div>
            <div className="mr-10">
              <button>^</button>
            </div>
          </div>

          <div className="pt-1">
            <div className="ml-10">
              <input
                type="checkbox"
                name="interest"
                id="direct"
                value="direct"
              />
              <label htmlFor="direct">Direct</label>
            </div>
            <div className="ml-10">
              <input type="checkbox" name="interest" id="oneTransit" value="" />
              <label htmlFor="oneTransit">1 transit(s)</label>
            </div>
          </div>
        </div>

        <div className="border-b border-b-black pt-4 pb-4">
          <div className="flex w-full">
            <div className="ml-10">
              <p className="font-normal">Airline</p>
            </div>
            <div className="grow"></div>
            <div className="mr-10">
              <button>^</button>
            </div>
          </div>

          <div className="pt-1">
            <div className="ml-10">
              <input type="checkbox" name="airline" id="airAsia" value="" />
              <label htmlFor="airAsia">AirAsia</label>
            </div>
            <div className="ml-10">
              <input type="checkbox" name="airline" id="batikAir" value="" />
              <label htmlFor="batikAir">Batik Air</label>
            </div>
            <div className="ml-10">
              <input type="checkbox" name="airline" id="citilink" value="" />
              <label htmlFor="citilink">Citilink</label>
            </div>
            <div className="ml-10">
              <input
                type="checkbox"
                name="airline"
                id="garudaIndonesia"
                value=""
              />
              <label htmlFor="garudaIndonesia">Garuda Indonesia</label>
            </div>
            <div className="ml-10">
              <input type="checkbox" name="airline" id="lionAir" value="" />
              <label htmlFor="lionAir">Lion Air</label>
            </div>
            <div className="ml-10">
              <input type="checkbox" name="airline" id="pelitaAir" value="" />
              <label htmlFor="pelitaAir">Pelita Air</label>
            </div>
            <div className="ml-10">
              <input type="checkbox" name="airline" id="superAirJet" value="" />
              <label htmlFor="superAirJet">Super Air Jet</label>
            </div>
            <div className="ml-10">
              <input type="checkbox" name="airline" id="transNusa" value="" />
              <label htmlFor="transNusa">TransNusa</label>
            </div>
          </div>
        </div>

        <div className="border-b border-b-black pt-4 pb-4">
          <div className="flex w-full">
            <div className="ml-10">
              <p className="font-normal">Time</p>
            </div>
            <div className="grow"></div>
            <div className="mr-10">
              <button>^</button>
            </div>
          </div>

          <div className="flex w-full mt-3 mb-3">
            <p className="font-normal ml-10">Departure Time</p>
          </div>

          <div className="pt-1 flex items-center justify-center gap-4 mb-1">
            <button
              type="button"
              className="border border-black rounded-xl px-9 py-2 text-xs"
            >
              Noon to Morning <br />
              00:00 - 06:00
            </button>
            <button
              type="button"
              className="border border-black rounded-xl px-9 py-2 text-xs"
            >
              Morning to Noon <br />
              06:00 - 12:00
            </button>
          </div>
          <div className="pt-1 flex items-center justify-center gap-4">
            <button
              type="button"
              className="border border-black rounded-xl px-[38px] py-2 text-xs"
            >
              Noon to Evening <br />
              12:00 - 18:00
            </button>
            <button
              type="button"
              className="border border-black rounded-xl px-[38px] py-2 text-xs"
            >
              Evening to Night <br />
              18:00 - 24:00
            </button>
          </div>

          <div className="flex w-full mt-3 mb-3">
            <p className="font-normal ml-10">Arrival Time</p>
          </div>

          <div className="pt-1 flex items-center justify-center gap-4 mb-1">
            <button
              type="button"
              className="border border-black rounded-xl px-9 py-2 text-xs"
            >
              Noon to Morning <br />
              00:00 - 06:00
            </button>
            <button
              type="button"
              className="border border-black rounded-xl px-9 py-2 text-xs"
            >
              Morning to Noon <br />
              06:00 - 12:00
            </button>
          </div>
          <div className="pt-1 flex items-center justify-center gap-4">
            <button
              type="button"
              className="border border-black rounded-xl px-[38px] py-2 text-xs"
            >
              Noon to Evening <br />
              12:00 - 18:00
            </button>
            <button
              type="button"
              className="border border-black rounded-xl px-[38px] py-2 text-xs"
            >
              Evening to Night <br />
              18:00 - 24:00
            </button>
          </div>

          <div className="flex w-full mt-3 mb-8">
            <p className="font-normal ml-10">Flight Duration</p>
          </div>
        </div>

        <div className="pt-4 pb-4">
          <div className="flex w-full">
            <div className="ml-10">
              <p className="font-normal">Facilities</p>
            </div>
            <div className="grow"></div>
            <div className="mr-10">
              <button>^</button>
            </div>
          </div>

          <div className="pt-1">
            <div className="ml-10">
              <input type="checkbox" name="facilities" id="baggage" value="" />
              <label htmlFor="baggage">Baggage</label>
            </div>
            <div className="ml-10">
              <input
                type="checkbox"
                name="facilities"
                id="inFlightMeal"
                value=""
              />
              <label htmlFor="inFlightMeal">In-Flight Meal</label>
            </div>
            <div className="ml-10">
              <input
                type="checkbox"
                name="facilities"
                id="inFlightEntertainment"
                value=""
              />
              <label htmlFor="inFlightEntertainment">
                In-Flight Entertainment
              </label>
            </div>
            <div className="ml-10">
              <input type="checkbox" name="facilities" id="wifi" value="" />
              <label htmlFor="wifi">Wifi</label>
            </div>
            <div className="ml-10">
              <input type="checkbox" name="facilities" id="powerUSB" value="" />
              <label htmlFor="powerUSB">Power / USB Port</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
