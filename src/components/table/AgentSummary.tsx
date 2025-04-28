import React, { useState, useEffect } from 'react';
import AgentTable from './AgentTable'; // Assuming you have this component
import AgentNameSection from './AgentNameSection'; // Assuming you have this component

const AgentSummary = ({ apiResponse }) => {
  const [agentsData, setAgentsData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [grandBasic, setGrandBasic] = useState(0);

  // Process the API data
  useEffect(() => {
    let grandTotalAmount = 0;
    let grandBasicAmount = 0;

    const formattedData = apiResponse.map(agent => {
      let agentTotal = 0;
      let agentBasic = 0;

      const covernoteDetails = agent.covernote.map(covernote => {
        agentTotal += covernote.final_amt || 0;
        agentBasic += covernote.basic || 0;
        return {
          ...covernote,
          agentTotal,
          agentBasic,
        };
      });

      grandTotalAmount += agentTotal;
      grandBasicAmount += agentBasic;

      return {
        ...agent,
        covernoteDetails,
        agentTotal,
        agentBasic,
      };
    });

    setGrandTotal(grandTotalAmount);
    setGrandBasic(grandBasicAmount);
    setAgentsData(formattedData);
  }, [apiResponse]);

  return (
    <div>
      {agentsData.map(agent => (
        <div key={agent.id}>
          <AgentNameSection 
            agentName={agent.name} 
            agentTotal={agent.agentTotal} 
            agentBasic={agent.agentBasic} 
          />
                    <div className="border rounded-md overflow-hidden">
          <AgentTable covernoteDetails={agent.covernoteDetails} />
          </div>
        </div>
      ))}

      <div className="text-right text-lg font-bold mt-8">
        <h3>Grand Total</h3>
        <p><strong>Total Basic: </strong>{grandBasic}</p>
        <p><strong>Total Final Amount: </strong>{grandTotal}</p>
      </div>
    </div>
  );
};

export default AgentSummary;
