import React from 'react';
import TeamForm from './TeamForm';
import Modal from '../Form/ModalContainer';

const teamTemplate = {
    _id: '',
    name: '',
    members: [],
};

const FormsModal = () => {
    return (
        <Modal>
            <TeamForm template={teamTemplate} />
        </Modal>
    );
};

export default FormsModal;
