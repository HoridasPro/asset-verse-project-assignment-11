import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const CompanySelect = ({ selectedCompany, setSelectedCompany }) => {
  const axiosSecure = useAxios();

  const { data: companies = [] } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/companies");
      return res.data;
    },
  });
  console.log(companies);

  return (
    <select
      value={selectedCompany}
      onChange={(e) => setSelectedCompany(e.target.value)}
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
