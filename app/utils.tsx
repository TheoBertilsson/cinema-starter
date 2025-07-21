import type { BookingList, SeatMap, SeatStatus } from "./types";

export function selectSeat(
  row: string,
  seatIdx: number,
  seatAmount: number,
  setMessage: (newMessage: string) => void,
  setSeatMap: (seatMap: SeatMap) => void
) {
  const seatMap: SeatMap = JSON.parse(localStorage.getItem("seatMap") || "");
  if (!seatMap) return;

  if (seatMap[row][seatIdx] === "Booked") {
    setMessage("Cannot select booked seat!");
    return;
  }
  const updatedSeatMap = seatMap;

  if (seatIdx + seatAmount > updatedSeatMap[row].length) {
    setMessage("Not enough seats to the right!");
    return;
  }

  if (updatedSeatMap[row][seatIdx] === "Selected") {
    for (const r in updatedSeatMap) {
      updatedSeatMap[r] = updatedSeatMap[r].map((status) =>
        status === "Selected" ? "Available" : status
      );
    }
    localStorage.setItem("seatMap", JSON.stringify(updatedSeatMap));
    return updatedSeatMap;
  }

  for (const r in updatedSeatMap) {
    updatedSeatMap[r] = updatedSeatMap[r].map((status) =>
      status === "Selected" ? "Available" : status
    );
  }

  const group = updatedSeatMap[row].slice(seatIdx, seatIdx + seatAmount);
  const hasBooked = group.some((status) => status === "Booked");
  if (hasBooked) {
    setMessage("One or more seats in the group are already booked!");
    return;
  }

  for (let i = 0; i < seatAmount; i++) {
    updatedSeatMap[row][seatIdx + i] = "Selected";
  }

  localStorage.setItem("seatMap", JSON.stringify(updatedSeatMap));
  setSeatMap(updatedSeatMap);
}

export async function bookSeats(
  name: string
): Promise<{ updatedSeatMap: SeatMap; bookingList: BookingList }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const seatMap: SeatMap = JSON.parse(
        localStorage.getItem("seatMap") || ""
      );
      if (!seatMap)
        return reject(new Error("Something went wrong. Try again!"));

      const localBookingList = localStorage.getItem("bookingList");
      const bookedSeat: string[] = [];
      let amountOfSeats = 0;

      const bookingList: BookingList = localBookingList
        ? JSON.parse(localBookingList)
        : [];

      if (!name) {
        return reject(new Error("Name is needed to book"));
      }

      const hasSelectedSeats = Object.values(seatMap).some((row) =>
        row.includes("Selected")
      );

      if (!hasSelectedSeats) {
        return reject(new Error("Select seats before booking"));
      }

      const updatedSeatMap = seatMap;

      for (const row in updatedSeatMap) {
        updatedSeatMap[row] = updatedSeatMap[row].map((status, index) => {
          if (status === "Selected") {
            bookedSeat.push(row + (index + 1));
            amountOfSeats++;
            return "Booked";
          } else return status;
        });
      }
      bookingList.push({
        name: name,
        seatAmount: amountOfSeats,
        seatNumber: bookedSeat.map((seat) => seat + ", "),
      });
      localStorage.setItem("bookingList", JSON.stringify(bookingList));
      localStorage.setItem("seatMap", JSON.stringify(updatedSeatMap));
      resolve({ updatedSeatMap, bookingList });
    }, 500);
  });
}

export function generateSeatMap(): SeatMap {
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

export function getSeatClass(
  status: SeatStatus,
  row: string,
  index: number,
  seatAmount: number,
  hoveredRow: string | null,
  hoveredSeat: number | null
): string {
  const baseClass = "size-3 sm:size-4 md:size-8 rounded-b-lg";

  const hoverSeat =
    row === hoveredRow &&
    hoveredSeat !== null &&
    index >= hoveredSeat &&
    index < hoveredSeat + seatAmount;

  if (status === "Booked") return `${baseClass} bg-red-600 cursor-not-allowed`;
  if (status === "Selected")
    return `${baseClass} bg-blue-500 border-2 border-gray-400`;
  if (hoverSeat) return `${baseClass} bg-green-400 border-2 border-gray-400`;

  return `${baseClass} bg-green-500`;
}
