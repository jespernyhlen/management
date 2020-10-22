import React, { useState, useEffect } from 'react';
import { getAuthenticatedUser } from '../../utils/Helpers';

/* STYLES */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/* COMPONENTS */
import GravatarImage from '../../layout/Gravatar';

// Component to render a selectmenu for selecting users.
// "includeself" is used to determand if logged in user must always be selected (cannot remove self).
const DropdownSelect = ({
    includeSelf,
    users,
    selected,
    type,
    handleChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (includeSelf && users.length > 0) {
            const authUser = users.find(
                (user) => user.email === getAuthenticatedUser().email
            );
            if (!selectedOptions.includes(authUser)) {
                handleChange(type, [authUser, ...selectedOptions]);
                return setSelectedOptions([authUser, ...selectedOptions]);
            }
        }
        setSelectedOptions(selected);
    }, [selected, users]);

    const onOptionClicked = (value) => () => {
        let newOptions = [...selectedOptions, value];
        setSelectedOptions(newOptions);
        handleChange(type, newOptions);
        setIsOpen(false);
    };

    const removeSelected = (selected) => {
        if (includeSelf && selected.email === getAuthenticatedUser().email) {
            return;
        }

        let newSelected = selectedOptions.filter((user) => {
            return user.email !== selected.email;
        });
        setSelectedOptions(newSelected);
        handleChange(type, newSelected);
    };

    const userList = () => {
        return users.map((user) => {
            if (!selectedOptions.some((el) => el.email === user.email)) {
                return (
                    <ListItem
                        onClick={onOptionClicked(user)}
                        key={Math.random()}
                    >
                        <GravatarImage
                            email={user.email}
                            size={25}
                            rounded={true}
                            right={'0.75rem'}
                        />
                        {user.name}
                    </ListItem>
                );
            }
        });
    };

    return (
        <DropDownContainer name='users'>
            <DropDownHeader
                className='selector'
                onClick={(e) => {
                    if (e.target.classList.contains('selector')) toggleOpen();
                }}
            >
                {selectedOptions.map((selected) => {
                    return (
                        <SelectedItem
                            key={Math.random()}
                            onClick={() => removeSelected(selected)}
                        >
                            <GravatarImage
                                email={selected.email}
                                size={25}
                                rounded={true}
                                right={'0.75rem'}
                            />
                            {selected.name}
                            <FontAwesomeIcon icon={faTimes} />
                        </SelectedItem>
                    );
                })}
            </DropDownHeader>
            {isOpen && (
                <DropDownListContainer>
                    <DropDownList>
                        {users.length !== selectedOptions.length ? (
                            userList()
                        ) : (
                            <NotFoundText>No users found..</NotFoundText>
                        )}
                    </DropDownList>
                </DropDownListContainer>
            )}
        </DropDownContainer>
    );
};

export default DropdownSelect;

const DropDownContainer = styled.div`
    margin: 0 auto;
`;

const DropDownHeader = styled.ul`
    height: auto;
    min-height: 2.29rem;
    width: 100%;
    padding-top: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid gainsboro;
    background: #f7f7f7;
    outline: 0;
    border-radius: 2.5px;
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.025);
    font-size: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    transition: 0.1s all;
    &:hover {
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.025);
        border: 1px solid #cecece;
        background: #ececec;
    }
`;

const DropDownListContainer = styled.div`
    position: absolute;
    z-index: 100;
    width: 100%;
    margin-bottom: 2rem;
`;

const DropDownList = styled.ul`
    margin: 0;
    background: #ffffff;
    border: 1px solid #d4d9dd;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    color: #3faffa;
    font-weight: 500;
    border-radius: 2.5px;
    padding: 0.5rem;
`;

const ListItem = styled.li`
    list-style: none;
    border: 1px solid;
    border-color: rgba(30, 124, 252, 0.24);
    background-color: rgba(30, 124, 252, 0.06);
    border-radius: 2.5px;
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.5rem;
    color: #222;
    font-size: 0.9rem;

    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }
    &:hover {
        color: #666;
        background-color: rgba(30, 124, 252, 0.04);
    }
`;

const SelectedItem = styled(ListItem)`
    width: fit-content;
    display: inline-block;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    border-radius: 60px;
    border: 1px solid #ffffff;
    background: #f7f7f7;
    padding: 0;
    padding-right: 0.75rem;
    box-shadow: 0 1px 7.5px rgba(0, 0, 0, 0.15);

    &:last-child {
        margin-bottom: 0.5rem;
    }

    svg {
        margin-left: 1rem;
        color: #666;
    }
`;

const NotFoundText = styled.p`
    margin-bottom: 0;
    color: #666;
    font-size: 0.9rem;
    margin-left: 0.5rem;
    padding: 2px;
`;
