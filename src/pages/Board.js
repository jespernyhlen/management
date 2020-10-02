import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    getAuthenticatedUser,
    getCookie,
    removeAuthenticatedUser,
    updateUser,
} from '../utils/Helpers';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Notification from '../components/Notification';
import {
    moveActivity,
    setBoard,
    setIsInitialized,
    setIsSaved,
} from '../actions';

import styled from 'styled-components';
import Column from '../components/Column';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

function Board({
    history,
    board,
    setBoard,
    moveActivity,
    isInitialized,
    setIsInitialized,
    isSaved,
    setIsSaved,
}) {
    const [values, setValues] = useState({
        buttonText: 'Save Changes',
    });
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        moveActivity(destination, source, draggableId);
        if (isSaved) setIsSaved(false);
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
                    console.log(response.data);
                    const { activities, columns, columnOrder } = response.data;

                    setBoard(activities, columns, columnOrder);
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

    const saveBoard = () => {
        console.log(board);
        // setValues({ ...values, buttonText: 'Updating' });
        setValues({ ...values, buttonText: 'Save Changes..' });
        let data = {
            activities: board.activities,
            columns: board.columns,
            columnOrder: board.columnOrder,
        };
        axios({
            method: 'PUT',
            url: `${API_URL}/board/update`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                console.log(response);
                setIsSaved(true);
                setValues({ ...values, buttonText: 'Save Changes' });
                Notification('Board saved successfully', 'success');
            })
            .catch((error) => {
                console.log(error.response.data.error);
                Notification(error.response.data.error, 'danger');
            });
    };
    return (
        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
            <Container>
                {board.columnOrder.map((columnID) => {
                    let column = board.columns.filter(function (col) {
                        return col.id === columnID;
                    });
                    const activities = column[0].activityIDs.map(
                        (activityID) => {
                            return board.activities.filter(function (act) {
                                return act.id === activityID;
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
                })}
                <ButtonContainer>
                    <Button disabled={isSaved} onClick={saveBoard}>
                        {values.buttonText}
                    </Button>
                </ButtonContainer>
            </Container>
        </DragDropContext>
    );
}

const mapStateToProps = (state) => {
    return {
        board: state.board,
        isInitialized: state.board.isInitialized,
        isSaved: state.board.isSaved,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        moveActivity,
        setBoard,
        setIsInitialized,
        setIsSaved,
    })(Board)
);

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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

const Button = styled.button`
    width: 100%;
    font-size: 0.9rem;
    cursor: pointer;
    position: relative;
    text-align: center;
    opacity: 1;
    border-radius: 5px;
    padding: 0.75rem 2.5rem;
    font-weight: 600;
    color: #fff;
    border: 0;
    background: #5aac44;
    transition: 0.1s all;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;
