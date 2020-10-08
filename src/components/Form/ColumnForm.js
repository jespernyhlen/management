import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    updateColumn,
    addColumn,
    setColumn,
    openModal,
    setIsSaved,
} from '../../actions';
import Modal from 'react-modal';
import styled from 'styled-components';
import ColorInput from './ColorInput';
import FieldInput from './FieldInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ButtonContainer, Button } from '../../styles/Buttons';
import { Colors } from '../../styles/Colors';
import { ModalStyle } from '../../styles/ModalStyle';

import { v4 as uniqueID } from 'uuid';

Modal.setAppElement('#root');

const newItemTemplate = {
    id: '',
    title: '',
    color: '#3e60ad',
    activityIDs: [],
};

function ColumnForm({
    addColumn,
    updateColumn,
    openModal,
    modalOpen,
    modalInfo,
    activeColumn,
    setColumn,
    borderColor,
}) {
    const [newItem, setNewItem] = useState(newItemTemplate);
    const isUpdate = modalInfo.action === 'edit';

    let isActiveColumn = Object.entries(activeColumn).length !== 0;

    useEffect(() => {
        if (isUpdate) {
            if (isUpdate && !isActiveColumn) {
                setColumn(modalInfo.columnID);
            }
            if (isUpdate && isActiveColumn) {
                console.log(activeColumn);

                setNewItem({
                    id: activeColumn.id,
                    title: activeColumn.title,
                    color: activeColumn.color,
                    activityIDs: activeColumn.activityIDs,
                });
            }
        }
    }, [activeColumn]);

    const handleChange = (name) => (event) => {
        setNewItem({ ...newItem, [name]: event.target.value });
    };

    function saveItem() {
        newItem.id = uniqueID();
        addColumn(newItem);
        setCloseModal();
    }

    function updateItem() {
        updateColumn(newItem);
        setCloseModal();
    }

    function setCloseModal() {
        openModal(false);

        if (newItem !== newItemTemplate) setNewItem(newItemTemplate);
        if (isActiveColumn) setColumn(false);
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
                        borderColor: borderColor,
                    },
                }}
                contentLabel='Activity Form'
            >
                <Container>
                    <Header>
                        <Title>{modalInfo.action} Column </Title>
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
                                placeholder: 'Title for activity..',
                            }}
                        />

                        <label htmlFor='color'>Column Color:</label>
                        <div>
                            {Colors.map((color) => {
                                return (
                                    <ColorInput
                                        key={color}
                                        checkedColor={newItem.color}
                                        color={color}
                                        handleChange={handleChange}
                                        types={['color']}
                                    />
                                );
                            })}
                        </div>
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
        boardIndex: state.board.boardIndex,
        modalOpen: state.modal.modalOpen,
        modalInfo: state.modal.info,
        activeColumn: state.board.activeColumn,
    };
};

export default connect(mapStateToProps, {
    addColumn,
    updateColumn,
    openModal,
    setIsSaved,
    setColumn,
})(ColumnForm);

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
