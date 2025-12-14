import React from "react";

const CompanySelect = ({ companies, selectedCompany, setSelectedCompany }) => {
  return (
    <select
      value={selectedCompany}
      onChange={(e) => setSelectedCompany(e.target.value)}
      className="select select-bordered w-full max-w-xs"
    >
      <option value="">Select Company</option>
      {companies.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default CompanySelect;
