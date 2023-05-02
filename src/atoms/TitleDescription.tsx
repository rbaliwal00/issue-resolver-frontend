import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const TitleDescription = (username:any, isOpen:any, date:any) => {

    console.log(date);
    return (
        <Box className='pt-6 pl-2'>
            <Grid container spacing={2} >
                <Grid xs={12} md={1} className='mr-2'>
                    <Button variant='contained'
                            color='success'
                            sx={{borderRadius: '18px', paddingX:'25px', fontSize:'14px', paddingY:'3px'}}>
                        Open
                    </Button>
                </Grid>
                <Grid xs={12} sm={2} md={1} className=''>
                    <Typography>{username?.username}</Typography>
                </Grid>
                <Grid xs={12} sm={5} md={3} className=''>
                    <Typography>opened this issue on {date}</Typography>
                </Grid> 
            </Grid>
            
        </Box>
    );
};

export default TitleDescription;