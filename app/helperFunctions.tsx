import type { FormEvent } from "react";
import type { BookingList, SeatMap, SeatStatus } from "./types";

export function selectSeat(row: string, seatIdx: number) {
  const seatMap: SeatMap = JSON.parse(localStorage.getItem("seatMap") || "");
  if (!seatMap) return;
  if (seatMap[row][seatIdx] === "Booked") {
    alert("Cannot select booked seat!");
    return;
  }
  const updatedSeatMap = structuredClone(seatMap);
  if (updatedSeatMap[row][seatIdx] === "Selected") {
    updatedSeatMap[row][seatIdx] = "Available";
  } else {
    for (const row in updatedSeatMap) {
      updatedSeatMap[row] = updatedSeatMap[row].map((status) =>
        status === "Selected" ? "Available" : status
      );
    }

    if (updatedSeatMap[row][seatIdx] === "Available") {
      updatedSeatMap[row][seatIdx] = "Selected";
    }
  }
  localStorage.setItem("seatMap", JSON.stringify(updatedSeatMap));
  return updatedSeatMap;
}

export function bookSeats(event: FormEvent, name: string) {
  event.preventDefault();
  const seatMap: SeatMap = JSON.parse(localStorage.getItem("seatMap") || "");
  const localBookingList = localStorage.getItem("bookingList");

  if (!seatMap) return;

  const bookingList: BookingList = localBookingList
    ? JSON.parse(localBookingList)
    : [];
  const bookedSeat: string[] = [];
  let amountOfSeats = 0;

  if (!name) {
    alert("Input name");
    return;
  }

  const hasSelectedSeats = Object.values(seatMap).some((row) =>
    row.includes("Selected")
  );

  if (!hasSelectedSeats) {
    alert("Select seats before booking");
    return;
  }

  const updatedSeatMap = structuredClone(seatMap);

  for (const row in updatedSeatMap) {
    updatedSeatMap[row] = updatedSeatMap[row].map((status, index) => {
      if (status === "Selected") {
        bookedSeat.push(row + (index + 1));
        amountOfSeats++;
        console.log(bookedSeat, amountOfSeats);
        return "Booked";
      } else return status;
    });
  }
  bookingList.push({
    name: name,
    seatAmount: amountOfSeats,
    seatNumber: bookedSeat,
  });
  localStorage.setItem("bookingList", JSON.stringify(bookingList));
  localStorage.setItem("seatMap", JSON.stringify(updatedSeatMap));
  return { updatedSeatMap, bookingList };
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
