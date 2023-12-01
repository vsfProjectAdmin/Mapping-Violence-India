import React from "react";

const SuccessModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-green-500">
          Form submitted successfully! Thank you for your report.
        </p>
        <button
          className="mt-4 bg-secondary text-white p-2 rounded-md hover:bg-yellow-800"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
