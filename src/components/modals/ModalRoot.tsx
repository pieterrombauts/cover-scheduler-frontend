import React from 'react';
import { RootState } from 'redux/reducers'
import { connect, ConnectedProps } from 'react-redux';
import { showModal, hideModal } from 'redux/slices/modalSlice'
import StyledSessionModal from 'components/modals/SessionModal'

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
  "SESSION": StyledSessionModal
}

const ModalRoot: React.FC<Props> = ( props ) => {
  const handleClose = () => {
    props.showModal({ modalType: null, modalProps: {}});
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

