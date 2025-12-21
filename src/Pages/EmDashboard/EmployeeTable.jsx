import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const EmployeeTable = ({ selectedCompany, setSelectedEmployee }) => {
  const axiosSecure = useAxios();

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees`);
      return res.data;
    },
  });

  console.log(employees);

  if (!selectedCompany) {
    return <p className="text-gray-500">Please select a company</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Employees</h2>

      {employees.length === 0 && (
        <p className="text-gray-500">No employees found for this company</p>
      )}

      <div className="space-y-2">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="card p-4 shadow cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmployee(emp)}
          >
            <div className="flex items-center gap-4">
              <img
                src={emp.photo}
                alt={emp.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{emp.name}</h3>
                <p className="text-sm text-gray-500">{emp.email}</p>
                <p className="text-sm text-gray-500">{emp.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;
