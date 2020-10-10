import React from 'react';
import Gravatar from 'react-gravatar';
import styled from 'styled-components';

const NavProfile = ({ user }) => {
    return (
        <Container>
            <ProfileImage>
                <Gravatar
                    email={user.email}
                    size={50}
                    style={{
                        margin: '0 auto',
                        borderRadius: '50%',
                    }}
                />
            </ProfileImage>
            <ProfileName>{user.name}</ProfileName>
            <ProfileEmail>{user.email}</ProfileEmail>
            <ProfileRole>{user.role}</ProfileRole>
        </Container>
    );
};

export default NavProfile;

const Container = styled.div`
    text-align: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 3rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
`;

const ProfileImage = styled.div`
    text-align: center;
    margin-bottom: 1rem;
`;

const ProfileName = styled.p`
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
    color: #666;
`;
const ProfileRole = styled(ProfileEmail)`
    text-transform: capitalize;
`;
