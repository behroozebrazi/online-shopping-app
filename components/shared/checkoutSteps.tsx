import React from "react";

function CheckoutSteps({ currentStep = 0 }) {
  const orderStates = [
    "Shopping",
    "Delivery address",
    "Payment method",
    "Place order",
  ];

  return (
    <div className="flex flex-row justify-between items-center space-x-2 mb-2">
      {orderStates.map((step, index) => (
        <React.Fragment key={index}>
          {index !== 0 && (
            <hr className="w-56 border-t border-gray-300 mx-5"></hr>
          )}

          <div
            className={`w-55 p-2 rounded-full text-center text-sm ${index === currentStep ? "bg-secondary" : ""}`}
          >
            {step}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default CheckoutSteps;
