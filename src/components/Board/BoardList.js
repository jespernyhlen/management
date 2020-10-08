import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deleteActivity, openModal, setBoardIndex } from '../../actions';

function BoardList(props) {
    const {
        boardListShown,
        setBoardListShown,
        boards,
        setBoardIndex,
        boardIndex,
    } = props;

    const wrapperRef = useRef(null);
    const [isVisible, setIsVisible] = useState(boardListShown);

    useEffect(() => {
        setIsVisible(boardListShown);
    }, [boardListShown]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsVisible(false);
            setBoardListShown(false);
        }
    };

    function setModalOpen() {
        setIsVisible(false);
        setBoardListShown(false);
    }

    return (
        <>
            {isVisible && (
                <ListContainer ref={wrapperRef}>
                    {boards.map((board, i) => {
                        return (
                            <ListItem
                                style={{
                                    color:
                                        boardIndex === boards.indexOf(board)
                                            ? '#000'
                                            : '#666',
                                }}
                                key={i}
                                onClick={() => {
                                    setBoardIndex(i);
                                    setModalOpen();
                                }}
                            >
                                {board.title}
                            </ListItem>
                        );
                    })}
                </ListContainer>
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    return { boards: state.board.boards, boardIndex: state.board.boardIndex };
};

export default connect(mapStateToProps, {
    deleteActivity,
    openModal,
    setBoardIndex,
})(BoardList);

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 2.5px;
    z-index: 11;
    width: fit-content;
    height: auto;
    padding: 0.75rem;
    margin-top: -1.975rem;
`;

const ListItem = styled.a`
    color: #313131;
    padding: 0.5rem 0.75rem;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
    border-radius: 2.5px;
    margin-right: 0.75rem;
    transition: 0.1s all;

    &:hover {
        color: #000 !important;
        text-decoration: none;
        cursor: pointer;
    }
`;
