import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const MyAppointments = () => {
  const [percent, setPercent] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [user] = useAuthState(auth);
  const [dataLoading, setDataLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("fetchCalled");
      fetch(
        `https://salty-river-38714.herokuapp.com/booking?patient=${user.email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setPercent((p) => 95);
          setAppointments(data);
          setDataLoading(false);
        });
    }
  }, [user, navigate]);

  useEffect(() => {
    let id = setInterval(() => {
      setPercent((p) => {
        if (dataLoading && percent === 85) return 85;
        return p + 1;
      });
    }, 200);

    if (percent > 101) {
      clearInterval(id);
    }

    return () => clearInterval(id);
  }, [percent, dataLoading]);

  if (percent < 101) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <div class="w-4/5 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            class="bg-purple-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-lg duration-1000"
            style={{ width: `${percent}%` }}
          >
            {percent}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="my-2">My appointment {appointments.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={a._id}>
                <th>{i + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
                <td>
                  {a.price && !a.paid && (
                    <Link to={`/dashboard/payment/${a._id}`}>
                      <button className="btn btn-xs btn-error">Pay</button>
                    </Link>
                  )}
                  {a.price && a.paid && (
                    <div>
                      <p className="badge badge-success text-white">Paid</p>
                      <p>
                        Transaction id:{" "}
                        <span className="text-success">{a.transactionId}</span>
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
