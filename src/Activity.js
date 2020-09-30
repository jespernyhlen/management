import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Dropdown from './Dropdown';

function Activity({ activity, columnId, index }) {
    const { id, title, content, date, notification } = activity;

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
                        {notification.content && (
                            <Notification BgColor={notification.color}>
                                {notification.content}
                            </Notification>
                        )}
                        <HorisontalDots
                            onClick={() => {
                                setDropdownShown(true);
                            }}
                        ></HorisontalDots>
                        <Dropdown
                            dropdownShown={dropdownShown}
                            setDropdownShown={setDropdownShown}
                            activityId={id}
                            columnId={columnId}
                        />

                        <Handle {...provided.dragHandleProps}>
                            {title && <Title>{title}</Title>}
                            {content && <Text>{content}</Text>}
                            {date && <Date>{date}</Date>}
                        </Handle>
                    </Container>
                );
            }}
        </Draggable>
    );
}

export default Activity;

const Container = styled.div`
    position: relative;
    text-align: left;
    background-color: white;
    opacity: ${(props) => (props.isDragging ? '0.95' : '1')};
    border: 2px solid transparent;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    border-radius: 2.5px;
    color: #282c34;
    margin-top: 1rem;
    padding: 0.5rem 0.75rem;
`;

const Handle = styled.div`
    &:hover {
        opacity: 0.75;
    }
    transition: 0.1s all;
`;

const Notification = styled.p`
    background: ${(props) => (props.BgColor ? props.BgColor : '#83BB41')};
    font-size: 11px;
    width: fit-content;
    padding: 1.5px 5px 3px;
    border-radius: 2px;
    color: #fff;
    top: -1.2rem;
    left: 10px;
    position: absolute;
`;

const HorisontalDots = styled.div`
    width: 13.5px;
    height: 13.5px;
    background-image: radial-gradient(circle, #666 1px, #13131300 1.5px);
    background-size: 100% 33.33%;
    transform: rotate(90deg);
    position: absolute;
    right: 7.5px;
    top: 2.5px;
    cursor: pointer;
    transition: 0.1s all;

    &:hover {
        background-image: radial-gradient(circle, #000 1px, #13131300 1.5px);
    }
`;

const Title = styled.h4`
    font-size: 12px;
    margin-bottom: 0.5rem;
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
`;
