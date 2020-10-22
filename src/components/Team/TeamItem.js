import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/* STYLES */
import styled from 'styled-components';
import { devices } from '../../styles/Devices';
import { DropdownButton } from '../../styles/Buttons';

/* COMPONENTS */
import GravatarImage from '../../layout/Gravatar';
import DropdownMenu from './DropdownMenu';

// Component for rendering each team.
// With dropdownmenu for CRUD on team.
// Links to teampath, for using CRUD on teams boards.
const TeamItem = ({ team }) => {
    const [dropdownShown, setDropdownShown] = useState(false);

    return (
        <ContainerItem>
            <Link to={`/teams/${team._id}`}>
                <Title>{team.name}</Title>
            </Link>
            <MembersContainer>
                {team.members.map((member) => {
                    return (
                        <Fragment key={member.email}>
                            <GravatarImage
                                email={member.email}
                                size={20}
                                rounded={true}
                            />
                            <HoverText>{member.name}</HoverText>
                        </Fragment>
                    );
                })}
            </MembersContainer>
            <DropdownButton
                light={true}
                onClick={() => setDropdownShown(true)}
            />
            <DropdownMenu
                dropdownShown={dropdownShown}
                setDropdownShown={setDropdownShown}
                content={{
                    scope: 'teams',
                    action: 'edit',
                    teamID: team._id,
                    content: team,
                }}
            />
        </ContainerItem>
    );
};

const mapStateToProps = (state) => {
    return {};
};

export default withRouter(connect(mapStateToProps, {})(TeamItem));

const ContainerItem = styled.div`
    position: relative;
    min-width: 200px;
    background: linear-gradient(125deg, #414488, #286a88);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    border-radius: 2.5px;
    color: #282c34;
    margin-right: 0.5rem;
    padding: 1rem;

    a {
        text-decoration: none !important;
    }

    @media ${devices.tabletSmall} {
        width: 100%;
        margin-bottom: 0.5rem;
        margin-right: 0;
    }
`;

const HoverText = styled.p`
    position: absolute;
    opacity: 0;
    transform: translateY(-5px);
    margin-top: 0.25rem;
    margin-bottom: 0;
    color: #fff;
    background: #352a4c;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
    transition: 0.2s all;
`;
const MembersContainer = styled.div`
    img {
        margin-right: 0.25rem !important;
        position: relative;
        z-index: 1;
        border: 1px solid #fff;

        &:hover + ${HoverText} {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Title = styled.h3`
    font-size: 16px;
    color: #fff;
    padding-bottom: 0.75rem;
    font-weight: 500;
    text-align: left;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.1s all;

    &:hover {
        color: #ccc;
    }
`;
