import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteIssueApi, getAssignedIssuesApi, retrieveAllIssuesForUserApi } from '../api/IssueApiService';
import { Button, Box } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { settingIssueId } from '../redux/issue/issueSlice';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';


interface Issue{
    id: number;
    title: string
    user: any;
    description: string;
    dateCreated: Date;
    isOpen: boolean;
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


const AssignedIssues = () => {
    const username = useAppSelector((state) => state.user.username);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const [issues, setIssues] = useState<Issue[] | []>([]);
    const [message, setMessgae] = useState<string|null>(null);

    const [loading, setLoading] = useState(true);
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


    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        refreshIssues();
    },[page, query]);

        const refreshIssues = () =>{
            getAssignedIssuesApi(user.id, page, query)
            .then(res => {
                console.log(res.data);
                setIssues(res.data);

                setIssues(res.data.content);
                setNumberOfPages(res.data.totalPage)
                setIssueContent({
                    content: [],
                    totalPage: res.data.totalPages,
                    totalElements: res.data.totalElements,
                    pageSize: res.data.pageSize,
                    lastPage: res.data.lastPage,
                    pageNumber: res.data.pageNumber
                })
                setLoading(false);
            })
            .catch(error => console.log(error));
        }

    const addNewTodo = () =>{
        navigate(`/issue/-1`)
    }

    const dateFormatter = (date: any) =>{
        return new Date(date[0], date[1], date[2]).toLocaleDateString();
    }

    const handleClick = (id: number) =>{
        dispatch(dispatch(settingIssueId(id)));
        navigate(`/not-logged-in-component/${id}`);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value-1);
    };


    return (
        <div className='md:w-10/12 m-auto'>
            <h1 className='text-4xl text-gray-800 text-center mt-4 mb-6 font-black'>
                Issues Assigned to You!
            </h1>
            <div className="filter mt-10 mb-10">
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
                            <TableCell align="left" sx={{fontWeight:"800", fontSize:'16px', paddingLeft: '30px'}}>Title</TableCell>
                            <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Author</TableCell>
                            <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Date</TableCell>
                            <TableCell align="center" sx={{fontWeight:"800", fontSize:'16px'}}>Assignees</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {issues?.map((issue) => (
                        <TableRow
                            key={issue.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            {/* <TableCell align="center" component="th" scope="row" sx={{marginLeft:'200px'}}>
                                {todo.id}s
                            </TableCell> */}
                            <TableCell align="left" style={{paddingLeft: '30px', cursor: 'pointer'}} onClick={() => handleClick(issue.id)}>{issue.title}</TableCell>
                            <TableCell align='center'>{issue.user?.email}</TableCell>
                            <TableCell align='center'>
                                {dateFormatter(issue.dateCreated)}
                            </TableCell>
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
                    marginBottom: '30px'}}>New Issue</Button>

            {issues.length !== 0 && <Box className='absolute shadow-lg bottom-0  p-6 bg-white w-10/12'
                style={{left: '0', right: '0', marginLeft: 'auto', marginRight: 'auto'}}>
                <Box className='w-1/2 m-auto'>
                <ThemeProvider theme={theme}><Pagination 
                        count={issueContent?.totalPage} 
                        size="large" 
                        shape="rounded"
                        color='primary'
                        onChange={handleChange} 
                        style={{color: 'white'}}/></ThemeProvider>
                </Box>
            </Box>}
        </div>
    )
} 

export default AssignedIssues;