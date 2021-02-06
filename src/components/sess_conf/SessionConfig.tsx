import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledPracticeConfigWeek from 'components/sess_conf/PracticeConfigWeek'
import Button from 'react-bootstrap/Button';
import { SessionConfig as SessionConfigType } from 'customTypes/sess_conf';
import { useQuery, useQueryCache, useMutation } from 'react-query';
import { db_get, db_update_bulk } from 'db/renderer';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'redux/reducers';
import { showModal, hideModal } from 'redux/slices/modalSlice';

interface SessionConfigProps {
  className?: string;
}

const mapState = (state: RootState) => ({})

const connector = connect(mapState, { showModal, hideModal });
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & SessionConfigProps;

const SessionConfig: React.FC<Props> = ( props ) => {
  const cache = useQueryCache();
  const { data } = useSessionConf();

  function useSessionConf() {
    return useQuery<SessionConfigType[], Error>("sess_conf", () => {
      return db_get('SELECT * FROM SESS_CONF', []);
    })
  }
  
  // React-Query statement to update all session configs in SQLite
  const [updateSessionConfig] = useMutation((newSessionConfig: SessionConfigType[]) =>
    db_update_bulk('UPDATE SESS_CONF SET staff = $staff, staff_alt = $staff_alt WHERE practice = $practice AND day = $day AND session = $session', 
    newSessionConfig),
    {
      onSuccess: () => {
        cache.invalidateQueries(`sess_conf`);
      }
    }
  );

  const [sessionConf, setSessionConf] = useState<SessionConfigType[]>([]);

  useEffect(() => {
    if (data !== undefined) {
      setSessionConf(data);
    }
  }, [data])

  const handleSelect = (practice: string, day: string, session: number, value: number[] | null) => {
    let newState = sessionConf.map((conf) => {
      if (conf.practice === practice && conf.day === day && conf.session === session) {
        if (value === null || value.length === 0) return {...conf, staff: null, staff_alt: null}
        else if (value.length === 1) return {...conf, staff: value[0], staff_alt: null}
        else if (value.length === 2) return {...conf, staff: value[0], staff_alt: value[1]}
      }
      return conf;
    });
    setSessionConf(newState);
  }

  const validateDuplicates = () => {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    return days.filter(day => {
      const day_config_staff = sessionConf.filter(conf => conf.day === day).map(conf => conf.staff).filter(staff => staff !== null);
      const day_config_staff_alt = sessionConf.filter(conf => conf.day === day).map(conf => conf.staff_alt).filter(staff => staff !== null);
      return ((new Set(day_config_staff).size !== day_config_staff.length) || (new Set(day_config_staff_alt).size !== day_config_staff_alt.length))
    })
  }

  const onSaveClick = () => {
    const duplicates = validateDuplicates();
    if (duplicates.length > 0) {

    } else {
      props.showModal({ 
        modalType: "SESSCONF_CONFIRM",
        modalProps: {
          message: "Are you sure you want to save these changes to the session configuration?",
          fn: "update",
          onConfirm: onSaveConfirmClick 
        }
      })
    }
  }

  const onSaveConfirmClick = () => {
    updateSessionConfig(sessionConf);
  }

  const onRevertClick = () => {
    props.showModal({ 
      modalType: "SESSCONF_CONFIRM",
      modalProps: {
        message: "Are you sure you want to revert these changes to the session configuration?",
        fn: "delete",
        onConfirm: onRevertConfirmClick 
      }
    })
  }

  const onRevertConfirmClick = () => {
    if (data !== undefined) setSessionConf(data)
  }

  return(
    <div className={props.className}>
      <StyledPracticeConfigWeek practice="city" config={sessionConf.filter((conf: SessionConfigType) => conf.practice === "city")} onSelect={handleSelect} />
      <StyledPracticeConfigWeek practice="peninsula" config={sessionConf.filter((conf: SessionConfigType) => conf.practice === "peninsula")} onSelect={handleSelect} />
      <div id="sess_conf_btns">
        <Button variant="secondary" onClick={onRevertClick}>Revert Changes</Button>
        <Button variant="success" onClick={onSaveClick}>Save Configuration</Button>
      </div>
    </div>
  ); 
}

const StyledSessionConfig = styled(SessionConfig)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;

  &:first-child .config_practice {
    margin-bottom: 20px;
  }
  
  #sess_conf_btns {
    display: flex;

    button:not(:first-child) {
      margin-left: 20px;
    }
  }
`;

export default connector(StyledSessionConfig);