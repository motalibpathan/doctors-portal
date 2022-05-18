import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LoadingProgress from "../Shared/LoadingProgress";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L0gIZJBzJH4RBEm0jg4oa3Ii1UZ83YXZWxpSJiFduUHYU9o0eaXIgwSQiRF9HFCGMCKhD8gbBBfyWNcmFFMuyO1003xEYPkQ3"
);

const Payment = () => {
  const [percent, setPercent] = useState(0);

  const { id } = useParams();
  const { data: appointment, isLoading } = useQuery(["booking", id], () =>
    fetch(`https://salty-river-38714.herokuapp.com/booking/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  useEffect(() => {
    if (!isLoading && percent < 95) {
      setPercent(95);
    }
  }, [isLoading, percent]);

  return (
    <>
      {isLoading && <LoadingProgress loading={isLoading} />}
      {!isLoading && (
        <div>
          <h2 className="text-2xl my-2 text-purple-500">
            Please pay for: {id}
          </h2>
          <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
            <div class="card-body">
              <h2 class="card-title font-bold">
                Pay for {appointment?.treatment}
              </h2>
              <p className="text-success font-bold">
                Hello, {appointment?.patientName}
              </p>
              <p>
                Your appointment:{" "}
                <span className="text-orange-700">{appointment?.date}</span>
                <span>{appointment?.slot}</span>
              </p>
              <p>Please pay for: ${appointment?.price}</p>
            </div>
          </div>
          <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
            <div class="card-body">
              <Elements stripe={stripePromise}>
                <CheckoutForm appointment={appointment} />
              </Elements>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
