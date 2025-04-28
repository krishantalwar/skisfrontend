import React from "react";

const GrandSummaryCard = ({ title = "Summary", summary = [] }) => {
  return (
    <div className="border rounded-2xl shadow-md p-6 text-center space-y-3">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="flex justify-center flex-wrap gap-8 text-gray-700">
        {summary.map((item, idx) => (
          <div key={idx}>
            <strong>{item.label}:</strong> ₹{item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrandSummaryCard;
