import React, { useMemo } from "react";
import GenericReportSection from "./GenericReportSection";
import GrandSummaryCard from "./GrandSummaryCard";

const AgentCovernoteReport = ({ data = [] }) => {
  const columns = [
    { label: "Covernote No", accessor: "covernote" },
    { label: "Basic", accessor: "basic" },
    { label: "GST", accessor: "gst" },
    { label: "Final Amount", accessor: "final_amt" },
  ];

  const { agents, grandSummary } = useMemo(() => {
    let totalBasic = 0;
    let totalFinal = 0;

    const formattedAgents = data.map(agent => {
      let agentBasic = 0;
      let agentFinal = 0;

      const covernotes = (agent.covernote || []).map(cn => {
        agentBasic += cn.basic || 0;
        agentFinal += cn.final_amt || 0;
        return cn;
      });

      totalBasic += agentBasic;
      totalFinal += agentFinal;

      return {
        id: agent.id,
        name: agent.name,
        rows: covernotes,
        summary: [
          { label: "Total Basic", value: agentBasic },
          { label: "Total Final", value: agentFinal },
        ],
      };
    });

    const grandSummary = [
      { label: "Grand Basic", value: totalBasic },
      { label: "Grand Final", value: totalFinal },
    ];
    return {
      agents: formattedAgents,
      grandSummary:grandSummary
    };
  }, [data]);

  return (
    <div className="space-y-8">
      {agents.map(agent => (
        <GenericReportSection
          key={agent.id}
          title={agent.name}
          summary={agent.summary}
          columns={columns}
          rows={agent.rows}
        />
      ))}

      <GrandSummaryCard summary={grandSummary} />
    </div>
  );
};

export default AgentCovernoteReport;


// import React, { useRef } from "react";
// import GenericTable from "./GenericTable"; // your table component

// const AgentCovernoteReport = ({ data = [] }) => {
//   const columns = [
//     { label: "Covernote No", accessor: "covernote" },
//     { label: "Basic", accessor: "basic" },
//     { label: "GST", accessor: "gst" },
//     { label: "Final Amount", accessor: "final_amt" },
//   ];

//   // useRef for Grand Totals (because React won't re-render on ref changes)
//   const grandBasic = useRef(0);
//   const grandFinal = useRef(0);

//   return (
//     <div className="space-y-8">
//       {data.map(agent => {
//         let agentBasic = 0;
//         let agentFinal = 0;

//         const covernotes = agent.covernote || [];

//         return (
//           <div key={agent.id} className="space-y-4">
//             <h2 className="text-lg font-semibold">{agent.name}</h2>

//             <GenericTable columns={columns} rows={covernotes} />

//             {/* Calculate agent totals */}
//             {covernotes.forEach(cn => {
//               agentBasic += cn.basic || 0;
//               agentFinal += cn.final_amt || 0;
//             })}

//             {/* Add to Grand Totals */}
//             {(() => {
//               grandBasic.current += agentBasic;
//               grandFinal.current += agentFinal;
//             })()}

//             {/* Show agent total */}
//             <div className="flex gap-4 text-sm font-medium">
//               <div>Total Basic: ₹{agentBasic}</div>
//               <div>Total Final: ₹{agentFinal}</div>
//             </div>

//             <hr />
//           </div>
//         );
//       })}

//       {/* Finally show Grand total */}
//       <div className="flex gap-6 text-lg font-bold mt-8">
//         <div>Grand Basic: ₹{grandBasic.current}</div>
//         <div>Grand Final: ₹{grandFinal.current}</div>
//       </div>
//     </div>
//   );
// };

// export default AgentCovernoteReport;
