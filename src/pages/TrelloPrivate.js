import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { getAuthenticatedUser, getCookie } from '../utils/Helpers';

/* STYLES */
import styled from 'styled-components';
import { devices } from '../styles/Devices';
import { Header, HeaderTitle } from '../styles/Header';
import { DropdownButtonSolid, DropdownButton } from '../styles/Buttons';
import { ButtonContainer, Button } from '../styles/Buttons';

/* COMPONENTS */
import Loader from '../components/Loader';
import DropdownMenu from '../components/Board/DropdownMenu';
import BoardList from '../components/Board/BoardList';
import FormsModal from '../components/Form/FormsModal';
import Board from '../components/Board/Board';

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
    modal,
    openModal,
    boardIndex,
    setBoardIndex,
    setBoards,
    boards,
    deleteBoard,
}) => {
    const [values, setValues] = useState({
        isLoading: true,
        btnText: 'Save Changes',
    });
    const [dropdownShown, setDropdownShown] = useState(false);
    const currentBoard = boards[boardIndex];

    const token = getCookie('token');

    useEffect(() => {
        // Get board associated with logged in user ID.
        axios({
            method: 'GET',
            url: `${API_URL}/board/${getAuthenticatedUser()._id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const boardData = response.data;

                setBoards(boardData);
                setValues({ ...values, isLoading: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function saveBoard() {
        // Update specified personal board to DB.
        setValues({ ...values, btnText: 'Save Changes...' });

        axios({
            method: 'PUT',
            url: `${API_URL}/board/update`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                boards: boards,
            },
        })
            .then((response) => {
                setIsSaved(true);
                setValues({ ...values, btnText: 'Save Changes' });
            })
            .catch((error) => {
                console.log(error.response.data.error);
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
                    <b>Personal Board</b>
                    {currentBoard && ' - ' + currentBoard.title}
                </HeaderTitle>

                <ContainerRight>
                    <ButtonContainer>
                        <Button onClick={createBoard}>Add Board</Button>
                        <Button disabled={isSaved} onClick={saveBoard}>
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

            {/* List with all boards */}

            {!values.isLoading ? (
                <>
                    <BoardList clickHandler={setBoardIndex} />
                    <Board />
                </>
            ) : (
                <Loader />
            )}
            {modal.isOpen && <FormsModal saveBoard={saveBoard} />}
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
        setBoards,
        openModal,
        setBoardIndex,
        deleteBoard,
        setIsSaved,
    })(TrelloTeam)
);

const ContainerRight = styled.div`
    display: flex;

    @media ${devices.tabletSmall} {
        margin-top: 1rem;
    }
`;
