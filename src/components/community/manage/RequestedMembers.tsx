import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteIssueApi, retrieveAllIssues, retrieveAllIssuesForUserApi } from '../../../api/IssueApiService';
import { Button, Box } from '@mui/material';
useAppDispatch
import { useNavigate } from 'react-router-dom';
import { settingIssueId } from '../../../redux/issue/issueSlice';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
    Link,
    useParams,
  } from "react-router-dom";

import Pagination from '@mui/material/Pagination';
import { adminAcceptingUserRequestToJoinCommunity, adminRejectingUserRequestToJoinCommunity, allCommunityRequestedMembers, retrieveAllCommunities, retrieveCommuityApi } from '../../../api/CommunityApiService';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import GenericButton from '../../../molecules/GenericButton';


interface UserComponent{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const theme = createTheme({
    palette: {
      primary: {
        light: '#FFFFFF',
        main: 'teal',
        dark: '#73DDD0',
        contrastText: '#000000',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

const RequestedMembers = () => {
    const username = useAppSelector((state) => state.user.username);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const [members, setMembers] = useState<UserComponent[] | []>([]);
    const [content, setContent] = useState<any>();
    const [message, setMessgae] = useState<string|null>(null);
    const [page, setPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(5);

    const [query, setQuery] = useState("");

    const [code, setCode] = useState('NON-MEMBER');
    const { id } = useParams();


    const [open, setOpen] = useState(false);
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    useEffect(() => {
        retrieveMembers();
    },[page,query]);

    const retrieveMembers = () =>{
        allCommunityRequestedMembers(page,query ,Number(id))
        .then((res) => {
            setMembers(res.data.content);
            setContent(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const changePageInfinite = () =>{
        console.log("page changed!")
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value-1);
    };

    const handleAddMember = (userId: number) =>{
        const communityId: number = Number(id);
        adminAcceptingUserRequestToJoinCommunity(communityId, userId, user?.id)
        .then((res) => {
            retrieveMembers();
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleRemoveMember = (userId: number) =>{
        const communityId: number = Number(id);
        adminRejectingUserRequestToJoinCommunity(communityId, userId, user?.id)
        .then((res) => {
            retrieveMembers();
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }
    console.log();
    return (
         <div>
            {members?.length > 0 ? <div>
            <div className="filter mt-2 mb-10">
                <div className="hidden md:block">
                    <div className="md:w-2/3 shadow-lg  mx-auto flex flex-wrap items-stretch  border-0 md:border-2 border-neutral-300 rounded-lg">
                        <div className="md:w-9/12">          
                            <input type="text" id="filter-input"
                                className="w-full border-2 md:border-2 border-slate-300  box-content shadow-none outline-0 rounded-lg px-5 text-black-400 font-semibold -z-10 h-full"
                                // onKeyDown={function(e){if (e.key === 'Enter') setFilterValue((e.target as any).value)}}
                                onChange={(e)=> setQuery(e.target.value)}
                            />
                        </div>
                        <button
                        type='submit'
                        className='w-full bg-cyan-800 scale-110 text-sm font-bold md:w-3/12 px-5 py-2 md:px-auto text-white rounded-lg'    
                        // onClick={()=>setFilterValue((document.getElementById('filter-input') as HTMLInputElement)?.value as string)}
                        >
                        Search
                        </button>
                    </div>
                </div>
            </div>
            {message && 
                <Box sx={{
                    background:'rgba(9,167,230,0.8)',
                    borderRadius:'3px',
                    paddingY:'12px',
                    fontSize:'20px', 
                    marginBottom:'30px',
                    color:'white'}}>{message}</Box>}

                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{fontWeight:"800", fontSize:'16px', paddingLeft: '30px'}}>Name</TableCell>
                                <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Email</TableCell>
                                <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Add</TableCell>
                                <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {members?.map((member:any) => (
                            <TableRow
                                key={member?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                {/* <TableCell align="center" component="th" scope="row" sx={{marginLeft:'200px'}}>
                                    {todo.id}s
                                </TableCell> */}
                                <TableCell align="left" style={{paddingLeft: '30px', cursor: 'pointer'}}>{member?.firstName} {member?.lastName}</TableCell>
                                <TableCell align='center'>{member.email}</TableCell>
                                {/* <TableCell align='center'>
                                    {dateFormatter(community.dateCreated)}
                                </TableCell> */}
                                <TableCell align="center" onClick={() => handleAddMember(member?.id)}><span><GenericButton text='ADD' color='#059DC0'/></span></TableCell>
                                <TableCell align="center" onClick={() => handleRemoveMember(member?.id)}><span><GenericButton text='DELETE' color='#B80000 '/></span></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {members?.length > 0 && <Box className='absolute shadow-lg bottom-0  p-6 bg-white w-10/12'
            style={{left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto'}}>
                <Box className='w-1/2 m-auto'>
                <ThemeProvider theme={theme}><Pagination 
                        count={content.totalPage} 
                        size="large" 
                        shape="rounded"
                        color='primary'
                        sx={{text:'white', color: 'white'}}
                        onChange={handleChange} 
                        className='text-white'
                        style={{color: 'white'}}/></ThemeProvider>
                </Box>
            </Box>}
            </div> : <div>No user requests currenlty.</div>}
        </div>
    );
};

export default RequestedMembers;