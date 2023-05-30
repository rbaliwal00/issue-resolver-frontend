import { Typography } from '@mui/material';
import { Box,Stack } from '@mui/system';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';
import GenericButton from '../molecules/GenericButton';

const MainContent = () => {
    return (
        <Box className='bg-slate-100'>
            <Box className='w-10/12 m-auto pt-2 ' height="calc(100vh - 100px)">
                <Box className='text-4xl font-black'>Welcome to I-Tracker</Box>
                <Box className='text-xl font-black mt-12'>Some ideas to get you started</Box>
                <Stack direction="row" spacing={2} className='mt-6'>
                    <Box className='w-1/3 bg-white rounded-md p-4' 
                        style={{boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                        <Typography fontWeight={700}>Create Issue</Typography>
                        <Typography fontWeight={100} className='mt-4'>
                            Having questions or a problems then create an issue to get resolutions.
                        </Typography>
                        <Box className='pt-4'><GenericButton text='New Issue'/></Box>
                    </Box>
                    <Box className='w-1/3 bg-white rounded-md p-4' 
                        style={{boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                        <Typography fontWeight={700}>Join Community</Typography>
                        <Typography fontWeight={100} className='mt-4'>
                        Discover communities in the workspace directory.
                        </Typography>
                        <NavLink to='/directory' ><Box 
                            className='bg-cyan-700 hover:bg-cyan-600' 
                            maxWidth={"180px"}
                            style={{paddingLeft:'30px',
                                paddingRight: '30px',
                                paddingTop:'5px',
                                paddingBottom: '5px', 
                                color:'white', 
                                borderRadius:'5px',
                                cursor: 'pointer',
                                marginTop: '20px'
                                }}>
                            Open Directory
                        </Box></NavLink>
                    </Box>
                </Stack>
                <Box className='w-2/4 bg-white rounded-md mt-4 p-4' 
                        style={{boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                        <Typography fontWeight={700}>Documentation</Typography>
                        <Typography fontWeight={100} className='mt-4'>
                            Learn how to unlock the myriad possibilities of I-Tracker.
                        </Typography>
                        <Box 
                            className='bg-cyan-700 hover:bg-cyan-600' 
                            maxWidth={"180px"}
                            style={{paddingLeft:'18px',
                                paddingRight: '15px',
                                paddingTop:'6px',
                                paddingBottom: '6px', 
                                color:'white', 
                                borderRadius:'5px',
                                cursor: 'pointer',
                                marginTop: '20px'
                                }}>
                            See Documentation
                        </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MainContent;