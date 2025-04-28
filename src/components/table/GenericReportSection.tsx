import React from "react";
import GenericTable from "./GenericTable";

const GenericReportSection = ({
  title,
  summary = [],
  columns = [],
  rows = [],
}) => {
  return (
    <div className="border rounded-2xl shadow-sm p-6 space-y-4">
      {/* Title */}
      {title && (
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-bold">{title}</h2>
       
        </div>
      )}

      {/* Table */}
      <GenericTable columns={columns} rows={rows} />

      {summary.length > 0 && (
            <div className="flex gap-6 flex-wrap text-sm text-gray-700">
              {summary.map((item, idx) => (
                <div key={idx}>
                  <strong>{item.label}:</strong> ₹{item.value}
                </div>
              ))}
            </div>
          )}
<div className="flex gap-4 text-sm font-medium">
               <div>Total Basic: ₹</div>
               <div>Total Final: ₹</div>
             </div>

    </div>
  );
};

export default GenericReportSection;
