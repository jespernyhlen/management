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
    console.log(boards[boardIndex]);

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

const Container = styled.div`
    position: relative;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 4px 0 30px;
`;

const Title = styled.h2`
    color: #151515;
    font-weight: 700;
    text-transform: capitalize;
    font-size: 1.2rem;
`;

const Form = styled.form`
    border-radius: 5px;

    input,
    textarea {
        height: auto;
        width: 100%;
        padding: 8px 12px;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        outline: 0;
        border-radius: 2.5px;
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.025);
        font-size: 0.9rem;
    }

    textarea {
    }

    label {
        font-weight: 600;
        color: #151515;
    }
`;

const ButtonTop = styled.button`
    padding: 0.25rem 0.5rem;
    background: transparent;
    border: 0;
    cursor: pointer;

    path {
        fill: #666;
    }

    &:hover {
        background: #e8e8e8;
    }
`;
