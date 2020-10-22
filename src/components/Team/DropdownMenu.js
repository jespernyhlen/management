import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCookie, getAuthenticatedUser } from '../../utils/Helpers';

/* STYLES */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignOutAlt,
    faPen,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

/* COMPONENTS */
import {
    DropdownContainer,
    DropdownItem,
    IconContainer,
} from '../../styles/Dropdown';

import { openModal, deleteTeam } from '../../actions';

import { API_URL } from '../../constants';

const token = getCookie('token');

const BoardDropdown = (props) => {
    const {
        dropdownShown,
        setDropdownShown,
        content,
        openModal,
        deleteTeam,
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
        let currentRef = wrapperRef.current;

        if (currentRef && !currentRef.contains(event.target)) {
            setDropdownShown(false);
        }
    };

    function setModalOpen() {
        openModal(true, content);
    }

    function closeDropdown(next) {
        setDropdownShown(false);
        next();
    }

    function removeUser() {
        // Remove logged in user from team members array.
        // Then update and save team without current user.
        let newMembers = content.content.members.filter(
            (member) => member.email !== getAuthenticatedUser().email
        );
        content.content.members = newMembers;

        axios({
            method: 'PUT',
            url: `${API_URL}/teams/update`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                _id: content.content._id,
                members: content.content.members,
            },
        })
            .then((response) => {
                deleteTeam(content.content._id);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            {isVisible && (
                <DropdownContainer ref={wrapperRef}>
                    <DropdownItem onClick={() => closeDropdown(setModalOpen)}>
                        Edit
                        <IconContainer>
                            <FontAwesomeIcon icon={faPen} />
                        </IconContainer>
                    </DropdownItem>
                    <DropdownItem onClick={() => closeDropdown(removeUser)}>
                        Leave
                        <IconContainer>
                            <FontAwesomeIcon icon={faSignOutAlt} />
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
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
    openModal,
    deleteTeam,
})(BoardDropdown);
