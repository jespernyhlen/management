import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    deleteBoard,
    deleteColumn,
    deleteActivity,
    openModal,
} from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
    DropdownContainer,
    DropdownItem,
    IconContainer,
} from '../../styles/Dropdown';

function BoardDropdown(props) {
    const {
        dropdownShown,
        setDropdownShown,
        deleteBoard,
        deleteColumn,
        deleteActivity,
        content,
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
        let modalInfo = content;
        openModal(true, modalInfo);
        setIsVisible(false);
        setDropdownShown(false);
    }

    function deleteContent(type) {
        switch (type) {
            case 'board':
                deleteBoard(content.boardID);
                break;
            case 'column':
                deleteColumn(content.columnID);
                break;
            case 'activity':
                deleteActivity(content.activityID, content.columnID);
                break;
            default:
                break;
        }
    }

    return (
        <>
            {isVisible && (
                <DropdownContainer ref={wrapperRef}>
                    <DropdownItem
                        onClick={() => {
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
                            setDropdownShown(false);
                            deleteContent(content.scope);
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

const mapStateToProps = (state) => ({ boardIndex: state.board.boardIndex });

export default connect(mapStateToProps, {
    deleteBoard,
    deleteColumn,
    deleteActivity,
    openModal,
})(BoardDropdown);
