import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { openModal } from '../../actions';
import { Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Activity from './Activity';
import DropdownMenu from './DropdownMenu';

// To optimize, and prevent multiple React renders, React.memo() is used.
// Similar to usage of shouldComponentUpdate()
const ActivityList = React.memo((props) => {
    const { columnID, color } = props;

    return props.activities.map((activity, index) => (
        <Activity
            key={activity[0].id}
            activity={activity[0]}
            index={index}
            columnID={columnID}
            color={color}
        />
    ));
});

function Column({ boardIndex, column, activities, openModal }) {
    const [dropdownShown, setDropdownShown] = useState(false);

    let modalContent = {
        scope: 'column',
        action: 'edit',
        boardID: boardIndex,
        columnID: column.id,
        activityID: '',
        color: column.color,
    };

    function setModalOpen() {
        modalContent.scope = 'activity';
        modalContent.action = 'create';

        openModal(true, modalContent);
    }

    return (
        <Container>
            <Title borderColor={column.color}>{column.title}</Title>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => {
                    return (
                        <ActivitiesContainer
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            <HorisontalDots
                                onClick={() => {
                                    setDropdownShown(true);
                                }}
                            />
                            <DropdownMenu
                                dropdownShown={dropdownShown}
                                setDropdownShown={setDropdownShown}
                                content={modalContent}
                            />
                            <ActivityList
                                activities={activities}
                                columnID={column.id}
                                color={column.color}
                            />
                            {provided.placeholder}
                        </ActivitiesContainer>
                    );
                }}
            </Droppable>

            <ButtonSmall onClick={setModalOpen}>
                <FontAwesomeIcon className='larger' icon={faPlus} />
            </ButtonSmall>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        boardIndex: state.board.boardIndex,
    };
};

export default connect(mapStateToProps, { openModal })(Column);

const Container = styled.div`
    color: #222;
    border: 0;
    text-align: center;
    width: 275px;
    margin-right: 0.5rem;
    position: relative;
    &:last-child {
        margin-right: 0;
    }
`;

const Title = styled.h3`
    font-size: 12px;
    color: #131212;
    margin: 0 0 0.25rem;
    font-weight: 700;
    border-top: 5px solid;
    border-color: ${(props) =>
        props.borderColor ? props.borderColor : '#222'};
    background: #fff;
    padding: 0.5rem 0.25rem;
    border-radius: 2.5px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
    text-align: center;
    text-transform: uppercase;
    height: 3rem;
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
