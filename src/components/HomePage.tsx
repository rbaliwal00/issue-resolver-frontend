import React, {useState, useEffect} from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { getHomeIssuesApi } from '../api/IssueApiService';

interface Issue{
    id: number;
    title: string
    user: any;
    description: string;
    dateCreated: Date;
    isOpen: boolean;
    comments: any;
    votes: any;
}

const HomePage = () => {
    const [issues, setIssues] = useState<Issue[] | []>([]);

    useEffect(() => {
        refreshIssues();
    },[]);

    const refreshIssues = () =>{
        getHomeIssuesApi()
        .then(res => {
            console.log(res.data);
            setIssues(res.data);
        })
        .catch(error => console.log(error));
    }

    const dateFormatter = (date: any) =>{
        return new Date(date[0], date[1], date[2]).toLocaleDateString();
    }

    return (
        <Box className='w-11/12 m-auto'>
            <Typography 
                className='pb-4 text-center' 
                variant='h4' 
                style={{fontWeight: 'bold'}}>Top Issues</Typography>
            {issues.length > 0 && <Grid container columnSpacing={2}>
                <Grid item xs={7} className='border rounded-md' >
                    <Box className='' style={{}} minHeight='500px'>
                        <Box className='text-2xl font-bold font-sans text-center mb-2 mt-4'>
                            {issues[0]?.title}
                        </Box>
                        <Box className='pl-2 mb-2'>
                            <Grid container spacing={2} className='p-2 mt-2'>
                                <Grid xs={12} sm={2} md={6} className='' >
                                    <Typography>{issues[0]?.user?.email}</Typography>
                                </Grid>
                                <Grid xs={12} sm={5} md={6} className='text-right'>
                                    <Typography>opened this issue on {dateFormatter(issues[0]?.dateCreated)}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className='text-center bg-slate-100 my-2 mr-3 p-4'>
                            <Typography style={{overflowY: 'scroll'}} minHeight='100px'>{issues[0]?.description}</Typography>
                        </Box>
                        <Box>
                            <Box className='p-2'>
                                <Button sx={{paddingY:'1px'}} variant='outlined'>
                                    <ArrowUpwardIcon/>
                                    <Box className='ml-2'>
                                        {issues[0]?.votes.length}
                                    </Box>
                                </Button>
                                <Button sx={{float:'right'}}>
                                    Comments {issues[0]?.comments.length}
                                </Button>
                            </Box>
                        </Box>
                        {/* {issue?.comments?.map((comment:any) => (
                            <Box className='border rounded-md mb-5' key={comment.id}>
                                <Box className='pl-3 p-1 border'>{comment.user?.firstName} {comment.user?.lastName}</Box>
                                <Box>
                                    <Box className='p-3'>{comment.content}</Box>
                                </Box>
                            </Box>
                        ))} */}
                    </Box>
                </Grid>
                <Grid item xs={5} spacing={2} >
                    <Grid item xs={12} className='border rounded-md p-2' minHeight='250px'>
                        <Box className='p-2'>
                            <Box className='text-2xl font-bold font-sans text-center mt-2 mb-4'>
                                {issues[1]?.title}
                            </Box>
                            <Box className='pl-2 mb-2'>
                                <Grid container spacing={2} className=''>
                                    <Grid xs={12} sm={2} md={6} className='' >
                                        <Typography>{issues[1]?.user?.email}</Typography>
                                    </Grid>
                                    <Grid xs={12} sm={5} md={6} className='text-right'>
                                        <Typography>opened this issue on {dateFormatter(issues[1]?.dateCreated)}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box className='text-center bg-slate-100 py-3' >
                                <Typography minHeight={'100px'} maxHeight={'100px'} style={{overflowY: 'scroll'}}>{issues[1]?.description}</Typography>
                            </Box>
                            <Box className='align-text-bottom' sx={{display:'flex',flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Box className='p-2' style={{position: 'relative', top: '10px'}}>
                                    <Button sx={{paddingY:'1px'}} variant='outlined'>
                                        <ArrowUpwardIcon/>
                                        <Box className='ml-2'>
                                            {issues[1]?.votes.length}
                                        </Box>
                                    </Button>
                                    <Button sx={{float:'right'}}>
                                        Comments {issues[1]?.comments.length}
                                    </Button>
                                </Box>
                            </Box>

                        </Box>
                    </Grid>
                    <Grid item xs={12} className='border rounded-md' minHeight='250px' style={{marginTop: '10px'}}>
                    <Box className='p-2'>
                        <Box className='text-2xl font-bold font-sans text-center mt-2 mb-4'>
                                {issues[2]?.title}
                            </Box>
                            <Box className='pl-2 mb-2'>
                                <Grid container spacing={2} className=''>
                                    <Grid xs={12} sm={2} md={6} className='' >
                                        <Typography>{issues[2]?.user?.email}</Typography>
                                    </Grid>
                                    <Grid xs={12} sm={5} md={6} className='text-right'>
                                        <Typography>opened this issue on {dateFormatter(issues[2]?.dateCreated)}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box className='text-center bg-slate-100 py-3' >
                                <Typography minHeight={'100px'} maxHeight={'100px'} style={{overflowY: 'scroll'}}>{issues[2]?.description}</Typography>
                            </Box>
                            <Box className='align-text-bottom' sx={{display:'flex',flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Box className='p-2' style={{position: 'relative', top: '10px'}}>
                                    <Button sx={{paddingY:'1px'}} variant='outlined'>
                                        <ArrowUpwardIcon/>
                                        <Box className='ml-2'>
                                            {issues[2]?.votes.length}
                                        </Box>
                                    </Button>
                                    <Button sx={{float:'right'}}>
                                        Comments {issues[2]?.comments.length}
                                    </Button>
                                </Box>
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Grid>}
        </Box>
    );
};

export default HomePage;