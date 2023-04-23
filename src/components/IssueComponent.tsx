import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, TextField, Typography } from '@mui/material';
import TitleDescription from '../atoms/TitleDescription';
import { margin } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/app/hooks';
import { getAllExpertsApi, retrieveIssueApi } from '../api/IssueApiService';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import { createCommentApi, retrieveAllCommentsForIssue } from '../api/CommentApiService';

interface IssueComponent{
    id: string;
    title: string
    user: any;
    description: string;
    dateCreated: Date;
    open: boolean;
    comments: any;
    assignees: any;
    votes: any;
}

interface Assignee{
    id: string;
    firstName: string
    lastName: any;
    email: string;
}

interface CommentInterface{
    id: number;
    content: string;
    user: any;
}


const IssueComponent = () => {
    const [issue, setIssue] = useState<IssueComponent | null>(null);

    const navigate = useNavigate();

    const id = useAppSelector((state) => state.issue.id);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const [message, setMessgae] = useState<string|null>(null);
    const [assigneeSelected, setAssigneeSelected] = useState<string | null>("");
    const[content, setContent] = useState("");
    const [assignees, setAssignees] = useState<Assignee[] | []>([]);
    const [comments, setComments] = useState<CommentInterface[] | []>([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addNewTodo = () =>{
        navigate(`/issue/-1`)
    }

    const updateTodo = (id:number) =>{
        navigate(`/issue/${id}`)
    }

    useEffect(() => {
        retrieveIssue();
        retrieveAssignees();
        retrieveComments();
    },[]);


    const retrieveIssue = () =>{
        retrieveIssueApi(user.id, id)
        .then((res) => {
            setIssue(res.data);
        })
        .catch((error) => {

        })
    }

    const retrieveAssignees = () =>{
        getAllExpertsApi()
        .then((res) => {
            console.log(res.data);
            setAssignees(res.data);
        })
        .catch((error) => {

        })
    }

    const dateFormatter = (date: any) =>{
        if(date == null) return;
        return new Date(date[0], date[1], date[2]).toLocaleDateString();
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const handleSubmit = () =>{
        console.log(assigneeSelected);
        setAssigneeSelected(null);
        setOpen(false);
    }

    const retrieveComments = () =>{
        retrieveAllCommentsForIssue(id)
        .then((res) => {
            setComments(res.data);
        }).catch(err => {
            console.log(err)
        });
    }

    const addComment = (event:any) =>{
        event.preventDefault();
        const comment = {
            content: content
        }
        createCommentApi(id,comment)
        .then((res) => {
            setContent("");
            retrieveIssue();
        })
        .catch(err => console.log(issue));
    }
  
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
                                {issue?.votes.length}
                                </Box>
                            </Button>
                            <Button sx={{float:'right'}}>
                                Comments {issue?.comments.length}
                            </Button>
                        </Box>
                        
                        {issue?.comments?.map((comment:any) => (
                            <Box className='border rounded-md mb-5' key={comment.id}>
                                <Box className='pl-3 p-1 border'>{comment.user?.firstName} {comment.user?.lastName}</Box>
                                <Box>
                                    <Box className='p-3'>{comment.content}</Box>
                                </Box>
                            </Box>
                        ))}
                        
                        {user == null ? <Box>
                                Signin
                            </Box>:
                            <form className='mt-10'>
                            <Box className='border rounded-md'>
                                <Box className='pl-3 p-1'>username</Box>
                                <Box>
                                    <TextField rows={2} multiline 
                                    placeholder='Leave a comment' sx={{ width: '100%' }} 
                                    value={content} onChange={(e) => setContent(e.target.value)}>
                                    </TextField>
                                </Box>
                                <Box className='bg-green-800 text-white rounded-md'
                                    sx={{
                                    paddingX:'25px',
                                    paddingY:'4px',
                                    fontSize:'14px', 
                                    float: 'right',
                                    marginLeft:'20px',
                                    cursor:'pointer'
                                    }}        
                                    onClick={addComment}>
                                        Comment
                                </Box>
                            </Box>
                        </form>
                        }
                    </Box>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Box className='mt-10 p-2 border-b-2'>
                        <Typography sx={{fontWeight:'600'}}>Assignees<SettingsOutlinedIcon sx={{float: 'right'}} onClick={handleOpen} /></Typography>
                        <Typography>No one {issue?.user.id === user.id && <span> - assign yourself</span>}</Typography> 
                    </Box>
                    <Box className='px-2 mt-5'>
                        <Typography sx={{fontWeight:'600'}}>Labels<SettingsOutlinedIcon sx={{float: 'right'}}/></Typography>
                        
                    </Box>
                </Grid>
            </Grid>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Assign Upto 3 people to this issue
          </Typography>
          <Autocomplete
        id="free-solo-2-demo"
        disableClearable
        options={assignees.map((assignee) => assignee.email)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"    
            InputProps={{
              ...params.InputProps,
              type: 'search',
              
            }}
            value={assigneeSelected}
            
          />
        )}
        onChange={(event:any, newValue: string | null)=> setAssigneeSelected(newValue)}
      />
      <button onClick={handleSubmit}>submit</button>
        </Box>
      </Modal>
        </Box>
    );
};

export default IssueComponent;