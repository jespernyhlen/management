import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deleteActivity, openModal } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

function Dropdown(props) {
    const {
        dropdownShown,
        setDropdownShown,
        deleteActivity,
        activityId,
        columnId,
        openModal,
    } = props;

    const wrapperRef = useRef(null);
    const [isVisible, setIsVisible] = useState(dropdownShown);

    useEffect(() => {
        setIsVisible(dropdownShown);
    }, [dropdownShown]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsVisible(false);
            setDropdownShown(false);
        }
    };

    function setModalOpen() {
        // setIsOpen(true);
        openModal(true, 'edit', columnId, activityId);
        setIsVisible(false);
        setDropdownShown(false);
    }

    return (
        <>
            {isVisible && (
                <DropdownContainer ref={wrapperRef}>
                    <DropdownItem
                        onClick={() => {
                            // deleteActivity(activityId, columnId);
                            setModalOpen();
                        }}
                    >
                        Edit
                        <IconContainer>
                            <FontAwesomeIcon icon={faPen} />
                        </IconContainer>
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => {
                            deleteActivity(activityId, columnId);
                        }}
                    >
                        Delete
                        <IconContainer>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </IconContainer>
                    </DropdownItem>
                    <DropdownItem onClick={() => setDropdownShown(false)}>
                        Close
                        <IconContainer>
                            <FontAwesomeIcon
                                className='larger'
                                icon={faTimes}
                            />
                        </IconContainer>
                    </DropdownItem>
                </DropdownContainer>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
    deleteActivity,
    openModal,
})(Dropdown);

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 7.5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 2.5px;
    position: absolute;
    z-index: 5;
    top: 1.25rem;
    left: -1.5px;
    width: calc(100% + 2.5px);
    height: auto;
    padding: 0.75rem 0;
`;

const DropdownItem = styled.a`
    padding: 0.5rem 1rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background: #ddd;
        cursor: pointer;
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;

    .larger {
        font-size: larger;
    }
`;
