import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, TextField, Typography } from '@mui/material';
import TitleDescription from '../atoms/TitleDescription';
import { margin } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/app/hooks';
import { retrieveIssueApi } from '../api/IssueApiService';

interface IssueComponent{
    id: string;
    title: string
    user: any;
    description: string;
    dateCreated: Date;
    open: boolean;
    
}

const IssueComponent = () => {
    const [issue, setIssue] = useState<IssueComponent | null>(null);

    const navigate = useNavigate();

    const id = useAppSelector((state) => state.issue.id);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const [message, setMessgae] = useState<string|null>(null);

    const addNewTodo = () =>{
        navigate(`/issue/-1`)
    }

    const updateTodo = (id:number) =>{
        navigate(`/issue/${id}`)
    }

    useEffect(() => {
        retrieveIssue();
    },[]);


    const retrieveIssue = () =>{
        retrieveIssueApi(user.id, id)
        .then((res) => {
            console.log(res.data);
            setIssue(res.data);
        })
        .catch((error) => {

        })
    }

    const dateFormatter = (date: any) =>{
        if(date == null) return;
        return new Date(date[0], date[1], date[2]).toLocaleDateString();
    }

    console.log(issue?.dateCreated);
    return (
        <Box className='w-10/12 m-auto'>
            <Box className='border-b p-2'>
                <Box className='text-3xl font-bold font-sans'>
                    {issue?.title}
                    <Box className='bg-green-800 text-white rounded-md'
                        sx={{
                        paddingX:'25px',
                        fontSize:'14px', 
                        float: 'right',
                        marginLeft:'20px',
                        cursor:'pointer'
                        }}        
                        onClick={addNewTodo}>
                            New Issue
                    </Box>
                    <Box className='bg-gray-800 text-white rounded-md'
                        sx={{
                        paddingX:'25px',
                        fontSize:'14px', 
                        float: 'right',
                        marginLeft:'20px',
                        cursor:'pointer'
                        }}        
                        onClick={() => updateTodo(issue?.id)}>
                            Edit Issue
                    </Box>
                </Box>

                <Box className='pt-6 pl-2'>
            <Grid container spacing={2} >
                <Grid xs={12} md={1} className='mr-2'>
                {issue?.open ? <Button variant='contained'
                            color='success'
                            sx={{borderRadius: '18px', paddingX:'20px', fontSize:'14px', paddingY:'3px'}}>Open
                    </Button> : <Button variant='contained'
                            color='primary'
                            sx={{borderRadius: '18px', paddingX:'20px', fontSize:'14px', paddingY:'3px'}}>
                        Closed
                    </Button>}
                    
                </Grid>
                <Grid xs={12} sm={2} md={1} className='mr-10' >
                    <Typography>{issue?.user?.email}</Typography>
                </Grid>
                <Grid xs={12} sm={5} md={3} className=''>
                    <Typography>opened this issue on {dateFormatter(issue?.dateCreated)}</Typography>
                </Grid>
                {/* <Grid xs={12} sm={2} md={1} className=''>
                    <Typography>0 upvotes</Typography>
                </Grid>
                <Grid xs={12} sm={2} md={1} className=''>
                    <Typography>0 comments</Typography>
                </Grid> */}
            </Grid>
            
        </Box>
            </Box>
            <Grid container spacing={2} >
                <Grid xs={12} sm={8} className='m-auto mt-8'>
                    <Box>
                        <Box className='font-black text-lg pl-2'>Description</Box>
                        <Box className='border rounded-md p-2' sx={{ m: 1, width: '80%' }}>
                            {issue?.description}
                        </Box>
                    </Box>
                    <Box sx={{width: '80%'}}>
                        <Box className='p-2'>
                            <Button sx={{paddingY:'1px'}} variant='outlined'>
                                <ArrowUpwardIcon/>
                                <Box className='ml-2'>
                                    100
                                </Box>
                            </Button>
                            <Button sx={{float:'right'}}>
                                Comments 100
                            </Button>
                        </Box>
                        
                        <TextField rows={2} multiline placeholder='Leave a comment' sx={{ m: 1, width: '100%' }}>
                            
                        </TextField>
                    </Box>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Box className='mt-10 p-10'>
                        <Typography sx={{fontWeight:'600'}}>Assignees<SettingsOutlinedIcon sx={{float: 'right'}}/></Typography>
                        
                    </Box>
                    <Box className='px-10'>
                        <Typography sx={{fontWeight:'600'}}>Labels<SettingsOutlinedIcon sx={{float: 'right'}}/></Typography>
                        
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default IssueComponent;