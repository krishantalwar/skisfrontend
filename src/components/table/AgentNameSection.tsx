// AgentNameSection.js
import React from 'react';

const AgentNameSection = ({ agentName, agentTotal, agentBasic }) => (
    <div className="bg-green-700 text-white font-bold">
    <h3>{agentName}</h3>
    <p className="p-2"><strong>Agent Total: </strong>{agentTotal}</p>
    <p className="p-2"><strong>Agent Basic Total: </strong>{agentBasic}</p>
  </div>
);

export default AgentNameSection;
