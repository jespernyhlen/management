import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GravatarImage from '../../layout/Gravatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function DropdownSelect({ users, selected, type, handleChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        setSelectedOptions(selected);
    }, [selected]);

    const onOptionClicked = (value) => () => {
        let newOptions = [...selectedOptions, value];
        setSelectedOptions(newOptions);
        handleChange(type, newOptions);
        setIsOpen(false);
    };

    const removeSelected = (selected) => {
        let newSelected = selectedOptions.filter((user) => {
            return user.email !== selected.email;
        });
        setSelectedOptions(newSelected);
        handleChange(type, newSelected);
    };
    console.log(selectedOptions);

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
}

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
    background: #fff;
    border: 1px solid #aaa;
    outline: 0;
    border-radius: 2.5px;
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.025);
    font-size: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    &:hover {
        color: #666;
        background-color: rgba(255, 255, 255, 0.75);
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
    border: 0;
    background: #efefef;
    padding: 0;
    padding-right: 0.75rem;

    &:last-child {
        margin-bottom: 0.5rem;
    }

    svg {
        margin-left: 0.5rem;
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
