import { useEffect, useState } from "react";
import { bookSeats, generateSeatMap, selectSeat } from "~/helperFunctions";
import type { BookingList, SeatMap } from "~/types";

export default function BookingStart() {
  const [seatMap, setSeatMap] = useState<SeatMap>();
  const [bookingList, setBookingList] = useState<BookingList>();

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
      <header className="mt-12 text-center">
        <h1 className="text-3xl mb-2">Welcome to the cinema!</h1>
        <p>This is where your implementation will start.</p>
      </header>
      <main className="flex w-full flex-col items-center justify-center gap-4 my-20">
        {Object.entries(seatMap ? seatMap : []).map(([row, rowSeats]) => (
          <div key={row}>
            <div className="flex gap-2 justify-center items-center">
              {rowSeats.map((status, index) => (
                <button
                  key={index}
                  disabled={status === "Booked"}
                  onClick={() => {
                    const updatedSeatMap = selectSeat(row, index);
                    if (updatedSeatMap) setSeatMap(updatedSeatMap);
                  }}
                  className={`
                    size-8 rounded-b-lg
                    ${
                      status === "Available"
                        ? "bg-green-500 hover:bg-green-400"
                        : ""
                    }
                    ${
                      status === "Selected"
                        ? "bg-blue-500 hover:bg-blue-400"
                        : ""
                    }
                    ${
                      status === "Booked" ? "bg-red-600 cursor-not-allowed" : ""
                    }`}
                ></button>
              ))}
            </div>
          </div>
        ))}
        <form
          onSubmit={(e) => {
            const updatedSeatMap = bookSeats(
              e,
              (e.target as HTMLFormElement).bookingName.value || ""
            );
            if (updatedSeatMap) {
              setSeatMap(updatedSeatMap.updatedSeatMap);
              setBookingList(updatedSeatMap.bookingList);
            }
          }}
          className="flex flex-col gap-2"
        >
          <input
            type="text"
            placeholder="Name"
            name="bookingName"
            className="border border-gray-400 p-2 rounded-lg"
          />
          <button
            className="bg-blue-400 w-full font-bold text-xl text-white p-2 rounded-lg hover:bg-blue-300"
            type="submit"
          >
            Book Seats
          </button>
        </form>
      </main>
    </>
  );
}
