import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    getAuthenticatedUser,
    getCookie,
    removeAuthenticatedUser,
} from '../utils/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { PageNav, PageNavTitle } from '../styles/Layout';
import { ButtonContainer, Button } from '../styles/Buttons';
import {
    moveActivity,
    setBoard,
    setBoards,
    setBoardIndex,
    setIsInitialized,
    setIsSaved,
    openModal,
} from '../actions';

import BoardForm from '../components/Form/BoardForm';
import SaveButton from '../components/Board/SaveButton';
import BoardList from '../components/Board/BoardList';
import DropdownMenu from '../components/Board/DropdownMenu';
import Column from '../components/Board/Column';
import ColumnForm from '../components/Form/ColumnForm';
import ActivityForm from '../components/Form/ActivityForm';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

function Board({
    history,
    board,
    boards,
    setBoards,
    boardIndex,
    moveActivity,
    isInitialized,
    setIsInitialized,
    openModal,
    modalOpen,
    modalInfo,
}) {
    const [dropdownShown, setDropdownShown] = useState(false);
    const [boardListShown, setBoardListShown] = useState(false);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        moveActivity(destination, source, draggableId);
    };

    const token = getCookie('token');

    useEffect(() => {
        if (!isInitialized) {
            axios({
                method: 'GET',
                url: `${API_URL}/board/${getAuthenticatedUser()._id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setBoards(response.data);
                    setIsInitialized(true);
                })
                .catch((error) => {
                    if (error.response.status !== 200) {
                        removeAuthenticatedUser(() => {
                            history.push('/');
                        });
                    }
                });
        }
    }, []);

    function setModalOpen(scope) {
        let modalInfo = {
            scope: scope,
            action: 'create',
            boardID: boardIndex,
        };
        openModal(true, modalInfo);
    }

    function showFormModal() {
        let scope = modalInfo.scope;

        if (scope === 'board') return <BoardForm />;
        if (scope === 'column') return <ColumnForm />;
        if (scope === 'activity') return <ActivityForm />;
    }

    let gotBoards = boards.length > 0;

    return (
        isInitialized && (
            <>
                <PageNav>
                    <PageNavTitle>
                        Activity Board
                        {gotBoards ? ' - ' + boards[boardIndex].title : null}
                    </PageNavTitle>
                    <HorisontalDots
                        onClick={() => {
                            setDropdownShown(true);
                        }}
                    />
                    {gotBoards && (
                        <DropdownMenu
                            dropdownShown={dropdownShown}
                            setDropdownShown={setDropdownShown}
                            content={{
                                scope: 'board',
                                action: 'edit',
                                boardID: boardIndex,
                                columnID: '',
                                activityID: '',
                                color: board.color,
                            }}
                        />
                    )}

                    <ContainerRight>
                        <ButtonContainer noMargin={true}>
                            <Button
                                bgColor={'#3e60ad'}
                                style={{
                                    marginRight: '1rem',
                                }}
                                onClick={() => {
                                    setModalOpen('board');
                                }}
                            >
                                <PlusIcon icon={faPlus} /> Add Board
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer noMargin={true}>
                            <Button
                                bgColor={'#3e60ad'}
                                style={{
                                    marginRight: '1rem',
                                }}
                                onClick={() => {
                                    setBoardListShown(true);
                                }}
                            >
                                <ArrowIcon icon={faAngleDown} /> Choose Board
                            </Button>
                        </ButtonContainer>

                        <SaveButton />
                    </ContainerRight>
                </PageNav>
                {gotBoards && (
                    <>
                        <SemiNav>
                            <BoardList
                                boardListShown={boardListShown}
                                setBoardListShown={setBoardListShown}
                            />
                        </SemiNav>
                        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
                            <Container>
                                {boards[boardIndex].columnOrder.map(
                                    (columnID) => {
                                        let column = boards[
                                            boardIndex
                                        ].columns.filter(function (col) {
                                            return col.id === columnID;
                                        });

                                        const activities = column[0].activityIDs.map(
                                            (activityID) => {
                                                return boards[
                                                    boardIndex
                                                ].activities.filter(function (
                                                    act
                                                ) {
                                                    return (
                                                        act.id === activityID
                                                    );
                                                });
                                            }
                                        );

                                        return (
                                            <Column
                                                key={column[0].id}
                                                column={column[0]}
                                                activities={activities}
                                            />
                                        );
                                    }
                                )}

                                <ButtonSmall
                                    onClick={() => {
                                        setModalOpen('column');
                                    }}
                                >
                                    <FontAwesomeIcon
                                        className='larger'
                                        icon={faPlus}
                                    />
                                </ButtonSmall>
                            </Container>
                        </DragDropContext>
                    </>
                )}
                {modalOpen && showFormModal()}
            </>
        )
    );
}

const mapStateToProps = (state) => {
    return {
        board: state.board,
        boards: state.board.boards,
        boardIndex: state.board.boardIndex,
        modalOpen: state.modal.modalOpen,
        modalInfo: state.modal.info,
        isInitialized: state.board.isInitialized,
        isSaved: state.board.isSaved,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        moveActivity,
        setBoard,
        setBoards,
        setBoardIndex,
        setIsInitialized,
        setIsSaved,
        openModal,
    })(Board)
);

const ContainerRight = styled.div`
    display: flex;
`;

const Container = styled.div`
    display: flex;
`;

const SemiNav = styled.div``;
const PlusIcon = styled(FontAwesomeIcon)`
    margin-right: 2.5px;
    font-size: 0.775rem;
`;

const ArrowIcon = styled(FontAwesomeIcon)`
    margin-right: 2.5px;
    margin-bottom: -1px;
    font-size: 1rem;
`;

const HorisontalDots = styled.div`
    width: 13.5px;
    height: 13.5px;
    background-image: radial-gradient(circle, #666 1px, #13131300 1.5px);
    background-size: 100% 33.33%;
    transform: rotate(90deg);
    position: absolute;
    right: 9.5px;
    top: 8px;
    cursor: pointer;
    z-index: 10;
    transition: 0.1s all;

    &:hover {
        background-image: radial-gradient(circle, #000 1px, #13131300 1.5px);
    }
`;

const ButtonSmall = styled.button`
    padding: 0.25rem 0.35rem;
    border: 0;
    border-top: 5px solid;
    border-color: #3e60ad;
    cursor: pointer;
    color: #3a3a3a;
    background: transparent;
    font-size: smaller;
    width: 25px;
    height: 3rem;
    background: #ffffff69;
    border-radius: 2.5px;
    box-shadow: 0 2.5px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.1s all;

    path {
        fill: #666;
    }

    &:hover {
        background: #fefefe;
    }
`;
