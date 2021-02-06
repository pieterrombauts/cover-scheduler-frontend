import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import SortableSelect, { arrayMove, SortableMultiValue, SortableMultiValueLabel } from 'components/misc/SortableSelect'
import { Staff } from 'customTypes/staff'
import { useQuery, useQueryCache } from 'react-query';
import { db_get } from 'db/renderer';
import { SessionConfig as SessionConfigType } from 'customTypes/sess_conf';
import { abbrName } from 'utils/stringFuncs';

interface PracticeConfigDayProps {
  className?: string;
  day: string;
  config: SessionConfigType[];
  onSelect: (day: string, session:number, value: number[] | null) => void; 
}

const PracticeConfigDay: React.FC<PracticeConfigDayProps> = ( props ) => {
  function useStaff() {
    return useQuery<Staff[], Error>("staff", () => {
      return db_get('SELECT * FROM STAFF', []);
    })
  }
  
  const cache = useQueryCache();
  const { data: staff_data } = useStaff();

  //const [staffOptions, setStaffOptions] = useState<{label: string, options: {value: number, label: string}[]}[]>([])
  const [staffOptions, setStaffOptions] = useState<{value: number, label: string}[]>([])
  
  useEffect(() => {
    if (staff_data !== undefined && staff_data !== null) {
      let sorted = staff_data.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      })
      setStaffOptions(sorted.filter(staff => staff.type === "employee").map(employee => ({ value: employee.id, label: abbrName(employee.name) })));
    }
  }, [staff_data])

  const filterExistingOptions = (session: number) => {
    const config = props.config.filter(conf => conf.session === session)
                  .flatMap(conf => [conf.staff, conf.staff_alt])
                  .filter(staff => staff !== null)
                  .map(staff_id => {
                    return staffOptions.filter(option => option.value === staff_id)[0]
                  });
    return config;
    // if (config.length === 1) {
    //   let result: number[] = [];
    //   if (config[0].staff !== null) {
    //     result[0] = config[0].staff;
    //     if (config[0].staff_alt !== null) result[1] = config[0].staff_alt;
    //   }
    //   return result;
    // };
    // return []; 
  }

  const handleSelectionChange = (value: any, session: number) => {
    if (value !== undefined) {
      if (value === null) {
        props.onSelect(props.day, session, []);
      } else {
        props.onSelect(props.day, session, value.map((option: {value: number, label: string}) => option.value));
      }
    }
  }

  const onSortEnd = ({ oldIndex, newIndex }: {oldIndex: number, newIndex: number}, session: number) => {
    const optionsArray = props.config.filter(conf => conf.session === session).flatMap(conf => [conf.staff, conf.staff_alt]);
    console.log(optionsArray);
    const newValue = arrayMove(optionsArray, oldIndex, newIndex);
    console.log(newValue);
    props.onSelect(props.day, session, newValue);
    console.log(
      'Values sorted:',
      newValue
    );
  };

  return(
    <div className={`${props.className} config_day_col`}>
      <p className={"day_of_week"}>{props.day.toUpperCase()}</p>
      <div className="config_day_inputs">
        <div className="config_input">
          <p className="config_select_label">Session One</p>
          <SortableSelect 
            useDragHandle
            axis="y"
            onSortEnd={({ oldIndex, newIndex }) => onSortEnd({ oldIndex, newIndex }, 1)}
            distance={4}
            getHelperDimensions={({ node }) => node.getBoundingClientRect()}
            isMulti
            options={staffOptions}
            value={filterExistingOptions(1)}
            onChange={(e) => handleSelectionChange(e, 1)}
            components={{
              MultiValue: SortableMultiValue,
              MultiValueLabel: SortableMultiValueLabel
            }}
            closeMenuOnSelect={false}
          />
        </div>
        <div className="config_input">
          <p className="config_select_label">Session Two</p>
          <SortableSelect 
            useDragHandle
            axis="y"
            onSortEnd={({ oldIndex, newIndex }) => onSortEnd({ oldIndex, newIndex }, 2)}
            distance={4}
            getHelperDimensions={({ node }) => node.getBoundingClientRect()}
            isMulti
            options={staffOptions}
            value={filterExistingOptions(2)}
            onChange={(e) => handleSelectionChange(e, 2)}
            components={{
              MultiValue: SortableMultiValue,
              MultiValueLabel: SortableMultiValueLabel
            }}
            closeMenuOnSelect={false}
          />
        </div>
        <div className="config_input">
          <p className="config_select_label">Session Three</p>
          <SortableSelect 
            useDragHandle
            axis="y"
            onSortEnd={({ oldIndex, newIndex }) => onSortEnd({ oldIndex, newIndex }, 3)}
            distance={4}
            getHelperDimensions={({ node }) => node.getBoundingClientRect()}
            isMulti
            options={staffOptions}
            value={filterExistingOptions(3)}
            onChange={(e) => handleSelectionChange(e, 3)}
            components={{
              MultiValue: SortableMultiValue,
              MultiValueLabel: SortableMultiValueLabel
            }}
            closeMenuOnSelect={false}
          />
        </div>  
      </div>
    </div>
  ); 
}

export default styled(PracticeConfigDay)`
  width: 17%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .config_day_inputs {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
  }

  .config_input {
    height: 90px;
  }
  .config_input:not(:last-child) {
    margin-bottom: 10px;
  }

  .config_select_label {
    margin-bottom: 0px;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #315A7B;
  }

  .day_of_week {
    font-family: 'Nunito', sans-serif;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 800;
    color: #A2C2DB;
  }
`;
