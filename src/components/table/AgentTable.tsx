// AgentTable.js
import React from 'react';

const AgentTable = ({ covernoteDetails }) => (
    <table className="w-full text-sm">
              <thead className="bg-muted">
      <tr>
        <th  className="p-2 text-left">Covernote</th>
        <th  className="p-2 text-left">Basic</th>
        <th  className="p-2 text-left">GST</th>
        <th  className="p-2 text-left">Final Amount</th>
      </tr>
    </thead>
    <tbody>
      {covernoteDetails.map((covernote, index) => (
        <tr key={index}>
          <td>{covernote.covernote}</td>
          <td>{covernote.basic}</td>
          <td>{covernote.gst}</td>
          <td>{covernote.final_amt}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AgentTable;
