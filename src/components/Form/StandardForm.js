import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ObjectID } from 'bson';
import { getCookie } from '../../utils/Helpers';

/* STYLES */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faHeading,
    faAlignLeft,
    faUsers,
    faFlagCheckered,
    faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../styles/Buttons';
import { Colors } from '../../styles/Colors';
import {
    Container,
    Header,
    Title,
    Form,
    ButtonTop,
} from '../../styles/FormBoardStyles';

/* COMPONENTS */
import ColorInput from './ColorInput';
import FieldInput from './FieldInput';
import DropdownSelect from '../Board/DropdownSelect';

import { API_URL } from '../../constants';

import { openModal, setIsSaved, setUsers } from '../../actions';

// Form used for CRUD of Boards.
// Depending on Scope (Board, Column, Activity) displays different inputfields.
const StandardForm = (props) => {
    const {
        match,
        add,
        update,
        openModal,
        modal,
        users,
        setUsers,
        template,
        saveBoard,
    } = props;

    const [newItem, setNewItem] = useState(template);
    const isUpdate = modal.action === 'edit';

    // Includes information on what to display in modal.
    // Scope (Board, Column, Activity) and their associated IDs.
    const { content } = modal;

    const teamPath = match.path.split('/')[1] === 'teams';
    const token = getCookie('token');

    useEffect(() => {
        // If on teampath, get current users of team.
        // When creating activity, user can then assign teamusers to the activity.
        if (modal.scope === 'activity' && teamPath) {
            axios({
                method: 'GET',
                url: `${API_URL}/team/${match.params.id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUsers(response.data.members);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    useEffect(() => {
        // Based on provided modal information.
        // Sets a standard "teamplate" state item which inputfields can update.
        if (isUpdate) {
            const keys = Object.keys(content);
            let values = {};
            for (const key of keys) {
                values[key] = content[key];
            }

            setNewItem(values);
        }
    }, [content]);

    // Handle change for inputfields.
    const handleChange = (name) => (event) => {
        setNewItem({ ...newItem, [name]: event.target.value });
    };

    // Handle change for dropdown select, where user choose to include users to activity task.
    const handleSelect = (name, value) => {
        setNewItem({ ...newItem, [name]: value });
    };

    // Save new the item (Board, Column, Activity) to the state, and save board to DB.
    function saveItem(next) {
        const id = new ObjectID();
        newItem._id = id.toString();
        add(newItem, modal.columnID);
        saveBoard();
        next();
    }

    // Update and save item (Board, Column, Activity) to the state, and save board to DB.
    function updateItem(next) {
        update(newItem);
        saveBoard();
        next();
    }

    // Close modal and reset values for modal (inputs).
    function setCloseModal() {
        if (newItem !== template) setNewItem(template);
        openModal(false);
    }

    return (
        <Container>
            <Header>
                <Title>
                    {modal.action} {modal.scope}
                </Title>
                <ButtonTop top onClick={setCloseModal}>
                    <FontAwesomeIcon className='larger' icon={faTimes} />
                </ButtonTop>
            </Header>
            <Form>
                {(modal.scope === 'activity' ||
                    modal.scope === 'column' ||
                    modal.scope === 'board') && (
                    <FieldInput
                        values={{
                            name: 'title',
                            label: 'Title',
                            type: 'text',
                            value: newItem.title,
                            handleChange: handleChange('title'),
                            placeholder: `Title for ${modal.scope}..`,
                            icon: faHeading,
                        }}
                    />
                )}
                {modal.scope === 'activity' && (
                    <FieldInput
                        values={{
                            name: 'content',
                            label: 'Description',
                            type: 'text',
                            value: newItem.content,
                            handleChange: handleChange('content'),
                            textArea: true,
                            placeholder: `Describe your ${modal.scope} here..`,
                            icon: faAlignLeft,
                        }}
                    />
                )}

                {modal.scope === 'activity' && (
                    <FieldInput
                        values={{
                            name: 'date',
                            label: 'Date',
                            type: 'date',
                            value: newItem.date,
                            handleChange: handleChange('date'),
                            placeholder: `yyyy-mm-dd`,
                            icon: faCalendarAlt,
                        }}
                    />
                )}
                {modal.scope === 'activity' && (
                    <FieldInput
                        values={{
                            name: 'notification-content',
                            label: 'Notification Text',
                            type: 'text',
                            value: newItem.noteContent,
                            handleChange: handleChange('noteContent'),
                            placeholder: `Short notification for the ${modal.scope}..`,
                            icon: faFlagCheckered,
                        }}
                    />
                )}
                {(modal.scope === 'activity' || modal.scope === 'column') && (
                    <>
                        <HiddenLabel htmlFor='color'>
                            Notification Color
                        </HiddenLabel>
                        <ColorGroup>
                            {Colors.map((color) => {
                                let type =
                                    modal.scope === 'activity'
                                        ? 'noteColor'
                                        : 'color';
                                return (
                                    <ColorInput
                                        key={color}
                                        checkedColor={newItem[type]}
                                        color={color}
                                        handleChange={handleChange(type)}
                                    />
                                );
                            })}
                        </ColorGroup>
                    </>
                )}
                {modal.scope === 'activity' && teamPath && (
                    <>
                        <SectionTitle>
                            <FontAwesomeIcon icon={faUsers} />
                            <label htmlFor='members'>Members</label>
                        </SectionTitle>
                        <DropdownSelect
                            users={users}
                            selected={newItem.members}
                            type={'members'}
                            handleChange={handleSelect}
                        />
                    </>
                )}
            </Form>
            <Button
                onClick={() =>
                    isUpdate
                        ? updateItem(setCloseModal)
                        : saveItem(setCloseModal)
                }
            >
                {modal.action}
            </Button>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
        users: state.users.users,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        openModal,
        setIsSaved,
        setUsers,
    })(StandardForm)
);

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
