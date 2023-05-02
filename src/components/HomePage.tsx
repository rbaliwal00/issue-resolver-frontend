import React, {useState, useEffect} from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { getHomeIssuesApi, upvoteApi } from '../api/IssueApiService';
import { createTheme } from '@mui/material/styles';
import { purple, teal } from '@mui/material/colors';
import { ThemeProvider } from 'react-bootstrap';
import UpvoteButton from '../molecules/UpvoteButton';
import CommentBox from '../molecules/CommentBox';
import GenericButton from '../molecules/GenericButton';

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

const theme = createTheme({
    palette: {
      primary: {
        main: teal[300],
      },     
      secondary: {
        main: teal[300],
      }
    },
  });

const HomePage = () => {
    const [issues, setIssues] = useState<Issue[] | []>([]);

    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));

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

    const handleClick = (id: number) =>{
        setUser(JSON.parse(localStorage.getItem('user-id') || 'null'));
        if(!user){
            return;
        }
        upvoteApi(user.id, id)
        .then((res) => {
            console.log(res.data)
            refreshIssues();
        }).catch(err => {
            console.log(err)
        });
    }

    console.log(issues[0]?.id)

    return (
        <ThemeProvider theme={theme}>
            <Box className='w-11/12 m-auto'>
                <Typography 
                    className='pb-4 text-center text-teal-800' 
                    variant='h4' 
                    style={{fontWeight: 'bold', color: ''}}>Top Issues</Typography>
                {issues.length > 0 && <Grid container columnSpacing={2}>
                    <Grid item xs={7} className='border rounded-md' style={{boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                        <Box className=''  minHeight='500px'>
                            <Box className='text-2xl font-bold font-sans text-center mb-2 mt-4'>
                                {issues[0]?.title}
                            </Box>
                            <Box className='pl-2 mb-2'>
                                <Grid container spacing={2} className='p-2 mt-2'>
                                    <Grid xs={12} sm={2} md={6} className='' >
                                        <Typography>Created by - {issues[0]?.user?.firstName} {issues[0]?.user?.lastName}</Typography>
                                    </Grid>
                                    <Grid xs={12} sm={5} md={6} className='text-right pr-1'>
                                        <Typography>opened this issue on {dateFormatter(issues[0]?.dateCreated)}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box className='text-center bg-slate-100 my-2 mr-3 p-4 rounded-md'>
                                <Typography minHeight='100px'>{issues[0]?.description}</Typography>
                            </Box>
                            <Box>
                                <Box className='p-2'>
                                    <span onClick={() => handleClick(issues[0].id)}><UpvoteButton value={issues[0].votes.length}/></span>
                                    <span className='float-right'><GenericButton text={`Comments ${issues[0]?.comments.length}`}/></span>
                                </Box>
                            </Box>
                            <Box className='mt-4' maxHeight={'250px'} style={{overflowY: 'scroll'}}> 
                                {issues[0]?.comments?.map((comment:any) => (
                                    <CommentBox id={comment.id} user={comment.user} content={comment.content}/>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5} spacing={2} >
                        <Grid item xs={12} className='border rounded-md p-2' minHeight='250px' 
                            style={{boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                            <Box className='p-2'>
                                <Box className='text-2xl font-bold font-sans text-center mt-2 mb-4'>
                                    {issues[1]?.title}
                                </Box>
                                <Box className='pl-2 mb-2'>
                                    <Grid container spacing={2} className=''>
                                        <Grid xs={12} sm={2} md={6} className='' >
                                            <Typography className='pl-2'>Created by - {issues[1]?.user?.email}</Typography>
                                        </Grid>
                                        <Grid xs={12} sm={5} md={6} className='text-right'>
                                            <Typography>opened this issue on {dateFormatter(issues[1]?.dateCreated)}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='text-center bg-slate-100 py-3 rounded-md' >
                                    <Typography minHeight={'100px'} maxHeight={'100px'} >{issues[1]?.description}</Typography>
                                </Box>
                                <Box className='align-text-bottom' sx={{display:'flex',flexDirection: 'column', justifyContent: 'flex-end'}}>
                                    <Box className='pl-2 pb-2' style={{position: 'relative', top: '10px'}}>
                                        <span onClick={() => handleClick(issues[1].id)}><UpvoteButton value={issues[1].votes.length}/></span>
                                        <span className='float-right'><GenericButton text={`Comments ${issues[1]?.comments.length}`}/></span>
                                    </Box>
                                </Box>

                            </Box>
                        </Grid>
                        <Grid item xs={12} className='border rounded-md' minHeight='250px'
                            style={{boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', marginTop: '10px'}}>
                            <Box className='p-2'>
                                <Box className='text-2xl font-bold font-sans text-center mt-2 mb-4'>
                                    {issues[2]?.title}
                                </Box>
                                <Box className='pl-2 pb-4 mb-2'>
                                    <Grid container spacing={2} className=''>
                                        <Grid xs={12} sm={2} md={6} className='' >
                                            <Typography className='pl-3'>Created by - {issues[2]?.user?.email}</Typography>
                                        </Grid>
                                        <Grid xs={12} sm={5} md={6} className='text-right pr-2'>
                                            <Typography>opened this issue on {dateFormatter(issues[2]?.dateCreated)}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='text-center bg-slate-100 py-3 rounded-md' >
                                    <Typography minHeight={'100px'} maxHeight={'100px'} >{issues[2]?.description}</Typography>
                                </Box>
                                <Box className='align-text-bottom' sx={{display:'flex',flexDirection: 'column', justifyContent: 'flex-end'}}>
                                    <Box className='pb-4' style={{position: 'relative', top: '10px'}}>
                                        <span onClick={() => handleClick(issues[2].id)}><UpvoteButton value={issues[2].votes.length}/></span>
                                        <span className='float-right'><GenericButton text={`Comments ${issues[2]?.comments.length}`} /></span>
                                    </Box>
                                </Box>

                            </Box>
                        </Grid>
                    </Grid>
                </Grid>}
            </Box>
        </ThemeProvider>
    );
};

export default HomePage;