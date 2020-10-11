import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    updateBoard,
    setActivity,
    addBoard,
    openModal,
    setIsSaved,
} from '../../actions';
import Modal from 'react-modal';
import styled from 'styled-components';
import {
    Container,
    Header,
    Title,
    Form,
    ButtonTop,
} from '../../styles/FormBoardStyles';
import FieldInput from './FieldInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ButtonContainer, Button } from '../../styles/Buttons';
import { ModalStyle } from '../../styles/ModalStyle';

Modal.setAppElement('#root');

const newBoardTemplate = {
    title: '',
};

function BoardForm({
    addBoard,
    updateBoard,
    boardIndex,
    boards,
    openModal,
    modalOpen,
    modalInfo,
}) {
    const [newItem, setNewItem] = useState(newBoardTemplate);
    const isUpdate = modalInfo.action === 'edit';

    useEffect(() => {
        if (isUpdate) {
            setNewItem({
                id: boards[boardIndex]._id,
                title: boards[boardIndex].title,
            });
        }
    }, [isUpdate]);

    const handleChange = (name) => (event) => {
        setNewItem({ ...newItem, [name]: event.target.value });
    };

    function saveItem() {
        // newItem.id = uniqueID();
        addBoard(newItem);
        console.log(newItem);
        setCloseModal();
    }

    function updateItem() {
        updateBoard(newItem);
        setCloseModal();
    }

    function setCloseModal() {
        openModal(false);

        if (newItem !== newBoardTemplate) setNewItem(newBoardTemplate);
    }

    return (
        <>
            <Modal
                isOpen={modalOpen}
                onRequestClose={setCloseModal}
                style={{
                    content: {
                        ...ModalStyle,
                        borderTop: '5px solid',
                        borderColor: '#3e60ad',
                    },
                }}
                contentLabel='Activity Form'
            >
                <Container>
                    <Header>
                        <Title>
                            {modalInfo.action} {modalInfo.scope}
                        </Title>
                        <ButtonTop top onClick={setCloseModal}>
                            <FontAwesomeIcon
                                className='larger'
                                icon={faTimes}
                            />
                        </ButtonTop>
                    </Header>
                    <Form>
                        <FieldInput
                            values={{
                                name: 'title',
                                label: 'Title',
                                type: 'text',
                                value: newItem.title,
                                handleChange: handleChange('title'),
                                placeholder: 'Title for board..',
                            }}
                        />
                    </Form>
                    <ButtonContainer>
                        <Button
                            bgColor={'#3e60ad'}
                            onClick={isUpdate ? updateItem : saveItem}
                        >
                            Update
                        </Button>
                    </ButtonContainer>
                </Container>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        boards: state.board.boards,
        boardIndex: state.board.boardIndex,
        modalOpen: state.modal.modalOpen,
        modalInfo: state.modal.info,
    };
};

export default connect(mapStateToProps, {
    addBoard,
    updateBoard,
    openModal,
    setActivity,
    setIsSaved,
})(BoardForm);
