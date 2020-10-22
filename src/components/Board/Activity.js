import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

/* STYLES */
import styled from 'styled-components';
import { DropdownButton } from '../../styles/Buttons';

/* COMPONENTS */
import DropdownMenu from './DropdownMenu';
import GravatarImage from '../../layout/Gravatar';

import { deleteActivity } from '../../actions';

// Component for rendering each activity.
const Activity = ({
    boardIndex,
    activity,
    columnID,
    index,
    color,
    deleteActivity,
}) => {
    const [dropdownShown, setDropdownShown] = useState(false);
    const {
        _id,
        title,
        content,
        date,
        noteContent,
        noteColor,
        members,
    } = activity;

    // "Global" modal is created in parent component, gets information from current scope.
    // Modal information associated with current scope Activity.
    let modalContent = {
        scope: 'activity',
        action: 'edit',
        boardID: boardIndex,
        columnID: columnID,
        activityID: _id,
        color: color,
        content: activity,
    };

    // Delete activity with current ID.
    const deleteContent = () => {
        deleteActivity(_id, columnID);
    };

    return (
        <Draggable draggableId={_id} index={index}>
            {(provided, snapshot) => {
                return (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {noteContent && (
                            <Notification BgColor={noteColor}>
                                {noteContent}
                            </Notification>
                        )}
                        <DropdownButton
                            onClick={() => setDropdownShown(true)}
                        />
                        <DropdownMenu
                            dropdownShown={dropdownShown}
                            setDropdownShown={setDropdownShown}
                            content={modalContent}
                            deleteContent={deleteContent}
                        />

                        <Handle {...provided.dragHandleProps}>
                            {title && <Title>{title}</Title>}
                            {content && <Text>{content}</Text>}
                            <BottomContainer>
                                {date && <Date>{date}</Date>}
                                <MembersContainer>
                                    {members.map((member) => {
                                        return (
                                            <GravatarImage
                                                key={member.email}
                                                email={member.email}
                                                size={20}
                                                rounded={true}
                                            />
                                        );
                                    })}
                                </MembersContainer>
                            </BottomContainer>
                        </Handle>
                    </Container>
                );
            }}
        </Draggable>
    );
};

const mapStateToProps = (state) => {
    return {
        boardIndex: state.board.boardIndex,
    };
};

export default connect(mapStateToProps, { deleteActivity })(Activity);

const Container = styled.div`
    position: relative;
    text-align: left;
    background-color: ${(props) => (props.isDragging ? '#f5fbff' : 'white')};
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    border-radius: 2.5px;
    color: #282c34;
    margin-top: 0.5rem;
    padding: 1.25rem 1rem 0.75rem;
`;

const Handle = styled.div`
    white-space: normal;
    width: auto;
    &:hover {
        opacity: 0.75;
    }
    transition: 0.1s all;
`;

const Notification = styled.p`
    background: ${(props) => (props.BgColor ? props.BgColor : '#83BB41')};
    font-size: 9px;
    width: fit-content;
    padding: 1px 6px 1.75px;
    border-radius: 2px;
    color: #fff;
    font-weight: 600;
    margin-bottom: 0.75rem;
`;

const Title = styled.h4`
    font-size: 12px;
    margin-bottom: 0.5rem;
    font-weight: 600;
`;

const Text = styled.p`
    font-size: 10px;
    font-weight: 400;
    margin-bottom: 0.75rem;
`;

const Date = styled.p`
    font-size: 9px;
    font-weight: 400;
    color: #666;
    margin-bottom: 0.5rem;
`;

const BottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.5rem;

    p {
        margin-bottom: 0;
    }
`;

const MembersContainer = styled.div`
    margin-left: 10px;
    img {
        margin-right: 0 !important;
        position: relative;
        margin-left: -10px !important;
        z-index: 1;
        border: 1px solid #fff;
    }
`;
