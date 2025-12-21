import { useState } from "react";
import CompanySelect from "./CompanySelect";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetails from "./EmployeeDetails";

const MyTeam = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Team</h1>

      <CompanySelect
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />

      <div className="flex mt-6 gap-6">
        <div className="flex-1">
          <EmployeeTable
            selectedCompany={selectedCompany}
            setSelectedEmployee={setSelectedEmployee}
          />
        </div>

        <div className="w-80">
          <EmployeeDetails selectedEmployee={selectedEmployee} />
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
