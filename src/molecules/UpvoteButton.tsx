import React from 'react';
import { Box, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { UpvoteProps } from '../resources/interfaces/UpvoteProps';


const UpvoteButton = ({value}: UpvoteProps) => {
    return (
        <span>
            <span 
                className='bg-cyan-700'
                style={{paddingLeft:'20px',
                    paddingRight: '20px',
                    paddingTop:'8px',
                    paddingBottom: '8px', 
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '18px',
                    cursor: 'pointer'}}>
                <span className='mr-1'><ArrowUpwardIcon /></span>
                <span>{value}</span>
            </span>  
        </span>
    );
};

export default UpvoteButton;