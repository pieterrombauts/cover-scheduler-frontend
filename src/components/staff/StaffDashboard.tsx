import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db_get } from 'db/renderer';
import StyledStaffListItem from 'components/staff/StaffListItem'
import { Staff as StaffType } from 'customTypes/staff';
import { useQueryCache, useQuery } from 'react-query';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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
  const [ sort, setSort ] = useState<{field: keyof StaffType, asc: boolean} | null>(null)

  const dataSortFn = (staff_a: StaffType, staff_b: StaffType) => {
    if (sort !== null) {
      if (staff_a[sort.field] > staff_b[sort.field]) return (sort.asc ? 1 : -1)
      if (staff_a[sort.field] < staff_b[sort.field]) return (sort.asc ? -1 : 1)
    }
    if (staff_a.name > staff_b.name) return 1
    if (staff_a.name < staff_b.name) return -1
    return 0;
  }

  const setSortCol = (column: keyof StaffType) => {
    if (sort !== null && column == sort.field) {
      setSort({ field: sort.field, asc: !sort.asc})
    } else {
      setSort({ field: column, asc: true})
    }
  }

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

  const arrowClassNames = (column: keyof StaffType) => {
    return `${(sort?.asc == false && sort?.field == column) && "descending"} ${sort?.field == column && "sort_visible"}`
  }

  return (
    <div className={props.className}>
      <div className={"staff_headers"}>
        <p onClick={() => setSortCol("name")} className={"staff_name"}>
          Name
          <ArrowDownwardIcon id={"staff_name_sort"} className={arrowClassNames("name")} fontSize="small"/>
        </p>
        <p onClick={() => setSortCol("email")} className={"staff_email"}>
          Email Address
          <ArrowDownwardIcon id={"staff_email_sort"} className={arrowClassNames("email")} fontSize="small"/>
        </p>
        <p onClick={() => setSortCol("phone")} className={"staff_phone"}>
          Mobile
          <ArrowDownwardIcon id={"staff_phone_sort"} className={arrowClassNames("phone")} fontSize="small"/>
        </p>
        <p onClick={() => setSortCol("type")} className={"staff_type"}>
          Type
          <ArrowDownwardIcon id={"staff_type_sort"} className={arrowClassNames("type")} fontSize="small"/>
        </p>
        <p className={"staff_avail"}>Availability</p>
        <p className={"staff_expand"}>Expand</p>
        <p className={"staff_update"}>Update</p>
      </div>
      <div id={"staff_list"} onScroll={handleScroll}>
        <div id={"staff_list_before"} />
        {data !== undefined && (data.sort(dataSortFn)).map((person, index) => (
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
      user-select: none;
      transition: color 0.2s;
    }

    p:not(.staff_avail):not(.staff_expand):not(.staff_update) {
      cursor: pointer;
    }

    p:hover:not(.staff_avail):not(.staff_expand):not(.staff_update) {
      color: #777777;
    }
  }

  .staff_name p { font-weight: 800 !important; }
  .staff_avail p { color: white; }

  .staff_name { 
    display: flex;
    width: 200px; 
  }
  .staff_email { 
    display: flex;
    width: 300px; 
  }
  .staff_phone { 
    display: flex;
    width: 180px; 
  }
  .staff_type {
    display: flex;
    width: 140px; 
    }
  .staff_avail {
    width: 200px; 
  }
  .staff_expand, .staff_update {
    display: flex;
    justify-content: center;
    width: 80px; 
  }
  .descending {
    transform: rotate(-180deg)
  }
  #staff_name_sort, #staff_email_sort, #staff_phone_sort, #staff_type_sort {
    margin-left: 5px;
    visibility: hidden;
    opacity: 0%;
    transition: transform 0.2s, opacity 0.2s;
  }
  .staff_name:hover #staff_name_sort:not(.sort_visible),
  .staff_email:hover #staff_email_sort:not(.sort_visible),
  .staff_phone:hover #staff_phone_sort:not(.sort_visible),
  .staff_type:hover #staff_type_sort:not(.sort_visible) {
    visibility: visible;
    opacity: 50%;
  }
  .sort_visible {
      visibility: visible !important;
      opacity: 100% !important;
    }
`;