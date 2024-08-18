import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CampaignTable({ campaigns, columns , name }) {
  return (
    <div>
      <div className="app-content-header mt-5 p-4">
        <h1 className="app-content-headerText mainTextColor">{name}</h1>
      </div>
      <table className="table table-striped mainTextColor">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              {columns.map((column) => (
                <td key={column}>{campaign[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CampaignTable;