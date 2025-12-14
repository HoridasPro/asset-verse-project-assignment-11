import React from "react";
import CompanySelect from "./CompanySelect";
import MyTeamMembers from "./MyTeamMembers";
import MyTeamBirthdays from "./MyTeamBirthDays";

const MyTeam = () => {
  return (
    <div>
      <h1>this is my team</h1>
      <CompanySelect />
      <MyTeamMembers />
      <MyTeamBirthdays />
    </div>
  );
};

export default MyTeam;
