import React from 'react';
import Gravatar from 'react-gravatar';

const GravatarImage = ({ email, size, rounded, right }) => {
    return (
        <Gravatar
            email={email}
            size={size}
            style={{
                margin: '0 auto',
                borderRadius: rounded ? '50%' : '2.5px',
                marginRight: right ? right : '1rem',
            }}
        />
    );
};

export default GravatarImage;
