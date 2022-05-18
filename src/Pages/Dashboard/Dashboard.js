import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [percent, setPercent] = useState(0);
  const [admin, adminLoading] = useAdmin(user);

  useEffect(() => {
    let id;
    if (loading || adminLoading) {
      id = setInterval(() => {
        setPercent((p) => p + 1);
      }, 200);
    } else {
      id = setInterval(() => {
        setPercent((p) => {
          if (p < 95) return 95;
          return p + 1;
        });
      }, 200);
    }

    return () => clearInterval(id);
  }, [percent, loading, adminLoading]);

  if (percent < 101) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <div className="w-4/5 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-purple-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-lg duration-1000"
            style={{ width: `${percent}%` }}
          >
            {percent}%
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-sidebar"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <h2 className="text-3xl font-bold text-purple-500 ">
            Welcome to your Dashboard
          </h2>
          <Outlet />
          {/* <!-- Page content here --> */}
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link to="/dashboard">My Appointments</Link>
            </li>
            <li>
              <Link to="/dashboard/review">My Review</Link>
            </li>
            <li>
              <Link to="/dashboard/history">My History</Link>
            </li>
            {admin && (
              <>
                <li>
                  <Link to="/dashboard/users">All Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/addDoctor">Add a Doctor</Link>
                </li>
                <li>
                  <Link to="/dashboard/manageDoctor">Manage Doctor</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
