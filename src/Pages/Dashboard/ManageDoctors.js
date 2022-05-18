import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import DeleteModal from "./DeleteModal";
import DoctorRow from "./DoctorRow";

const ManageDoctors = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("doctors", () =>
    fetch(`https://salty-river-38714.herokuapp.com/doctor`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h2 className="text-2xl my-3">Manage Doctors {doctors?.length}</h2>
        <div class="overflow-x-auto">
          <table class="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {doctors?.map((doctor, i) => (
                <DoctorRow
                  setSelectedDoctor={setSelectedDoctor}
                  key={doctor._id}
                  doctor={doctor}
                  index={i}
                />
              ))}
            </tbody>
          </table>
        </div>
        {selectedDoctor && (
          <DeleteModal
            doctor={selectedDoctor}
            refetch={refetch}
            setLoading={setLoading}
            setSelectedDoctor={setSelectedDoctor}
          />
        )}
      </div>
    </>
  );
};

export default ManageDoctors;
