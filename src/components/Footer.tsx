import { Box } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <Box sx={{position:'absolute', bottom: 0, width: '90%', height:'40px'}}>
            <Box className='text-4xl mb-10 font-bold text-fuchsia-700' >
                Footer 
            </Box>
        </Box>
    )
}


export default Footer;