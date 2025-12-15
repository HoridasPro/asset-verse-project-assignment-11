 const EmployeeDetails = ({ selectedEmployee }) => {
  if (!selectedEmployee) {
    return (
      <p className="text-gray-500">
        Click an employee to see details & birthday
      </p>
    );
  }

  const currentMonth = new Date().getMonth();
  const birthdayThisMonth =
    selectedEmployee.dateOfBirth &&
    new Date(selectedEmployee.dateOfBirth).getMonth() === currentMonth;

  return (
    <div className="space-y-4">
      <div className="card p-4 shadow text-center">
        <img
          src={selectedEmployee.photo}
          alt={selectedEmployee.name}
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <h2 className="font-bold text-lg">{selectedEmployee.name}</h2>
        <p className="text-gray-500">{selectedEmployee.email}</p>
        <p className="text-gray-500">{selectedEmployee.position}</p>
      </div>

      <div className="card p-4 shadow">
        <h3 className="font-semibold mb-2">🎂 Birthday This Month</h3>
        {birthdayThisMonth ? (
          <p>{new Date(selectedEmployee.dateOfBirth).toLocaleDateString()}</p>
        ) : (
          <p className="text-gray-500">No birthday this month 🎈</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
