export type SeatStatus = "Available" | "Booked" | "Selected";
export type SeatMap = Record<string, SeatStatus[]>;
export type BookingList = {
  name: string;
  seatAmount: number;
  seatNumber: string[];
}[];
