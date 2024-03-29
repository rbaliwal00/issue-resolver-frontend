import { Box, Stack} from '@mui/system';
import {TextField, Tab, Tabs, Typography} from '@mui/material';
import React from 'react';
import AllCommunities from '../components/community/AllCommunities';
import CreatedCommunity from '../components/community/CreatedCommunities';
import { useAppSelector } from '../components/../redux/app/hooks';
import JoinedCommunities from '../components/community/JoinedCommunities';
import RequestedCommunities from '../components/community/RequestedCommunities';

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


const SearchThings = ({name, list}: SearchThingsProps) => {
    const [value, setValue] = React.useState(0);
    const username = useAppSelector((state) => state.user.auth);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box className=''>
            <h1 className='text-4xl text-gray-800 text-center mt-2 mb-6 font-black'>
                {name}
            </h1>
            <Box className='w-10/12 m-auto'>
                <Box sx={{ borderColor: 'divider' }} className='bg-white shadow-lg'>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Members" {...a11yProps(0)} />
                    <Tab label="Requests" {...a11yProps(1)} />
                    <Tab label="Blocked" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {list?.requestingUsers.map((user:any) =>(
                    <div>{user?.name}</div>
                  ))}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {username ? <Box className='mt-4'><CreatedCommunity/></Box> : 
                    <Box className='mt-4'>Plese login to see communities that you created.</Box>
                    }
                </TabPanel> 
                <TabPanel value={value} index={2}>
                    {username ? <Box className='mt-4'><JoinedCommunities/></Box> : 
                        <Box className='mt-4'>Plese login to see communities that you have joined.</Box>
                    }
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {username ? <Box className='mt-4'><RequestedCommunities/></Box> : 
                        <Box className='mt-4'>Plese login to see communities that you have requested.</Box>
                    }
                </TabPanel>
            </Box>
            
        </Box>
    );
};

export default SearchThings;