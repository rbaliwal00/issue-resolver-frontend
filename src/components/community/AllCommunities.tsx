import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteIssueApi, retrieveAllIssues, retrieveAllIssuesForUserApi } from '../../api/IssueApiService';
import { Button, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { useNavigate } from 'react-router-dom';
import { settingIssueId } from '../../redux/issue/issueSlice';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Pagination from '@mui/material/Pagination';
import { retrieveAllCommunities } from '../../api/CommunityApiService';

interface Community{
    id: number;
    name: string
    admin: any;
    members: number;
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

const DirectoryTable = () => {
    const username = useAppSelector((state) => state.user.username);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const [communities, setCommunities] = useState<Community[] | []>([]);
    const [message, setMessgae] = useState<string|null>(null);
    const [page, setPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(5);

    const [query, setQuery] = useState("");

    const [issueContent, setIssueContent] = useState({
        content: [],
        totalPage: 0,
        totalElements: 0,
        pageSize: 0,
        lastPage: false,
        pageNumber: 0
    });

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const [currentPage, setCurrentPage] = useState(0)

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        refreshCommunities();
    },[page, query]);

    const refreshCommunities = () =>{
        retrieveAllCommunities(page, query)
        .then(res => {
            setCommunities(res.data.content);
            setNumberOfPages(res.data.totalPage)
            setIssueContent({
                content: [],
                totalPage: res.data.totalPages,
                totalElements: res.data.totalElements,
                pageSize: res.data.pageSize,
                lastPage: res.data.lastPage,
                pageNumber: res.data.pageNumber
            })
        })
        .catch(error => console.log(error));
    }

    console.log(communities);

    const deleteTodo = (id:number) =>{
        console.log(id);
        deleteIssueApi(user.id, id)
        .then((res) => {
            setMessgae(`Delete of todo with id - ${id} successful`);
            // refreshTodos();
        })
        .catch((error) => {

        })
    }

    const updateTodo = (id:number) =>{
        navigate(`/issue/${id}`)
    }

    const addNewTodo = () =>{
        navigate(`/issue/-1`)
    }

    const dateFormatter = (date: any) =>{
        return new Date(date[0], date[1], date[2]).toLocaleDateString();
    }

    const handleClick = (id: number) =>{
        dispatch(dispatch(settingIssueId(id)));
        navigate(`/community-component/${id}`);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value-1);
      };

    return (
        <Box>
            <div className=''>
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
                                <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Admin</TableCell>
                                <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Members</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {communities?.map((community) => (
                            <TableRow
                                key={community?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                {/* <TableCell align="center" component="th" scope="row" sx={{marginLeft:'200px'}}>
                                    {todo.id}s
                                </TableCell> */}
                                <TableCell align="left" style={{paddingLeft: '30px', cursor: 'pointer'}} onClick={() => handleClick(community?.id)}>{community?.name}</TableCell>
                                <TableCell align='center'>{community?.admin?.email}</TableCell>
                                {/* <TableCell align='center'>
                                    {dateFormatter(community.dateCreated)}
                                </TableCell> */}
                                <TableCell align="center">None</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            
            <Button variant="contained" onClick={addNewTodo}  
                style={{ 
                    backgroundColor : 'teal', 
                    marginTop: '30px', 
                    marginBottom: '30px'}}>New Community</Button>
            
        </div>
        {communities?.length > 0 && <Box className='absolute shadow-lg bottom-0  p-6 bg-white w-10/12'
            style={{left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto'}}>
                <Box className='w-1/2 m-auto'>
                <ThemeProvider theme={theme}><Pagination 
                        count={issueContent.totalPage} 
                        size="large" 
                        shape="rounded"
                        color='primary'
                        sx={{text:'white', color: 'white'}}
                        onChange={handleChange} 
                        className='text-white'
                        style={{color: 'white'}}/></ThemeProvider>
                </Box>
            </Box>}
        </Box>
    )
} 

export default DirectoryTable;