import React, { useEffect } from 'react';
import styled from 'styled-components';
import { db_get } from 'db/renderer';
import StyledStaffListItem from 'components/staff/StaffListItem'
import { Staff as StaffType } from 'customTypes/staff';
import { useQueryCache, useQuery } from 'react-query';

interface StaffDashboardProps {
  className?: string;
}

function useStaff() {
  return useQuery<StaffType[], Error>("staff", () => {
    return db_get('SELECT * FROM STAFF', []);
  })
}

const StaffDashboard: React.FC<StaffDashboardProps> = ( props ) => {
  const cache = useQueryCache();
  const { data } = useStaff();
  
  const handleScroll = () => {
    const top_blur = document.getElementById("staff_list_before");
    const bottom_blur = document.getElementById("staff_list_after");
    const div = document.getElementById("staff_list");
    if (div !== null && top_blur !== null && bottom_blur !== null) {
      // At top of scrolling element
      if (div.scrollTop === 0) {
        top_blur.style.opacity = '0';
      } else {
        top_blur.style.opacity = '1';
      }
      // At bottom of scrolling element
      if (div.scrollHeight - div.scrollTop === div.clientHeight) {
        bottom_blur.style.opacity = '0';
      } else {
        bottom_blur.style.opacity = '1';
      }
    }
  }

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
      <div id={"staff_list"} onScroll={handleScroll}>
        <div id={"staff_list_before"} />
        {data !== undefined && data.map((person, index) => (
          <StyledStaffListItem key={index} person={person} />
        ))}
        <div id={"staff_list_after"} />
      </div>
    </div>
  );
}

export default styled(StaffDashboard)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 25px;
  padding-right: 25px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0px rgba(49, 90, 123, 0.13);
  max-height: 100%;

  #staff_list_before {
    opacity: 0;
    transition: 0.4s;
    position: absolute;
    margin: 50px 35px 25px 25px;
    height: 5%;
    left: 0;
    right: 0;
    top: 0;
    background: linear-gradient(#FFF, transparent) left repeat;
    pointer-events: none;
  }

  #staff_list_after {
    opacity: 1;
    transition: 0.5s;
    position: absolute;
    margin: 25px 35px 25px 25px;
    height: 5%;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent, #FFF) left repeat;
    pointer-events: none;
  }

  #staff_list {
    max-height: 100%;
    overflow: auto;
    padding-right: 10px;

    .staff_list_item:not(:nth-child(2)) {
      margin-top: 15px;
    }
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #E4F0F8;
      border-radius: 100px;
    }
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
`;