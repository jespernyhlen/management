import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { devices } from '../styles/Devices';
import axios from 'axios';
import {
    getAuthenticatedUser,
    getCookie,
    removeAuthenticatedUser,
} from '../utils/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { PageNav, PageNavTitle } from '../styles/Layout';
import { ButtonContainer, Button, HorisontalDots } from '../styles/Buttons';
import {
    moveActivity,
    moveColumn,
    setBoard,
    setBoards,
    setBoardIndex,
    setIsSaved,
    openModal,
    setUsers,
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

function Board(props) {
    const {
        width,
        history,
        board,
        boards,
        setBoards,
        boardIndex,
        moveColumn,
        moveActivity,
        openModal,
        modalOpen,
        modalInfo,
        setUsers,
    } = props;
    const [isInitialized, setIsInitialized] = useState(false);
    const [dropdownShown, setDropdownShown] = useState(false);
    const [boardListShown, setBoardListShown] = useState(false);

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        if (type === 'column') {
            moveColumn(destination, source, draggableId);
        } else {
            moveActivity(destination, source, draggableId);
        }
    };

    const token = getCookie('token');

    const getBoardData = axios({
        method: 'GET',
        url: `${API_URL}/board/${getAuthenticatedUser()._id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const getUsers = axios({
        method: 'GET',
        url: `${API_URL}/users`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        if (!isInitialized) {
            axios
                .all([getBoardData, getUsers])
                .then(
                    axios.spread((...responses) => {
                        const boardData = responses[0].data;
                        const usersData = responses[1].data;
                        setIsInitialized(true);
                        setBoards(boardData);
                        setUsers(usersData);
                    })
                )
                .catch((errors) => {
                    const errorOne = errors[0];
                    const errorTwo = errors[1];
                    // react on errors.
                    if (
                        errorOne.response.status !== 200 ||
                        errorTwo.response.status !== 200
                    ) {
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

    const columns = () => {
        return (
            <Droppable
                droppableId='all-columns'
                direction='horizontal'
                type='column'
            >
                {(provided) => (
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {boards[boardIndex].columnOrder.map(
                            (columnID, index) => {
                                let i = boardIndex;
                                let column = boards[i].columns.find(
                                    (col) => col.id === columnID
                                );

                                let activities = column.activityIDs.map(
                                    (activityID) =>
                                        boards[i].activities.filter(
                                            (act) => act.id === activityID
                                        )
                                );

                                return (
                                    <Column
                                        key={column.id}
                                        column={column}
                                        activities={activities}
                                        index={index}
                                    />
                                );
                            }
                        )}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        );
    };

    return (
        isInitialized && (
            <>
                <PageNav>
                    <PageNavTitle>
                        <b>Activity Board</b>
                        {gotBoards ? ' - ' + boards[boardIndex].title : null}
                    </PageNavTitle>
                    <HorisontalDots onClick={() => setDropdownShown(true)} />
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
                            <NavButton onClick={() => setModalOpen('board')}>
                                <PlusIcon icon={faPlus} />
                                {width > 1024 && 'Add Board'}
                            </NavButton>
                        </ButtonContainer>
                        <ButtonContainer noMargin={true}>
                            <NavButton onClick={() => setBoardListShown(true)}>
                                <ArrowIcon icon={faAngleDown} />
                                {width > 1024 && 'Choose Board'}
                            </NavButton>
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
                                {columns()}
                                <ButtonSmall
                                    onClick={() => setModalOpen('column')}
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
        width: state.resize.width,
        board: state.board,
        boards: state.board.boards,
        boardIndex: state.board.boardIndex,
        modalOpen: state.modal.modalOpen,
        modalInfo: state.modal.info,
        isSaved: state.board.isSaved,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        moveActivity,
        moveColumn,
        setBoard,
        setBoards,
        setBoardIndex,
        setIsSaved,
        openModal,
        setUsers,
    })(Board)
);

const ContainerRight = styled.div`
    display: flex;
`;

const NavButton = styled(Button)`
    background: #3e60ad;
    margin-right: 1rem;

    svg {
        margin-right: 0.5rem;
    }
    @media ${devices.laptopSmall} {
        padding: 10px 15px;

        svg {
            margin-right: 0;
        }
    }
`;

const Container = styled.div`
    display: flex;
    overflow-y: auto;
    padding-bottom: 1.75rem;
    height: 100%;
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

const ButtonSmall = styled.button`
    padding: 0.25rem 0.35rem;
    margin-left: 0.5rem;
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
