import { useEffect, useState } from "react";
import Dialog from "~/components/dialog";
import { bookSeats, generateSeatMap, getSeatClass, selectSeat } from "~/utils";
import type { BookingList, SeatMap } from "~/types";

export default function BookingStart() {
  const [seatMap, setSeatMap] = useState<SeatMap>();
  const [bookingList, setBookingList] = useState<BookingList>();
  const [bookingName, setBookingName] = useState("");
  const [seatAmount, setSeatAmount] = useState(1);
  const [hoveredRow, setHovoredRow] = useState<string | null>(null);
  const [hoveredSeat, setHovoredSeat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const ticketPrice =
    200 *
    Object.values(seatMap || []).reduce((total, row) => {
      return total + row.filter((status) => status === "Selected").length;
    }, 0);

  useEffect(() => {
    const savedSeatMap = localStorage.getItem("seatMap");
    const savedBookingList = localStorage.getItem("bookingList");
    if (savedSeatMap) {
      setSeatMap(JSON.parse(savedSeatMap));
    } else {
      const newSeatMap = generateSeatMap();
      localStorage.setItem("seatMap", JSON.stringify(newSeatMap));
      setSeatMap(newSeatMap);
    }
    if (!savedBookingList) return;
    setBookingList(JSON.parse(savedBookingList));
  }, []);

  return (
    <>
      <header className="mt-12 text-center mb-5">
        <h1 className="text-xl md:text-3xl mb-3">Welcome to the cinema!</h1>
        <p>This is where your implementation will start.</p>
      </header>
      <main className="flex w-full flex-col items-center justify-center gap-4 mb-5">
        <article className="flex w-full flex-col items-center justify-center gap-4">
          {Object.entries(seatMap ? seatMap : []).map(([row, rowSeats]) => (
            <div key={row}>
              <div className="flex gap-2 justify-center items-center">
                {rowSeats.map((status, index) => (
                  <button
                    key={index}
                    disabled={status === "Booked"}
                    onClick={() => {
                      const updatedSeatMap = selectSeat(
                        row,
                        index,
                        seatAmount,
                        setMessage
                      );
                      if (updatedSeatMap) setSeatMap(updatedSeatMap);
                    }}
                    onMouseEnter={() => {
                      setHovoredRow(row);
                      setHovoredSeat(index);
                    }}
                    onMouseLeave={() => {
                      setHovoredRow(null);
                      setHovoredSeat(null);
                    }}
                    className={getSeatClass(
                      status,
                      row,
                      index,
                      seatAmount,
                      hoveredRow,
                      hoveredSeat
                    )}
                  ></button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-4 md:flex-row justify-evenly items-center md:w-full flex-col p-4">
            <div className="flex flex-col gap-2 justify-center items-center min-w-1/4 font-bold">
              <p>Tickets:</p>

              <div className="flex bg-gray-200 rounded-2xl gap-4 justify-between items-center h-8 w-fit">
                <button
                  onClick={() => {
                    if (seatAmount > 1) setSeatAmount(seatAmount - 1);
                  }}
                  className="size-8 flex justify-center items-center rounded-l-full hover:bg-gray-500"
                >
                  -
                </button>
                <div className="size-8 flex justify-center items-center">
                  {seatAmount}
                </div>
                <button
                  onClick={() => {
                    if (seatAmount < 6) setSeatAmount(seatAmount + 1);
                  }}
                  className="size-8 flex justify-center items-center rounded-r-full hover:bg-gray-500"
                >
                  +
                </button>
              </div>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const result = await bookSeats(bookingName);
                  setSeatMap(result.updatedSeatMap);
                  setBookingList(result.bookingList);
                  setMessage("Booking successful!");
                } catch (error: any) {
                  setMessage(error.message);
                }
              }}
              className="flex flex-col gap-2 md:min-w-1/4"
            >
              <input
                type="text"
                placeholder="Name"
                name="bookingName"
                value={bookingName}
                onChange={(event) => {
                  setBookingName(event.target.value);
                }}
                className="border border-gray-400 p-2 rounded-lg"
              />
              <button
                className="bg-blue-400 w-full font-bold text-xl text-white p-2 rounded-lg hover:bg-blue-300 cursor-pointer drop-shadow-sm drop-shadow-gray-500 active:drop-shadow-none"
                type="submit"
              >
                Book Seats
              </button>
            </form>
            <div className="min-w-1/4 flex justify-center items-center">
              <p className=" text-lg font-bold">{ticketPrice} SEK</p>
            </div>
          </div>
        </article>
        {bookingList && (
          <section className="flex flex-col md:flex-row p-5 border-2 rounded-lg border-gray-500 gap-4 max-w-[37.5rem]  overflow-auto">
            {bookingList?.map((booking, index) => (
              <div
                className=" flex flex-col gap-2 border-b md:border-r md:border-b-0 border-gray-600 p-5 min-w-[14rem] min-h-[7rem]"
                key={index}
              >
                <p>Name:{booking.name}</p>
                <p>Amount of tickets: {booking.seatAmount}</p>
                <p>Seats: {booking.seatNumber.map((seat) => seat)}</p>
              </div>
            ))}
          </section>
        )}
        {message && (
          <Dialog
            message={message}
            setMessage={setMessage}
            setBookingName={setBookingName}
            setSeatAmount={setSeatAmount}
          />
        )}
      </main>
    </>
  );
}
