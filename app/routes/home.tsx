import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Cinema bookings" },
    { name: "description", content: "Welcome to the cinema booking application" },
  ];
}

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div className="pt-24 prose">
          <h1 className="text-[48px] text-center">Welcome to the Cinema Test!</h1>
          <p>
            This is a starting point for you to demonstrate your coding skills by building a cinema booking application.
          </p>

          <h3>Objective</h3>
          <p>
            Build a web-based application for booking cinema seats using <strong>React</strong>.
            The app should allow users to view available and booked seats, select seats, and confirm bookings.
            Users can also book multiple seats at once, and the system should allocate them <em>adjacently</em> in the same row if possible.
          </p>

          <h3>Requirements</h3>
          <ul>
            <li><strong>Seating Layout</strong>: Rows A–H, 12 seats per row, with the exceotion of row B, E and  G which has 14 rows</li>
            <li><strong>Seat Display</strong>: Green = available, Red = booked, Blue = selected</li>
            <li><strong>Select Seats Manually</strong>: Click to select/deselect, cannot select booked seats</li>
            <li><strong>Group Booking</strong>: Input seat count (2–6), auto-select adjacent seats or show a message</li>
            <li><strong>Booking Confirmation</strong>: Async operation, updates UI and persists selection</li>
            <li><strong>Persistence</strong>: When refreshing the browser the bookings should persist</li>
            <li><strong>List of bookings</strong>: All bookings, seats and name, should be displayed next to the other UI at all times</li>
          </ul>

          <h3>User Stories</h3>
          <h4>Booking one seat</h4>
          <ol>
            <li>Open the app</li>
            <li>Select how many seats you would like to book and your name, select 1 seat</li>
            <li>Click on an available seat to select it</li>
            <li>Click "Book Seat" to confirm the booking</li>
            <li>Receive a confirmation message, and the application restarts</li>
            <li>The new booking should be added to the list of bookings</li>
          </ol>

          <h4>Booking multiple seats</h4>
          <ol>
            <li>Open the app</li>
            <li>Select how many seats you would like to book and your name. Select {">"} 1 seats</li>
            <li>Hovering seats will change the color of the hovered seats and X seats next to it, depending on how many seats you want to book.</li>
            <li>Click on an available seat to select it</li>
            <li>All seats that will be booked shall be highlighted</li>
            <li>Click "Book Seats" to confirm the booking</li>
            <li>Receive a confirmation message, and the application restarts</li>
            <li>The new booking should be added to the list of bookings</li>
          </ol>

          <h4>Bonus Features (Optional)</h4>
          <ul>
            <li>Display total price based on selected seats</li>
            <li>Suggest best seats</li>
            <li>Mobile-friendly layout</li>
            <li>Book scattered seats if adjacent seats are not available</li>
          </ul>

          <h3>Technical Constraints</h3>
          <ul>
            <li>No backend required</li>
            <li>App state can be stored in local storage</li>
            <li>Tailwind is installed, usage is optional</li>
            <li>Feel free to setup as many routes as you wish</li>
            <li>You can also divide your code into the structure you want</li>
            <li>You may install external npm packages for UI, icons etc. But you shall write the core logic yourself.</li>
          </ul>
          <hr />

        </div>
      </div>
      <div className="mb-24 text-center mt-18">
        <Link to="/cinema" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-colors text-xl">
          To the cinema booking
        </Link>
      </div>
    </>
  );
}
