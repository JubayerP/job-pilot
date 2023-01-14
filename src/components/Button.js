import React from 'react';

const Button = ({sx}) => {
    return (
        <div>
            <Button variant="contained" {...sx}>Contained</Button>
        </div>
    );
};

export default Button;