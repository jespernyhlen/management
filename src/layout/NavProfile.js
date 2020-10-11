import React from 'react';
import GravatarImage from './Gravatar';
import styled from 'styled-components';
import { devices } from '../styles/Devices';

const NavProfile = ({ user }) => {
    return (
        <Container>
            <ProfileImage>
                <GravatarImage email={user.email} size={40} />
            </ProfileImage>
            <ProfileInfo>
                <ProfileName>{user.name}</ProfileName>
                <ProfileEmail>{user.email}</ProfileEmail>
            </ProfileInfo>
        </Container>
    );
};

export default NavProfile;

const Container = styled.div`
    display: flex;
    border-bottom: 1px solid #281f3a;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    margin-top: 1.5rem;

    @media ${devices.tablet} {
        margin-top: 0.5rem;
    }
`;

const ProfileInfo = styled.div`
    text-align: left;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ProfileImage = styled.div`
    text-align: center;
    margin-bottom: 1rem;
`;

const ProfileName = styled.p`
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #eee;
`;

const ProfileEmail = styled.p`
    font-size: 0.6rem;
    margin-bottom: 0.25rem;
    color: #eee;
`;
const ProfileRole = styled(ProfileEmail)`
    text-transform: capitalize;
`;
