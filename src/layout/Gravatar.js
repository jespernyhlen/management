import React from 'react';
import Gravatar from 'react-gravatar';

const GravatarImage = ({ email, size, rounded }) => {
    return (
        <Gravatar
            email={email}
            size={size}
            style={{
                margin: '0 auto',
                borderRadius: rounded ? '50%' : '2.5px',
                marginRight: '1rem',
            }}
        />
    );
};

export default GravatarImage;
