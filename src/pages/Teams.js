import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { getAuthenticatedUser, getCookie } from '../utils/Helpers';

/* STYLES */
import styled from 'styled-components';
import { devices } from '../styles/Devices';
import { Button } from '../styles/Buttons';
import { Header, HeaderTitle } from '../styles/Header';

/* COMPONENTS */
import Loader from '../components/Loader';
import FormsModal from '../components/Team/FormsModal';
import TeamItem from '../components/Team/TeamItem';

import { setTeam, setTeams, openModal } from '../actions';

import { API_URL } from '../constants';

const Teams = ({ teams, openModal, modal, setTeams }) => {
    const [values, setValues] = useState({
        isLoading: true,
        teams: [],
    });

    const token = getCookie('token');

    useEffect(() => {
        // Get board associated with logged in user ID.
        // Contains information about what teams it's part of.
        axios({
            method: 'GET',
            url: `${API_URL}/user/${getAuthenticatedUser()._id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                // If user part of any team, fetch team information.
                const userData = response.data;
                if (userData.teams.length > 0) {
                    return axios({
                        method: 'PUT',
                        url: `${API_URL}/teams`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: {
                            IDs: userData.teams,
                        },
                    });
                }
                return { data: [] };
            })
            .then((response) => {
                const teamsData = response.data;
                setValues({ ...values, isLoading: false });
                setTeams(teamsData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setValues({ ...values, teams: teams.data });
    }, [teams]);

    // "Global" modal is created and if open, gets information from current scope.
    // Modal information associated with current scope Teams.
    const setModalOpen = () => {
        openModal(true, {
            scope: 'teams',
            action: 'create',
            content: {},
        });
    };

    return (
        <>
            <Header>
                <HeaderTitle>
                    <b>My Teams</b>
                </HeaderTitle>
                <ContainerRight>
                    <Button onClick={() => setModalOpen()}>Add Team</Button>
                </ContainerRight>
            </Header>

            {!values.isLoading ? (
                values.teams.length ? (
                    <Container>
                        {values.teams.map((team, index) => {
                            return <TeamItem key={index} team={team} />;
                        })}
                    </Container>
                ) : (
                    <NoResultsText>You have no teams available..</NoResultsText>
                )
            ) : (
                <Loader />
            )}

            {modal.isOpen && <FormsModal />}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        teams: state.teams,
        modal: state.modal,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        setTeam,
        setTeams,
        openModal,
    })(Teams)
);

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 2rem;
    position: relative;

    @media ${devices.tabletSmall} {
        padding: 1.25rem;
    }
`;

const ContainerRight = styled.div`
    display: flex;

    @media ${devices.tabletSmall} {
        margin-top: 1rem;
    }
`;

const NoResultsText = styled.p`
    margin: 2rem;
    text-align: center;
`;
