import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

/* STYLES */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { devices } from '../../styles/Devices';

/* COMPONENTS */
import Column from './Column';

import { setBoards, moveActivity, moveColumn, openModal } from '../../actions';

// Component used for displaying a board, which renders each column aswell.
// Using react-beautiful-dnd to provide drag n drop functionality.
// And button for creating a new column associated to the board.
const Board = ({ board, boardIndex, moveActivity, moveColumn, openModal }) => {
    const currentBoard = board.boards[boardIndex];

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        if (type === 'column') {
            moveColumn(destination, source, draggableId);
        } else {
            moveActivity(destination, source, draggableId);
        }
    };

    // If button for creating a new column associated to the board is pressed,
    // Set modal information to column.
    const createColumn = () => {
        openModal(true, {
            scope: 'column',
            action: 'create',
            boardID: boardIndex,
        });
    };

    // Find column based on ID.
    // A column order is provided, which then render each column based on order.
    const findColumn = (columnID) => {
        return currentBoard.columns.find((col) => col._id === columnID);
    };

    // Find activity based on ID.
    // A column includes acitivites, which then render each activity associated to the column.
    const findActivities = (activityIDs) => {
        return activityIDs.map((activityID) =>
            currentBoard.activities.find((act) => act._id === activityID)
        );
    };

    return currentBoard ? (
        <>
            <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
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
                            {currentBoard.columnOrder.map((columnID, index) => {
                                let column = findColumn(columnID);
                                let activities = findActivities(
                                    column.activityIDs
                                );

                                return (
                                    <Column
                                        key={column._id}
                                        column={column}
                                        activities={activities}
                                        index={index}
                                    />
                                );
                            })}
                            {provided.placeholder}
                            <ButtonSmall onClick={() => createColumn()}>
                                <FontAwesomeIcon
                                    className='larger'
                                    icon={faPlus}
                                />
                            </ButtonSmall>
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    ) : (
        <p style={{ margin: '1rem', textAlign: 'center' }}>
            You have no boards available..
        </p>
    );
};

const mapStateToProps = (state) => {
    return {
        board: state.board,
        boardIndex: state.board.boardIndex,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        setBoards,
        moveActivity,
        moveColumn,
        openModal,
    })(Board)
);

const Container = styled.div`
    display: flex;
    overflow-y: auto;
    padding: 2rem;
    position: relative;
    flex-grow: 1;

    @media ${devices.tabletSmall} {
        padding: 1.25rem;
    }
`;

const ButtonSmall = styled.button`
    padding: 0.25rem 0.35rem;
    border: 0;
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
