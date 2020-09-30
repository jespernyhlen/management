import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveActivity } from './actions';

import styled from 'styled-components';
import Column from './Column';

function Board({ board, moveActivity }) {
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        moveActivity(destination, source, draggableId);
    };

    return (
        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
            <Container>
                {board.columnOrder.map((columnId) => {
                    const column = board.columns[columnId];
                    const activities = column.activityIds.map(
                        (activityId) => board.activities[activityId]
                    );
                    return (
                        <Column
                            key={column.id}
                            column={column}
                            activities={activities}
                        />
                    );
                })}
            </Container>
        </DragDropContext>
    );
}

const mapStateToProps = (state) => {
    return {
        board: state.board,
    };
};

export default withRouter(connect(mapStateToProps, { moveActivity })(Board));

const Container = styled.div`
    padding: 2rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, 225px);
    align-items: start;
    justify-content: center;
    max-width: 1080px;
    margin: 0 auto;
`;
