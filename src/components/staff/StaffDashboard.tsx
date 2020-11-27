import React from 'react';
import styled from 'styled-components';
import send from 'db/renderer';
import StyledStaffListItem from 'components/staff/StaffListItem'
import { Staff as StaffType } from 'customTypes/staff';
import { useQueryCache, useQuery } from 'react-query';

interface StaffDashboardProps {
  className?: string;
}

function useStaff() {
  return useQuery<StaffType[], Error>("staff", () => {
    return send('SELECT * FROM STAFF');
  })
}

const StaffDashboard: React.FC<StaffDashboardProps> = ( props ) => {
  const cache = useQueryCache();
  const { status, data, error, isFetching } = useStaff();
  return (
    <div className={props.className}>
      <div className={"staff_headers"}>
          <p className={"staff_name"}>Name</p>
          <p className={"staff_email"}>Email Address</p>
          <p className={"staff_phone"}>Mobile</p>
          <p className={"staff_type"}>Type</p>
          <p className={"staff_avail"}>Availability</p>
          <p className={"staff_expand"}>Expand</p>
          <p className={"staff_update"}>Update</p>
        </div>
      {data !== undefined && data.map((person) => (
        <StyledStaffListItem person={person} />
      ))}
    </div>
  );
}

export default styled(StaffDashboard)`
  padding: 25px;
  padding-right: 25px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0px rgba(49, 90, 123, 0.13);
  max-height: 100%;
  overflow: auto;

  .staff_list_item:not(:nth-child(2)) {
    margin-top: 15px;
  }

  .staff_headers {
    margin-left: 20px;
    display: flex;
    align-items: center;

    p {
      margin-bottom: 5px;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
    }
  }
  .staff_name p { font-weight: 800 !important; }
  .staff_avail p { color: white; }
  .staff_name { width: 200px; }
  .staff_email { width: 300px; }
  .staff_phone { width: 180px; }
  .staff_type { width: 140px; }
  .staff_avail { width: 200px; }
  .staff_expand, .staff_update {
    display: flex;
    justify-content: center;
    width: 80px; 
  }

  ::-webkit-scrollbar {
    width: 25px;
  }
  ::-webkit-scrollbar-thumb {
    width: 5px;
    border: 10px solid rgba(0,0,0,0);
    background-clip: padding-box;
    background-color: #E4F0F8;
    border-radius: 100px;
  }
`;