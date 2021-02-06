import React from 'react';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import { showModal, hideModal } from 'redux/slices/modalSlice'
import StyledSessionModal from 'components/modals/SessionModal'
import StyledStaffEditModal from 'components/modals/StaffEditModal'
import StyledStaffAddModal from 'components/modals/StaffAddModal'
import MODAL_CLOSE from 'constants/modal';

interface ModalRootProps {
  className?: string;
}

const mapState = (state: RootState) => ({
  modalType: state.modalReducer.modalType,
  modalProps: state.modalReducer.modalProps
})

const connector = connect(mapState, { showModal, hideModal });
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & ModalRootProps;

const MODAL_COMPONENTS: {[key: string]: any} = {
  "SESSION": StyledSessionModal,
  "STAFF_EDIT": StyledStaffEditModal,
  "STAFF_ADD": StyledStaffAddModal
}

const ModalRoot: React.FC<Props> = ( props ) => {
  const handleClose = () => {
    props.showModal(MODAL_CLOSE);
    console.log("Modal close ran...");
  }

  if (props.modalType === null) {
    return null;
  } else {
    const ModalComponent = MODAL_COMPONENTS[props.modalType!];
    return <ModalComponent onHide={handleClose} {...props.modalProps} />; 
  }
}

export default connector(ModalRoot);

