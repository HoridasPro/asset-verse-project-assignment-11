import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import useAxios from "../hooks/useAxios";
// import CompanySelect from "../components/CompanySelect";
import useAxios from "../../hooks/useAxios";

const MyTeamBirthdays = () => {
  const axiosSecure = useAxios();
  const [selectedCompany, setSelectedCompany] = useState("");
  const currentMonth = new Date().getMonth();

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

  const birthdays = employees.filter(
    (e) => e.dateOfBirth && new Date(e.dateOfBirth).getMonth() === currentMonth
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">🎂 Upcoming Birthdays</h2>

      <CompanySelect
        companies={companies}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />

      <div className="mt-6">
        {birthdays.map((emp) => (
          <div key={emp._id} className="p-3 bg-base-200 rounded mb-2">
            {emp.name} — {new Date(emp.dateOfBirth).toDateString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeamBirthdays;
