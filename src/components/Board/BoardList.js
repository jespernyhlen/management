import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

/* STYLES */
import { devices } from '../../styles/Devices';

import { deleteActivity, openModal, setBoardIndex } from '../../actions';

// Component used to show boards available (semi navbar).
// Can be used within personal boards, or boards witihin a team.
const BoardList = (props) => {
    const { clickHandler, boardIndex, board } = props;

    return (
        <>
            <ListContainer>
                {board.boards.map((item, i) => {
                    return (
                        <ListItem
                            style={{
                                color:
                                    boardIndex === board.boards.indexOf(item)
                                        ? '#000'
                                        : '#666',
                            }}
                            key={i}
                            onClick={() => clickHandler(i)}
                        >
                            {item.title}
                        </ListItem>
                    );
                })}
            </ListContainer>
        </>
    );
};

const mapStateToProps = (state) => {
    return { boardIndex: state.board.boardIndex, board: state.board };
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
    z-index: 10;
    width: fit-content;
    height: auto;
    padding: 1rem 1.5rem 0;

    @media ${devices.tabletSmall} {
        padding: 1rem 0.75rem 0;
    }
`;

const ListItem = styled.a`
    color: #313131;
    padding: 0.5rem 0.75rem;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    border-radius: 2.5px;
    margin-right: 0.75rem;
    transition: 0.1s all;

    &:hover {
        color: #000 !important;
        text-decoration: none;
        cursor: pointer;
    }
`;
