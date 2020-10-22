import React from 'react';
// import GravatarImage from './Gravatar';
import styled from 'styled-components';
import { devices } from '../styles/Devices';

const NavProfile = ({ user }) => {
    return (
        <Container>
            {/* <ProfileImage>
                <GravatarImage email={user.email} size={40} />
            </ProfileImage> */}
            <ProfileInfo>
                <ProfileName>{user.name}</ProfileName>
                <ProfileEmail>{user.email}</ProfileEmail>
            </ProfileInfo>
        </Container>
    );
};

export default NavProfile;

const Container = styled.div`
    border-bottom: 2px solid #9494940a;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    margin-top: 1.75rem;
    padding-left: 1.5rem;

    @media ${devices.tablet} {
        padding-left: 0;
        margin: 3rem 1.5rem 0;
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
    margin-bottom: 1rem;
`;

const ProfileName = styled.p`
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #eee;
`;

const ProfileEmail = styled.p`
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
    color: #868290;
    font-weight: 600;
`;
const ProfileRole = styled(ProfileEmail)`
    text-transform: capitalize;
`;
