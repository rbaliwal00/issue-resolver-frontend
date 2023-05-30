import { Box, Stack, Snackbar, Alert, Grid, Typography } from '@mui/material';
import React,{useState, useEffect} from 'react';
import { retrieveCommuityApi, userRequestingCommunity } from '../../api/CommunityApiService';
import {
    Link,
    useParams,
  } from "react-router-dom";

  import LockIcon from '@mui/icons-material/Lock';
  import VisibilityIcon from '@mui/icons-material/Visibility';
import GenericButton from '../../molecules/GenericButton';

interface CommunityComponent{
    id: number;
    name: string
    user: any;
    description: string;
    // dateCreated: Date;
    // open: boolean;
    // comments: any;
    // assignees: any;
    // votes: any;
    requestingUsers: any;
}


const CommunityComponent = () => {

    const [community, setCommunity] = useState<CommunityComponent | null>(null);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const [code, setCode] = useState('NON-MEMBER');
    const { id } = useParams();

    const [open, setOpen] = React.useState(false);
    const [message, setMessgae] = useState<string | null>(null);
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    useEffect(() => {
        retrieveCommunity();
    },[code]);

    const retrieveCommunity = () =>{
        retrieveCommuityApi(Number(id))
        .then((res) => {
            console.log(res.data.requestingUsers[0].firstName)
            setCommunity(res.data);
            if(res.data?.admin.id === user?.id){
                setCode('ADMIN');
                return;
            }
            res.data.requestingUsers.map((req:any) => {
                if(req?.id === user?.id){
                    setCode('REQUESTED');
                }
            })
            res.data.members.map((req:any) => {
                if(req?.id === user?.id){
                    setCode('MEMBER');
                }
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleClick = async () =>{
        if(user === null){
            setMessgae('Login to Join Community');
            setOpen(true);
            return;
        }
        await userRequestingCommunity(Number(id), user?.id);
        retrieveCommunity();
    }

    return (
        <Box className='w-full lg:w-9/12 m-auto mt-4'>
            <span className='text-3xl'>{community?.name}</span>
                <Link to="/manage-members" className='float-right'><GenericButton text='Manage Members'/></Link>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <Grid container spacing={2} className='w-3/4 bg-white rounded-md mt-2 p-4'
                    style={{boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}>
                    <Grid item xs={8}>
                        <Box>
                            <Box className='text-xl font-semibold'>About</Box>
                            <Box className='mt-1 font-light'>{community?.description}</Box>
                            <Stack direction={'row'} spacing={1} className='mt-2'>
                                <Box className='font-light'><LockIcon fontSize='small'/></Box>
                                <Box className='' style={{fontSize:'18px', fontWeight: '500'}}>Private</Box>
                            </Stack>
                            <Box>Only members can see who's in the group and what they post.</Box>
                            <Stack direction={'row'} spacing={1} className='mt-2'>
                                <Box className='font-light'><VisibilityIcon /></Box>
                                <Box className='' style={{fontSize:'18px', fontWeight: '500'}}>Visible</Box>
                            </Stack>  
                        </Box>
                    </Grid>
                    <Grid item xs={4} style={{textAlign: 'right'}}>
                        <Box>
                            <Box className='text-xl font-semibold mb-2'>Total Members: 10</Box>
                            <Box className='text-xl font-semibold'>Total Issues: 20</Box>
                            {code === 'NON-MEMBER' && <Box className='mt-16 text-right' onClick={handleClick}><GenericButton text='Join Community'/></Box>}
                            {code === 'REQUESTED' && <Box className='mt-16 text-right'><GenericButton text='REQUESTED'/></Box>}
                            {code === 'MEMBER' && <Box className='mt-16 text-right'><GenericButton text='MEMBER'/></Box>}
                            {code === 'ADMIN' && <Box className='mt-16 font-light'>You created this community.</Box>}
                        </Box>
                    </Grid>
                </Grid> 
                <Box>
                    <Typography>Community Requests</Typography>
                    {community?.requestingUsers.map((user: any) => (
                        <div>
                        <div>{user.firstName}</div>
                        </div>
                    ))}
                </Box>
        </Box>
    );
};

export default CommunityComponent;