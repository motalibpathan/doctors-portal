import React from "react";
import { toast } from "react-toastify";

const DeleteModal = ({ setLoading, refetch, doctor, setSelectedDoctor }) => {
  const { name, email } = doctor;

  const handleDelete = (email) => {
    setLoading(true);
    fetch(`https://salty-river-38714.herokuapp.com/doctor/${email}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success(`Doctor: ${name} is deleted `);
          refetch();
          setLoading(false);
          setSelectedDoctor(null);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="delete-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            onClick={() => setSelectedDoctor(null)}
            htmlFor="delete-modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg text-red-500">Confirm Delete</h3>
          <p class="py-4">
            Are you sure want to delete
            <span className="text-secondary font-bold"> Dr. {name}</span> ?
          </p>
          <div class="modal-action">
            <label
              onClick={() => handleDelete(email)}
              for="delete-modal"
              class="btn btn-secondary text-white"
            >
              Delete
            </label>
            <label
              onClick={() => setSelectedDoctor(null)}
              htmlFor="delete-modal"
              class="btn btn-error text-white"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
