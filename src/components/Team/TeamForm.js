import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ObjectID } from 'bson';
import { getCookie } from '../../utils/Helpers';

/* STYLES */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../styles/Buttons';
import {
    Container,
    Header,
    Title,
    Form,
    ButtonTop,
} from '../../styles/FormBoardStyles';

/* COMPONENTS */
import FieldInput from '../Form/FieldInput';
import DropdownSelect from '../Board/DropdownSelect';

import { openModal, addTeam, updateTeam } from '../../actions';

import { API_URL } from '../../constants';

const token = getCookie('token');

const TeamForm = (props) => {
    const { openModal, modal, addTeam, updateTeam, template } = props;
    const [newTeam, setNewTeam] = useState(template);
    const [users, setUsers] = useState([]);

    const isUpdate = modal.action === 'edit';

    useEffect(() => {
        // Fetch all registred users, to enable option to add them to the team.
        let userData = [];

        axios({
            method: 'GET',
            url: `${API_URL}/users`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                userData = response.data;
                setUsers(userData);
            })

            .catch((error) => {
                console.log(error);
            });

        // If team ID is set for modal information, fetch information about current team.
        if (modal.teamID) {
            axios({
                method: 'GET',
                url: `${API_URL}/team/${modal.teamID}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    let teamData = response.data;
                    setNewTeam(teamData);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    // Handle change for inputs related to the team.
    const handleChange = (name) => (event) => {
        setNewTeam({ ...newTeam, [name]: event.target.value });
    };

    // Handle change for dropdown select, where user choose other users to include in team.
    const handleSelect = (name, value) => {
        setNewTeam({ ...newTeam, [name]: value });
    };

    // Save new team to the DB, then update team to state.
    function saveTeam(next) {
        const id = new ObjectID();
        axios({
            method: 'POST',
            url: `${API_URL}/teams/add`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { ...newTeam, _id: id.toString() },
        })
            .then((response) => {
                addTeam(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        next();
    }

    // Update and save team to the DB, then update team to state.
    function updateItem(next) {
        axios({
            method: 'PUT',
            url: `${API_URL}/teams/update`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: newTeam,
        })
            .then((response) => {
                updateTeam(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        next();
    }

    // Close modal and reset values for modal (inputs).
    function setCloseModal() {
        if (newTeam !== template) setNewTeam(template);
        openModal(false);
    }

    return (
        <Container>
            <Header>
                <Title>{modal.action} Team </Title>
                <ButtonTop top onClick={setCloseModal}>
                    <FontAwesomeIcon className='larger' icon={faTimes} />
                </ButtonTop>
            </Header>
            <Form>
                <FieldInput
                    values={{
                        name: 'name',
                        label: 'Name',
                        type: 'text',
                        value: newTeam.name,
                        handleChange: handleChange('name'),
                        placeholder: 'Team name',
                    }}
                />
                <SectionTitle>
                    <FontAwesomeIcon icon={faUsers} />
                    <label htmlFor='members'>Members</label>
                </SectionTitle>
                <DropdownSelect
                    includeSelf={modal.action === 'create'}
                    users={users}
                    selected={newTeam.members}
                    type={'members'}
                    handleChange={handleSelect}
                />
            </Form>
            <Button
                onClick={() =>
                    isUpdate
                        ? updateItem(setCloseModal)
                        : saveTeam(setCloseModal)
                }
            >
                {modal.action}
            </Button>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        boardIndex: state.board.boardIndex,
        modal: state.modal,
    };
};

export default connect(mapStateToProps, {
    openModal,
    addTeam,
    updateTeam,
})(TeamForm);

const SectionTitle = styled.label`
    color: #222;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0rem;

    svg {
        margin-right: 0.75rem;
        font-size: 0.825rem;
        margin-bottom: 0.05rem;
    }
`;
