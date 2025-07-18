import { useEffect, useState } from "react";

type SeatStatus = "Available" | "Booked" | "Selected";
type SeatMap = Record<string, SeatStatus[]>;

function generateSeatMap(): SeatMap {
  const seatMap: SeatMap = {};
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const longRows = ["B", "E", "G"];

  for (let i = 0; i < rows.length; i++) {
    const seatCount = longRows.includes(rows[i]) ? 14 : 12;

    const seats: SeatStatus[] = Array.from(
      { length: seatCount },
      () => "Available"
    );
    seatMap[rows[i]] = seats;
  }

  return seatMap;
}

export default function BookingStart() {
  const [seatMap, setSeatMap] = useState<SeatMap>();
  useEffect(() => {
    const savedSeatMap = localStorage.getItem("seatMap");
    if (savedSeatMap) {
      console.log(JSON.parse(savedSeatMap));

      setSeatMap(JSON.parse(savedSeatMap));
    } else {
      const newSeatMap = generateSeatMap();
      localStorage.setItem("seatMap", JSON.stringify(newSeatMap));
      setSeatMap(newSeatMap);
    }
  }, []);

  return (
    <>
      <header className="mt-12 text-center">
        <h1 className="text-3xl mb-2">Welcome to the cinema!</h1>
        <p>This is where your implementation will start.</p>
      </header>
      <main className="flex w-full flex-col items-center justify-center gap-4">
        {Object.entries(seatMap ? seatMap : []).map(([row, rowSeats]) => (
          <div key={row}>
            <div className="flex gap-2 justify-center items-center">
              {rowSeats.map((status, index) => (
                <button
                  key={index}
                  disabled={status === "Booked"}
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
      </main>
    </>
  );
}
