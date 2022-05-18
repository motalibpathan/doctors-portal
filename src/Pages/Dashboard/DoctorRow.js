import React from "react";

const DoctorRow = ({ doctor, index, setSelectedDoctor }) => {
  const { img, name, specialty } = doctor;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div class="avatar">
          <div class="w-8 rounded">
            <img src={img} alt="" />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{specialty}</td>
      <td>
        <label
          onClick={() => setSelectedDoctor(doctor)}
          htmlFor="delete-modal"
          class="btn btn-xs btn-error text-white"
        >
          Delete
        </label>
      </td>
    </tr>
  );
};

export default DoctorRow;
