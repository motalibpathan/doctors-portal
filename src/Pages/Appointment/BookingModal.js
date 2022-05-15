import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const BookingModal = ({ treatment, date, setTreatment }) => {
  const { _id, name, slots } = treatment;
  const [user, loading, error] = useAuthState(auth);
  const formattedDate = format(date, "PP");

  const handleBooking = (e) => {
    e.preventDefault();
    const slot = e.target.slot.value;
    const phone = e.target.phone.value;
    // console.log(_id, name, slot);
    const booking = {
      treatmentId: _id,
      treatment: name,
      date: formattedDate,
      slot,
      patient: user.email,
      patientName: user.displayName,
      phone,
    };
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(`Appointment is set, ${formattedDate} at ${slot}`);
        } else {
          toast.error(
            `You already have an appointment! on ${data.booking?.date} at ${data.booking?.slot}`
          );
        }
        console.log(data);
        // to close data
        setTreatment(null);
      });
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            for="booking-modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg">Booking for: {name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 justify-items-center gap-3 mt-4"
          >
            <input
              type="text"
              disabled
              value={format(date, "PP")}
              class="input input-bordered w-full max-w-xs"
            />
            <select name="slot" class="select select-bordered w-full max-w-xs">
              {slots.map((slot) => (
                <option value={slot}>{slot}</option>
              ))}
            </select>
            <input
              type="text"
              value={user?.displayName}
              disabled
              name="name"
              class="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              value={user?.email}
              disabled
              name="email"
              class="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Phone number"
              name="phone"
              class="input input-bordered w-full max-w-xs"
              required
            />
            <input
              type="submit"
              value="Submit"
              class="btn btn-secondary w-full max-w-xs text-white"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
