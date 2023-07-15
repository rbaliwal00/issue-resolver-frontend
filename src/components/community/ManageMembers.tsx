import SearchThings from '../../atoms/SearchThings';
import {TextField, Tab, Tabs, Typography} from '@mui/material';
import { Box, Stack, Snackbar, Alert, Grid } from '@mui/material';
import React,{useState, useEffect} from 'react';
import { retrieveCommuityApi, userRequestingCommunity } from '../../api/CommunityApiService';
import {
    Link,
    useParams,
  } from "react-router-dom";

  import LockIcon from '@mui/icons-material/Lock';
  import VisibilityIcon from '@mui/icons-material/Visibility';
import GenericButton from '../../molecules/GenericButton';
import AllCommunities from '../../components/community/AllCommunities';
import CreatedCommunity from '../../components/community/CreatedCommunities';
import { useAppSelector } from '../../components/../redux/app/hooks';
import JoinedCommunities from '../../components/community/JoinedCommunities';
import RequestedCommunities from '../../components/community/RequestedCommunities';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Pagination from '@mui/material/Pagination';
import RequestedMembers from './manage/RequestedMembers';
import AllMembers from './manage/AllMembers';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface SearchThingsProps{
  name: string;
  list: any;
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

const ManageMembers = () => {

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
            console.log(res.data?.name)
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

    const [value, setValue] = React.useState(0);
    const username = useAppSelector((state) => state.user.auth);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(community?.name)

    return (
        <Box className=''>
            <h2 className='text-3xl text-gray-800 text-center mt-2 mb-6 font-black'>
                Community - {community?.name}
            </h2>
            <Box className='w-10/12 m-auto'>
              <h3 className='text-2xl text-gray-800 mt-2 mb-6 font-black'>
                  Members
              </h3>
                <Box sx={{ borderColor: 'divider' }} className='bg-white shadow-lg'>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="All" {...a11yProps(0)} />
                      {code === 'ADMIN' && <Tab label="Requests" {...a11yProps(1)} />}
                      {code === 'ADMIN' &&<Tab label="Blocked" {...a11yProps(2)} />}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box className='mt-4'><AllMembers/></Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box className='mt-4'><RequestedMembers/></Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {username ? <Box className='mt-4'><JoinedCommunities/></Box> : 
                        <Box className='mt-4'>Plese login to see communities that you have joined.</Box>
                    }
                </TabPanel>
            </Box>
        </Box>
    );
};

export default ManageMembers;