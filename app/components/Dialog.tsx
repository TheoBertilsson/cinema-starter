export default function Dialog({
  message,
  setMessage,
  setBookingName,
  setSeatAmount,
}: {
  message: string;
  setMessage: (newMessage: string) => void;
  setBookingName: (newName: string) => void;
  setSeatAmount: (seatamount: number) => void;
}) {
  return (
    <div className=" absolute top-0 left-0 bg-[#000000b2] w-dvw h-dvh z-50 flex justify-center items-center">
      <div className="w-full max-w-[22.5rem] mx-10 h-1/5 bg-neutral-200 rounded-lg flex flex-col gap-5 justify-center items-center">
        <p className="sm:text-lg md:text-xl font-bold text-center px-5">
          {message}
        </p>
        <button
          className="py-2 px-5 bg-blue-400 hover:bg-blue-300 text-white rounded-lg cursor-pointer drop-shadow-sm drop-shadow-gray-500 active:drop-shadow-none"
          onClick={() => {
            if (message === "Booking successful!") {
              setBookingName("");
              setSeatAmount(1);
            }
            setMessage("");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
