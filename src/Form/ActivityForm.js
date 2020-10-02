import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    updateActivity,
    setActivity,
    addActivity,
    openModal,
} from '../actions';
import Modal from 'react-modal';
import styled from 'styled-components';
import ColorInput from './ColorInput';
import FieldInput from './FieldInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { v4 as uniqueID } from 'uuid';

const styledModal = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        border: '0px',
        overflow: 'auto',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '400px',
        background: '#f4f5f7',
    },
};
const colors = [
    '#da1b1bc7',
    '#1b73dab3',
    '#83BB41',
    '#F38630',
    '#ffc107',
    '#673ab7',
];

Modal.setAppElement('#root');

const newItemTemplate = {
    id: '',
    title: '',
    content: '',
    date: '',
    notification: [
        {
            color: '',
            content: '',
        },
    ],
};

function ActivityForm({
    addActivity,
    updateActivity,
    columnID,
    openModal,
    modalOpen,
    modalType,
    modalIdActivity,
    setActivity,
    activeActivity,
}) {
    const [newItem, setNewItem] = useState(newItemTemplate);
    const isUpdate = modalType === 'edit';

    let isActiveActivity = Object.entries(activeActivity).length !== 0;
    console.log(newItem);
    useEffect(() => {
        if (isUpdate && !isActiveActivity) {
            setActivity(modalIdActivity);
        }
        if (isUpdate && isActiveActivity) {
            setNewItem({
                id: activeActivity.id,
                title: activeActivity.title,
                content: activeActivity.content,
                date: activeActivity.date,
                notification: [
                    {
                        color: activeActivity['notification'][0].color,
                        content: activeActivity.notification[0].content,
                    },
                ],
            });
        }
    }, [activeActivity]);

    const handleChange = (name, subName) => (event) => {
        if (subName) {
            setNewItem({
                ...newItem,
                [name]: [
                    { ...newItem[name][0], [subName]: event.target.value },
                ],
            });
        } else {
            setNewItem({ ...newItem, [name]: event.target.value });
        }
    };

    function saveItem() {
        newItem.id = uniqueID();
        addActivity(newItem, columnID);
        setCloseModal();
    }

    function updateItem() {
        updateActivity(newItem);
        setCloseModal();
    }

    function setCloseModal() {
        openModal(false, '', '');

        if (newItem !== newItemTemplate) setNewItem(newItemTemplate);
        if (isActiveActivity) setActivity(false);
    }

    return (
        <>
            <Modal
                isOpen={modalOpen}
                onRequestClose={setCloseModal}
                style={styledModal}
                contentLabel='Example Modal'
            >
                <Container>
                    <ButtonTop top onClick={setCloseModal}>
                        <FontAwesomeIcon className='larger' icon={faTimes} />
                    </ButtonTop>
                    <Title>{modalType} Activity</Title>
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

                        <FieldInput
                            values={{
                                name: 'content',
                                label: 'Description',
                                type: 'text',
                                value: newItem.content,
                                handleChange: handleChange('content'),
                                textArea: true,
                                placeholder: 'Describe your activity here..',
                            }}
                        />
                        <FieldInput
                            values={{
                                name: 'date',
                                label: 'Date',
                                type: 'date',
                                value: newItem.date,
                                handleChange: handleChange('date'),
                                placeholder: 'Title for activity..',
                            }}
                        />

                        <FieldInput
                            values={{
                                name: 'notification-content',
                                label: 'Notification Text',
                                type: 'text',
                                value: newItem.notification[0].content,
                                handleChange: handleChange(
                                    'notification',
                                    'content'
                                ),
                                placeholder:
                                    'Short notification for the activity..',
                            }}
                        />

                        <label htmlFor='color'>Notification Color:</label>
                        <div>
                            {colors.map((color) => {
                                return (
                                    <ColorInput
                                        key={color}
                                        checkedColor={
                                            newItem.notification[0].color
                                        }
                                        color={color}
                                        handleChange={handleChange}
                                    />
                                );
                            })}
                        </div>
                    </Form>
                    <ButtonContainer>
                        <Button onClick={isUpdate ? updateItem : saveItem}>
                            Save
                        </Button>
                    </ButtonContainer>
                </Container>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modal.modalOpen,
        modalType: state.modal.modalType,
        modalIdActivity: state.modal.modalIdActivity,
        activeActivity: state.board.activeActivity,
    };
};

export default connect(mapStateToProps, {
    addActivity,
    updateActivity,
    openModal,
    setActivity,
})(ActivityForm);

const Container = styled.div`
    position: relative;
`;

const Title = styled.h2`
    text-align: center;
    color: #222;
    text-transform: capitalize;
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

const Button = styled.button`
    width: 100%;
    font-size: 0.9rem;
    cursor: pointer;
    transition: 0.1s all;
    position: relative;
    text-align: center;
    opacity: 1;
    border-radius: 5px;
    padding: 0.75rem 2.5rem;
    font-weight: 600;
    color: #fff;
    border: 0;
    background: #5aac44;

    &:hover {
        opacity: 0.9;
    }
`;

const ButtonTop = styled.button`
    position: absolute;
    padding: 0.25rem 0.5rem;
    top: -0.75rem;
    right: -0.75rem;
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
