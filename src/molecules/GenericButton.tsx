import { Box } from '@mui/material';
import React from 'react';

interface ButtonProps{
    text: string;
}

const GenericButton = ({text}: ButtonProps) => {
    return (
        <span 
            className='bg-cyan-700 hover:bg-cyan-600' 
            style={{paddingLeft:'50px',
                paddingRight: '50px',
                paddingTop:'8px',
                paddingBottom: '8px', 
                color:'white', 
                borderRadius:'5px',
                cursor: 'pointer'
                }}>
            {text}
        </span>
    );
};

export default GenericButton;