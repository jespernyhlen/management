import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    updateActivity,
    setActivity,
    addActivity,
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
import ColorInput from './ColorInput';
import FieldInput from './FieldInput';
import DropdownSelect from '../Board/DropdownSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faHeading,
    faAlignLeft,
    faUsers,
    faFlagCheckered,
    faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ButtonContainer, Button } from '../../styles/Buttons';
import { Colors } from '../../styles/Colors';
import { ModalStyle } from '../../styles/ModalStyle';

import { v4 as uniqueID } from 'uuid';

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
    members: [],
};

function ActivityForm({
    addActivity,
    updateActivity,
    openModal,
    modalOpen,
    modalInfo,
    setActivity,
    activeActivity,
    users,
}) {
    const [newItem, setNewItem] = useState(newItemTemplate);
    const isUpdate = modalInfo.action === 'edit';

    let isActiveActivity = Object.entries(activeActivity).length !== 0;

    useEffect(() => {
        if (isUpdate && !isActiveActivity) {
            setActivity(modalInfo.activityID);
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
                members: activeActivity.members,
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

    const handleDropdown = (name, value) => {
        setNewItem({ ...newItem, [name]: value });
    };

    function saveItem() {
        newItem.id = uniqueID();
        addActivity(newItem, modalInfo.columnID);
        setCloseModal();
    }

    function updateItem() {
        console.log(newItem);

        updateActivity(newItem);
        setCloseModal();
    }

    function setCloseModal() {
        openModal(false);

        if (newItem !== newItemTemplate) setNewItem(newItemTemplate);
        if (isActiveActivity) setActivity(false);
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
                        borderColor: modalInfo.color,
                    },
                }}
                contentLabel='Activity Form'
            >
                <Container>
                    <Header>
                        <Title>{modalInfo.action} Activity </Title>
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
                                icon: faHeading,
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
                                icon: faAlignLeft,
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
                                icon: faCalendarAlt,
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
                                icon: faFlagCheckered,
                            }}
                        />

                        <HiddenLabel htmlFor='color'>
                            Notification Color
                        </HiddenLabel>
                        <ColorGroup>
                            {Colors.map((color) => {
                                return (
                                    <ColorInput
                                        key={color}
                                        checkedColor={
                                            newItem.notification[0].color
                                        }
                                        color={color}
                                        handleChange={handleChange}
                                        types={['notification', 'color']}
                                    />
                                );
                            })}
                        </ColorGroup>
                        <SectionTitle>
                            <FontAwesomeIcon icon={faUsers} />
                            <label htmlFor='members'>Members</label>
                        </SectionTitle>
                        <DropdownSelect
                            users={users}
                            selected={newItem.members}
                            type={'members'}
                            handleChange={handleDropdown}
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
        boardIndex: state.board.boardIndex,
        modalOpen: state.modal.modalOpen,
        modalInfo: state.modal.info,
        activeActivity: state.board.activeActivity,
        users: state.users.users,
    };
};

export default connect(mapStateToProps, {
    addActivity,
    updateActivity,
    openModal,
    setActivity,
    setIsSaved,
})(ActivityForm);

const SectionTitle = styled.label`
    color: #222;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;

    svg {
        margin-right: 0.75rem;
        font-size: 0.825rem;
        margin-bottom: 0.05rem;
    }
`;

const HiddenLabel = styled.label`
    opacity: 0;
    transform: translateX(-150vw);
    height: 0;
`;

const ColorGroup = styled.div`
    margin-top: -2.25rem;
`;
