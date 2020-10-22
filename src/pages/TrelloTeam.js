import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../utils/Helpers';

/* STYLES */
import styled from 'styled-components';
import { devices } from '../styles/Devices';
import { Header, HeaderTitle } from '../styles/Header';
import { DropdownButtonSolid, DropdownButton } from '../styles/Buttons';
import { ButtonContainer, Button } from '../styles/Buttons';

/* COMPONENTS */
import Loader from '../components/Loader';
import Board from '../components/Board/Board';
import DropdownMenu from '../components/Board/DropdownMenu';
import FormsModal from '../components/Form/FormsModal';
import BoardList from '../components/Board/BoardList';
import GravatarImage from '../layout/Gravatar';

import {
    setBoards,
    openModal,
    setBoardIndex,
    deleteBoard,
    setIsSaved,
} from '../actions';

import { API_URL } from '../constants';

const TrelloTeam = ({
    isSaved,
    setIsSaved,
    match,
    modal,
    openModal,
    boardIndex,
    boards,
    setBoards,
    setBoardIndex,
    deleteBoard,
}) => {
    const [values, setValues] = useState({
        isLoading: true,
        team: {},
        btnText: 'Save Changes',
    });

    const token = getCookie('token');

    const [dropdownShown, setDropdownShown] = useState(false);
    const currentBoard = boards[boardIndex];
    const { pathname } = useLocation();

    useEffect(() => {
        // Get team associated with it's ID.
        axios({
            method: 'GET',
            url: `${API_URL}/team/${match.params.id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const teamData = response.data;

                setBoards(teamData.boards);
                setValues({ ...values, isLoading: false, team: teamData });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function saveTeam() {
        // Update specified team and their boards to DB.
        let teamID = pathname.split('/')[2];
        setValues({ ...values, btnText: 'Save Changes...' });

        axios({
            method: 'PUT',
            url: `${API_URL}/teams/update`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                _id: teamID,
                boards: boards,
            },
        })
            .then((response) => {
                setIsSaved(true);
                setValues({ ...values, btnText: 'Save Changes' });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // "Global" modal is created and if open, gets information from current scope.
    // Modal information associated with current scope Boards.
    let modalContent = {
        scope: 'board',
        action: 'edit',
        boardID: boardIndex,
        content: boards[boardIndex],
    };

    // Open modal with scope Board, for creating a new one.
    const createBoard = () => {
        openModal(true, { ...modalContent, action: 'create' });
    };

    // Delete board with current boardindex.
    const deleteContent = () => {
        deleteBoard(boardIndex);
    };

    return (
        <>
            <Header>
                <HeaderTitle>
                    {!values.isLoading && values.team.name && (
                        <b>{values.team.name}</b>
                    )}
                    {!values.isLoading &&
                        currentBoard &&
                        ' - ' + currentBoard.title}
                </HeaderTitle>
                <ContainerRight>
                    {!values.isLoading && (
                        <MembersContainer>
                            {values.team.members.map((member) => {
                                return (
                                    <Fragment key={member.email}>
                                        <GravatarImage
                                            email={member.email}
                                            size={20}
                                            rounded={true}
                                        />
                                        <HoverText>{member.name}</HoverText>
                                    </Fragment>
                                );
                            })}
                        </MembersContainer>
                    )}

                    <ButtonContainer>
                        <Button onClick={createBoard}>Add Board</Button>
                        <Button disabled={isSaved} onClick={saveTeam}>
                            {values.btnText}
                        </Button>
                    </ButtonContainer>
                    <DropdownButtonSolid onClick={() => setDropdownShown(true)}>
                        <DropdownButton type={'header'} />
                    </DropdownButtonSolid>
                    <DropdownMenu
                        dropdownShown={dropdownShown}
                        setDropdownShown={setDropdownShown}
                        content={modalContent}
                        deleteContent={deleteContent}
                    />
                </ContainerRight>
            </Header>
            {!values.isLoading ? (
                <>
                    <BoardList clickHandler={setBoardIndex} />
                    <Board />
                </>
            ) : (
                <Loader />
            )}
            {modal.isOpen && <FormsModal saveBoard={saveTeam} />}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        boardIndex: state.board.boardIndex,
        boards: state.board.boards,
        modal: state.modal,
        isSaved: state.board.isSaved,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        deleteBoard,
        setBoards,
        openModal,
        setBoardIndex,
        setIsSaved,
    })(TrelloTeam)
);

const HoverText = styled.p`
    position: absolute;
    opacity: 0;
    transform: translateY(-5px);
    margin-top: 0.25rem;
    margin-bottom: 0;
    color: #fff;
    background: #352a4c;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    transition: 0.2s all;
`;
const MembersContainer = styled.div`
    img {
        margin-right: 0.25rem !important;
        position: relative;
        z-index: 1;
        border: 1px solid #fff;

        &:hover + ${HoverText} {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media ${devices.tabletSmall} {
        margin-bottom: 1rem;
        width: 100%;
    }
`;

const ContainerRight = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @media ${devices.tabletSmall} {
        margin-top: 1rem;
    }
`;
