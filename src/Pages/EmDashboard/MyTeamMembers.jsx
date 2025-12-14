import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import CompanySelect from "./CompanySelect";
// import useAxios from "../hooks/useAxios";
// import CompanySelect from "../components/CompanySelect";

const MyTeamMembers = () => {
  const axiosSecure = useAxios();
  const [selectedCompany, setSelectedCompany] = useState("");

  const { data: companies = [] } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/companies");
      return res.data;
    },
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees", selectedCompany],
    enabled: !!selectedCompany,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employees?companyId=${selectedCompany}`
      );
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">My Team Members</h2>

      <CompanySelect
        companies={companies}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {employees.map((emp) => (
          <div key={emp._id} className="card shadow p-4 text-center">
            <img src={emp.photo} className="w-20 h-20 rounded-full mx-auto" />
            <h3>{emp.name}</h3>
            <p>{emp.email}</p>
            <p>{emp.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeamMembers;
