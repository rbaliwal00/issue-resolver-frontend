import { Box, Stack, Snackbar, Alert, Grid, Tab, Tabs, Typography } from '@mui/material';
import React,{useState, useEffect} from 'react';
import { retrieveCommuityApi, userRequestingCommunity } from '../../api/CommunityApiService';
import {
    Link,
    useParams,
  } from "react-router-dom";

  import LockIcon from '@mui/icons-material/Lock';
  import VisibilityIcon from '@mui/icons-material/Visibility';
import GenericButton from '../../molecules/GenericButton';
import AllIssues from './issues/AllIssues';

interface CommunityComponent{
    id: number;
    name: string;
    user: any;
    description: string;
    // dateCreated: Date;
    // open: boolean;
    // comments: any;
    // assignees: any;
    // votes: any;
    requestingUsers: any;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
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
            console.log(res.data.requestingUsers)
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

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box className='w-full lg:w-9/12 m-auto mt-4'>
            <span className='text-3xl'>{community?.name}</span>
                <Link to={`/community/${id}/manage-members`} className='float-right'><GenericButton text='Members'/></Link>
                {code === 'ADMIN' && <Link to={`/community/${id}`} className='float-right pr-2'>
                    <GenericButton text='Edit' color='#484848'/>
                </Link>}
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
                            {code === 'MEMBER' && <Box className='mt-16 text-right'>You are the member this community.</Box>}
                            {code === 'ADMIN' && <Box className='mt-16 font-light'>You created this community.</Box>}
                        </Box>
                    </Grid>
                </Grid> 
                <Box>
 
        <Box className='bg-gray shadow-lg'>
                <Box className='mb-4 mt-4 pt-4 text-center'><span className='text-3xl'>Issues</span></Box>
                <Box sx={{ borderColor: 'divider' }} className='bg-white shadow-lg'>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Created By You" {...a11yProps(1)} />
                    <Tab label="Assigned to You" {...a11yProps(2)} />
                    <Tab label="Requested" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box className='mt-4'><AllIssues /></Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* <Box className='mt-4'><CreatedCommunity/></Box>  */}
                </TabPanel> 
                <TabPanel value={value} index={2}>
                    {/* {username ? <Box className='mt-4'><JoinedCommunities/></Box> : 
                        <Box className='mt-4'>Plese login to see communities that you have joined.</Box>
                    } */}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {/* {username ? <Box className='mt-4'><RequestedCommunities/></Box> : 
                        <Box className='mt-4'>Plese login to see communities that you have requested.</Box>
                    } */}
                </TabPanel>
            </Box>
                    {/* <Typography>Community Requests</Typography>
                    {community?.requestingUsers.map((user: any) => (
                        <div>
                        <div>{user.firstName}</div>
                        </div>
                    ))} */}
                </Box>
        </Box>
    );
};

export default CommunityComponent;