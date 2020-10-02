import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { openModal } from '../actions';
import { Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Activity from './Activity';
import ActivityForm from '../Form/ActivityForm';

// To optimize, and prevent multiple React renders, React.memo() is used.
// Similar to usage of shouldComponentUpdate()
const ActivityList = React.memo((props) => {
    const { columnID } = props;

    return props.activities.map((activity, index) => (
        <Activity
            key={activity[0].id}
            activity={activity[0]}
            index={index}
            columnID={columnID}
        />
    ));
});

function Column({
    column,
    activities,
    modalOpen,
    modalIdColumn,
    modalIdActivity,
    openModal,
}) {
    function setModalOpen() {
        openModal(true, 'create', column.id);
    }

    return (
        <Container borderColor={column.color}>
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => {
                    return (
                        <ActivitiesContainer
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            <ActivityList
                                activities={activities}
                                columnID={column.id}
                            />
                            {provided.placeholder}
                        </ActivitiesContainer>
                    );
                }}
            </Droppable>
            {modalOpen && modalIdColumn === column.id ? (
                <ActivityForm columnID={column.id} />
            ) : null}
            <ButtonSmall onClick={setModalOpen}>
                <FontAwesomeIcon className='larger' icon={faPlus} />
            </ButtonSmall>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modal.modalOpen,
        modalType: state.modal.modalType,
        modalIdColumn: state.modal.modalIdColumn,
        modalIdActivity: state.modal.modalIdActivity,
    };
};

export default connect(mapStateToProps, { openModal })(Column);

const Container = styled.div`
    color: #222;
    border: 0;
    border-top: 7.5px solid;
    border-color: ${(props) =>
        props.borderColor ? props.borderColor : '#222'};
    background-color: #f9f9f9;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5rem;
    text-align: center;
`;

const Title = styled.h3`
    font-size: 14px;
    color: #222;
    margin: 0.75rem 0 1.25rem;
    font-weight: 700;
`;

const ActivitiesContainer = styled.div`
    font-size: 13px;
    color: #222;
    background-color: ${(props) =>
        props.isDraggingOver ? '#efefef' : '#f9f9f9'};
    transition: 0.05s all;
    border-radius: 2.5px;
`;

const ButtonSmall = styled.button`
    padding: 0.25rem 0.35rem;
    border: 0;
    cursor: pointer;
    color: #3a3a3a;
    margin: 0.5rem 0 0;
    transition: 0.1s all;
    background: transparent;
    font-size: small;

    path {
        fill: #666;
    }

    &:hover {
        background: #e8e8e8;
    }
`;
