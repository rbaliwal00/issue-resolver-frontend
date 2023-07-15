import { Box } from '@mui/material';
import React from 'react';
import { CommentBoxProps } from '../resources/interfaces/CommentBoxProps';

const CommentBox = ({id, user, content}: CommentBoxProps) => {
    return (
        <Box className='border rounded-md mb-5' key={id}>
            <Box className='pl-3 p-1 border bg-sky-100 font-semibold'>
                <span style={{marginLeft:'10px'}}>{user?.firstName.toLowerCase()} {user?.lastName.toLowerCase()}</span></Box>
            <Box>
                <Box className='p-3 bg-white '>{content}</Box>
            </Box>
        </Box>
    );
};

export default CommentBox;