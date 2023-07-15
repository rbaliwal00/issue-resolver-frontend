import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, TextField, Typography } from '@mui/material';
import TitleDescription from '../../atoms/TitleDescription';
import { margin } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import { addAssigneeApi, closeIssueApi, getAllExpertsApi, retrieveIssueNotLoggedIn, upvoteApi } from '../../api/IssueApiService';
import { createCommentApi, retrieveAllCommentsForIssue } from '../../api/CommentApiService';
import UpvoteButton from '../../molecules/UpvoteButton';
import GenericButton from '../../molecules/GenericButton';
import CommentBox from '../../molecules/CommentBox';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete';

interface IssueComponent{
    id: number;
    title: string
    user: any;
    description: string;
    dateCreated: Date;
    open: boolean;
    comments: any;
    assignees: any;
    votes: any;
}

interface CommentInterface{
    id: number;
    content: string;
    user: any;
}

interface Assignee{
    id: string;
    firstName: string
    lastName: any;
    email: string;
}

const IssueComponent = () => {
    const [issue, setIssue] = useState<IssueComponent | null>(null);
    const [comments, setComments] = useState<CommentInterface[] | []>([]);
    const navigate = useNavigate();

    const id:number = useAppSelector((state) => state.issue.id);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const [username, setUserName] = useState<any>(JSON.parse(localStorage.getItem('user-email') || 'null'));
    const [userrole, setUserRole] = useState<any>(JSON.parse(localStorage.getItem('user-role') || 'null'));
    const [userFullName, setUserFullName] = useState<any>(JSON.parse(localStorage.getItem('username') || 'null'));
    const [message, setMessgae] = useState<string|null>(null);
    const [assignees, setAssignees] = useState<Assignee[] | []>([]);
    const [isAssignees, setIsAssignees] = useState(false);
    const [assigneeSelected, setAssigneeSelected] = useState<string | null>("");
    const[content, setContent] = useState("");  

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const addNewTodo = () =>{
        navigate(`/issue/-1`)
    }

    const updateTodo = (id:any) =>{
        navigate(`/issue/${id}`)
    }

    useEffect(() => {
        retrieveIssue();
    },[user]);

    const addComment = (event:any) =>{
        event.preventDefault();
        const comment = {
            content: content
        }
        createCommentApi(user?.id,id,comment)
        .then((res) => {
            setContent("");
            retrieveIssue();
        })
        .catch(err => console.log(issue));
    }

    useEffect(() => {
        retrieveIssue();
        retrieveComments();
        retrieveAssignees();
    },[]);

    const retrieveIssue = () =>{
        retrieveIssueNotLoggedIn(id)
        .then((res) => {
            setIssue(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const retrieveComments = () =>{
        retrieveAllCommentsForIssue(id)
        .then((res) => {
            setComments(res.data);
        }).catch(err => {
            console.log(err)
        });
    }

    const retrieveAssignees = () =>{
        getAllExpertsApi()
        .then((res) => {
            setAssignees(res.data);
            res.data.forEach((assignee: any)=> {
                if(assignee.id === user.id){
                    setIsAssignees(true);
                }
            })
        })
        .catch((error) => {

        })
    }

    const dateFormatter = (date: any) =>{
        if(date == null) return;
        return new Date(date[0], date[1], date[2]).toLocaleDateString();
    }

    const handleClick = (id: any) =>{
        setUser(JSON.parse(localStorage.getItem('user-id') || 'null'));
        if(!user){
            return;
        }
        upvoteApi(user?.id, id)
        .then((res) => {
            console.log(res.data)
            retrieveIssue();
        }).catch(err => {
            console.log(err)
        });
    }

    const handleSubmit = () =>{
        if(assigneeSelected!== null){
            addAssigneeApi(assigneeSelected, id)
            .then((res) => {
                console.log(res.data)
                retrieveIssue();
            }).catch(err => {
                console.log(err)
            });
    
            setAssigneeSelected(null);
            setOpen(false);
        }
    }

    const handleCloseIssue = (id:number) =>{
        issue?.assignees.forEach((assignee:any) => {
            if(user.id === assignee.id){
                closeIssueApi(id)
                .then((res) => {
                    retrieveIssue();
                }).catch(err => {
                    console.log(err)
                });
            }
            return;
        });
        if(user.id === issue?.user.id ){
            closeIssueApi(id)
            .then((res) => {
                retrieveIssue();
            }).catch(err => {
                console.log(err)
            });
        }
    }

    const handleDeleteIssue = () =>{
        console.log("deleted issue");   
    }

    console.log(isAssignees)

    return (
        <Box className='w-10/12 m-auto'>
            
            <Box className='border-b p-2'>
                <Box className='text-3xl font-bold font-mono'>
                    {issue?.title}
                    
                    <Box className='bg-green-900 text-white rounded-md'
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
                    {issue?.user?.id === user?.id && <Box className='bg-gray-800 text-white rounded-md'
                        sx={{
                        paddingX:'25px',
                        fontSize:'14px', 
                        float: 'right',
                        marginLeft:'20px',
                        cursor:'pointer'
                        }}        
                        onClick={() => updateTodo(issue?.id)}>
                            Edit Issue
                    </Box>}
                </Box>

                <Box className='pt-6'>
            <Grid container spacing={2} >
                <Grid xs={12} md={1} className='mr-2'>
                    <button
                        className='text-white'
                            style={{borderRadius: '18px',
                            fontSize:'14px'}}>
                        {issue?.open ?
                            <p className='px-4 py-1 bg-green-700 rounded-2xl'>Open</p> : 
                            <p className='px-4 py-1 bg-rose-700 rounded-2xl'>Closed</p>
                        }
                    </button>
                </Grid>
                <Grid xs={12} sm={2} md={2} className='mr' >
                    <Typography>{issue?.user?.email}</Typography>
                </Grid>
                <Grid xs={12} sm={5} md={3} className=''>
                    <Typography>opened this issue on {dateFormatter(issue?.dateCreated)}</Typography>
                </Grid>
            </Grid>
            
        </Box>
            </Box>
            <Grid container spacing={2} >
                <Grid xs={12} sm={8} className='m-auto mt-8'>
                    <Box>
                        <Box className='font-black text-lg pl-2 mt-6'>Description</Box>
                        <Box className='border rounded-md p-2 bg-white  ' sx={{ m: 1, width: '80%' }}>
                            {issue?.description}
                        </Box>
                    </Box>
                    <Box sx={{width: '80%'}}>
                        <Box className='py-4'>
                            <span onClick={() => handleClick(issue?.id)}><UpvoteButton value={issue?.votes.length}/></span>
                            <span className='float-right'><GenericButton text={`Comments ${issue?.comments.length}`}/></span>
                            {/* <span className='float-right'>
                                <button className='bg-slate-700 font-black font-mono'
                                    style={{paddingLeft:'50px',
                                        paddingRight: '50px',
                                        paddingTop:'5px',
                                        paddingBottom: '5px', 
                                        color:'white', 
                                        borderRadius:'5px'}}
                                        onClick={() => handleCloseIssue(issue?.id)}
                                    >Close issue</button>
                            </span> */}
                        </Box>
                        {issue?.comments?.map((comment:any) => (
                            <CommentBox id={issue?.id} user={comment?.user} content={comment?.content}/>
                        ))}
                        {user == null ? <Box>
                                <Link to="/login" className='text-blue-600'>Signin</Link> to Comment on Issue!
                            </Box>:
                            <form className='mt-10'>
                            <Box className='border rounded-md'>
                                <Box className='pl-3 p-1 bg-sky-100 font-semibold'>
                                    <span style={{marginLeft:'10px'}}>{userFullName?.name.toLowerCase()}</span>
                                </Box>
                                <Box>
                                    <TextField rows={2} multiline 
                                    placeholder='Leave a comment' sx={{ width: '100%', background: 'white' }} 
                                    value={content} onChange={(e) => setContent(e.target.value)}>
                                    </TextField>
                                    <Box onClick={addComment} 
                                        style={{textAlign: 'center',
                                            marginTop: '10px',
                                            marginBottom: '10px',
                                            cursor: 'pointer'}}>
                                        <GenericButton text='Comment'/>
                                    </Box>
                                </Box>
                                
                            </Box>
                        </form>
                        }
                        

                    </Box>
                </Grid>
                <Grid xs={12} sm={4}>
                    <Box className='mt-10 p-2 border-b-2'>
                        <Typography sx={{fontWeight:'600'}}>Assignees<SettingsOutlinedIcon sx={{float: 'right'}} onClick={handleOpen} /></Typography>
                        {issue?.assignees.length === 0 && userrole?.role === 'CUSTOMER' && <Typography>No one yet!</Typography> }
                        {issue?.assignees.length === 0 && userrole?.role === 'EXPERT' && <Typography onClick={handleOpen}>No one yet! Assign Someone</Typography> }
                        {issue?.assignees.map((assignee:any) => (
                            <div>{assignee?.email}</div>
                        ))}
                    </Box>
                    {/* <Box onClick={handleDeleteIssue} className='' style={{marginTop: '10px'}}>
                        <DeleteIcon />
                        Delete Issue
                    </Box> */}
                    {/* <Box className='px-2 mt-5'>
                        <Typography sx={{fontWeight:'600'}}>Labels<SettingsOutlinedIcon sx={{float: 'right'}}/></Typography>
                    </Box> */}
                    <Box className='px-2 mt-5'>
                    {(isAssignees || user?.id === issue?.user?.id) && issue?.open && <Box>
                        <Box className='font-black'>
                            Close Issue if it is completed or resolved.
                        </Box>
                        <span className=''>
                            <button className='bg-slate-700 font-black font-mono'
                                style={{paddingLeft:'20px',
                                    paddingRight: '20px',
                                    paddingTop:'5px',
                                    paddingBottom: '5px', 
                                    color:'white', 
                                    borderRadius:'5px'}}
                                    onClick={() => handleCloseIssue(issue?.id)}
                                >Close issue</button>
                        </span></Box>}
                        {/* {!issue?.open && <Box>
                        <Box className='font-bold'>
                            Reopen issue if needed.
                        </Box>
                        <span className=''>
                            <button className='bg-amber-400 font-black font-mono'
                                style={{paddingLeft:'20px',
                                    paddingRight: '20px',
                                    paddingTop:'5px',
                                    paddingBottom: '5px', 
                                    color:'white', 
                                    borderRadius:'5px'}}
                                    onClick={() => handleCloseIssue(issue?.id)}
                                >Reopen issue</button>
                        </span></Box>} */}
                    </Box>
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                {userrole?.role === 'EXPERT' ? <Box sx={style}>
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
                    <Box onClick={handleSubmit} sx={{marginTop: '20px'}}><GenericButton text='Submit'/></Box>    
                </Box> : <Box sx={style}>Only users with role of experts can assign issues to Assignees.</Box>}
            </Modal>
        </Box>
    );
};

export default IssueComponent;