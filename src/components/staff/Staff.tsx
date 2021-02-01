import React, { useState } from 'react';
import styled from 'styled-components';
import StyledStaffDashboard from 'components/staff/StaffDashboard'
import StaffDashboardFilters from 'components/staff/StaffDashboardFilters';
import { AvailType } from 'customTypes/availability';

interface StaffProps {
  className?: string;
}

const Staff: React.FC<StaffProps> = ( props ) => {
  const [nameSearch, setNameSearch] = useState<string>("");
  const [emailSearch, setEmailSearch] = useState<string>("");
  const [phoneSearch, setPhoneSearch] = useState<string>("");
  const [typeSearch, setTypeSearch] = useState<string>("");
  const [availSearch, setAvailSearch] = useState<AvailType>({mon: false, tue: false, wed: false, thu: false, fri: false});
  
  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.currentTarget.value)
  }

  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailSearch(e.currentTarget.value)
  }

  const handlePhoneSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneSearch(e.currentTarget.value)
  }

  const handleTypeSearch = (value: any) => {
    if (value !== null && value !== undefined) {
      if (!Array.isArray(value)) {
        setTypeSearch(value.value)
      }
    } else if (value === null) {
      setTypeSearch("");
    }
  }

  const handleAvailSearch = (e: React.MouseEvent<HTMLDivElement>) => {
    let newState = {...availSearch};
    newState[e.currentTarget.getAttribute('data-day') as keyof AvailType] = !newState[e.currentTarget.getAttribute('data-day') as keyof AvailType];
    setAvailSearch(newState);
  }

  return (
    <div className={props.className}>
      <StaffDashboardFilters handleNameSearch={handleNameSearch} handleEmailSearch={handleEmailSearch} handlePhoneSearch={handlePhoneSearch} handleTypeFilter={handleTypeSearch} handleAvailFilter={handleAvailSearch} availability={availSearch}/>
      <StyledStaffDashboard nameSearch={nameSearch} emailSearch={emailSearch} phoneSearch={phoneSearch} typeSearch={typeSearch} availSearch={availSearch}/>
    </div>
  );
}

export default styled(Staff)`
  height: 100%;
  width: 100%;
  padding: 60px;
`;