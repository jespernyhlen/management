import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GravatarImage from '../../layout/Gravatar';
import { Draggable } from 'react-beautiful-dnd';
import DropdownMenu from './DropdownMenu';
import { HorisontalDots } from '../../styles/Buttons';

function Activity({ boardIndex, activity, columnID, index, color }) {
    const { id, title, content, date, notification, members } = activity;

    const [dropdownShown, setDropdownShown] = useState(false);

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => {
                return (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {notification[0].content && (
                            <Notification BgColor={notification[0].color}>
                                {notification[0].content}
                            </Notification>
                        )}
                        <HorisontalDots
                            onClick={() => {
                                setDropdownShown(true);
                            }}
                        />
                        <DropdownMenu
                            dropdownShown={dropdownShown}
                            setDropdownShown={setDropdownShown}
                            content={{
                                scope: 'activity',
                                action: 'edit',
                                boardID: boardIndex,
                                columnID: columnID,
                                activityID: id,
                                color: color,
                            }}
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
}

const mapStateToProps = (state) => {
    return {
        boardIndex: state.board.boardIndex,
    };
};

export default connect(mapStateToProps, {})(Activity);

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
    img {
        margin-right: 0 !important;
        position: relative;
        margin-left: -10px !important;
        z-index: 1;
        border: 1px solid #fff;
    }
`;
