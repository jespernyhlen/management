import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

/* STYLES */
import styled from 'styled-components';
import { DropdownButton } from '../../styles/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/* COMPONENTS */
import DropdownMenu from './DropdownMenu';
import ActivityList from './ActivityList';

import { openModal, deleteColumn } from '../../actions';

// Component for rendering each column in a board.
// And button for creating a new activity associated to the column.
const Column = ({
    boardIndex,
    column,
    activities,
    openModal,
    index,
    deleteColumn,
}) => {
    const [dropdownShown, setDropdownShown] = useState(false);
    const { _id, title, color } = column;

    // "Global" modal is created in parent component, gets information from current scope.
    // Modal information associated with current scope Column.
    let modalContent = {
        scope: 'column',
        action: 'edit',
        boardID: boardIndex,
        columnID: _id,
        color: color,
        content: column,
    };

    // If button for creating a new activity associated to the column is pressed,
    // Set modal information to activity instead.
    const createActivity = () => {
        openModal(true, {
            ...modalContent,
            scope: 'activity',
            action: 'create',
        });
    };

    // Delete column with current ID.
    const deleteContent = () => {
        deleteColumn(_id);
    };

    return (
        <Draggable draggableId={_id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <Title {...provided.dragHandleProps} borderColor={color}>
                        {title}
                    </Title>
                    <Droppable droppableId={_id} type='activity'>
                        {(provided, snapshot) => {
                            return (
                                <ActivitiesContainer
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <DropdownButton
                                        onClick={() => setDropdownShown(true)}
                                    />
                                    <DropdownMenu
                                        dropdownShown={dropdownShown}
                                        setDropdownShown={setDropdownShown}
                                        content={modalContent}
                                        deleteContent={deleteContent}
                                    />
                                    {activities.length > 0 && (
                                        <ActivityList
                                            activities={activities}
                                            columnID={_id}
                                            color={color}
                                        />
                                    )}

                                    {provided.placeholder}
                                </ActivitiesContainer>
                            );
                        }}
                    </Droppable>

                    <ButtonSmall onClick={createActivity}>
                        <FontAwesomeIcon className='larger' icon={faPlus} />
                    </ButtonSmall>
                </Container>
            )}
        </Draggable>
    );
};

const mapStateToProps = (state) => {
    return {
        boardIndex: state.board.boardIndex,
    };
};

export default connect(mapStateToProps, { openModal, deleteColumn })(Column);

const Container = styled.div`
    color: #222;
    border: 0;
    border-radius: 2.5px;
    background-color: ${(props) =>
        props.isDragging ? '#f4f5f9cc' : 'transparent'};
    text-align: center;
    width: 275px;
    margin-right: 1.75rem;
    position: relative;
    height: fit-content;

    &:last-child {
        margin-right: 0;
    }
`;

const Title = styled.h3`
    font-size: 16px;
    color: #131212;
    margin: 0 0 1.5rem;
    font-weight: 700;
    border-bottom: 3px solid;
    border-color: ${(props) =>
        props.borderColor ? props.borderColor : '#222'};
    padding: 0.5rem 0.25rem;
    text-align: left;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ActivitiesContainer = styled.div`
    font-size: 13px;
    color: #222;
    background-color: ${(props) =>
        props.isDraggingOver ? '#f6f7fa' : 'transparent'};
    transition: 0.05s all;
    border-radius: 2.5px;
    margin-bottom: 0.5rem;
    width: inherit;
`;

const ButtonSmall = styled.button`
    padding-top: 0.2em;
    border: 0;
    cursor: pointer;
    color: #3a3a3a;
    background: transparent;
    font-size: smaller;
    width: 100%;
    background: #ffffff69;
    border-radius: 2.5px;
    box-shadow: 0 2.5px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #efefef;
    height: 25px;
    transition: 0.1s all;

    path {
        fill: #666;
    }

    &:hover {
        background: #fefefe;
    }
`;
