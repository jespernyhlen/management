import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';

/* STYLES */
import { ModalStyle } from '../../styles/ModalStyle';

import { openModal } from '../../actions';

Modal.setAppElement('#root');

// Component for rendering a "popup modal".
// Used for displaying forms.
const ModalContainer = (props) => {
    const { modal, openModal } = props;

    return (
        <Modal
            isOpen={modal.isOpen}
            onRequestClose={() => openModal(false)}
            style={{
                content: {
                    ...ModalStyle,
                    borderTop: '5px solid',
                    borderColor: modal.color ? modal.color : '#fff',
                },
            }}
            contentLabel='Form'
        >
            {props.children}
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        openModal,
    })(ModalContainer)
);
