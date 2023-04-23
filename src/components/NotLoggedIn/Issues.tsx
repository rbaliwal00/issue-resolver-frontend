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
import { Link, useNavigate } from 'react-router-dom';
import { settingIssueId } from '../../redux/issue/issueSlice';
import InfiniteScroll from 'react-infinite-scroll-component'

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Issue{
    id: number;
    title: string
    user: any;
    description: string;
    dateCreated: Date;
    isOpen: boolean;
}

const Issues = () => {
    const username = useAppSelector((state) => state.user.username);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const [issues, setIssues] = useState<Issue[] | []>([]);
    const [message, setMessgae] = useState<string|null>(null);
    const [page, setPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(5);
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
            refreshIssues();
        },[page]);

        const refreshIssues = () =>{
            retrieveAllIssues(page)
            .then(res => {
                console.log(page);
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
            })
            .catch(error => console.log(error));
        }

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
        navigate(`/not-logged-in-component/${id}`);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value-1);
      };

    return (
        <Box>

        
        <div className='md:w-10/12 m-auto'>
            <h1 className='text-4xl text-white font-black'>
                Things You Want To Do!
            </h1>
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
                        {issues.map((issue) => (
                            <TableRow
                                key={issue?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                {/* <TableCell align="center" component="th" scope="row" sx={{marginLeft:'200px'}}>
                                    {todo.id}s
                                </TableCell> */}
                                <TableCell align="left" style={{paddingLeft: '30px', cursor: 'pointer'}} onClick={() => handleClick(issue?.id)}>{issue.title}</TableCell>
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
            
        </div>
        <Box className='absolute bottom-0  p-6 bg-cyan-700 w-full place-content-center'>
                <Pagination 
                    count={issueContent.totalPage} 
                    size="medium" 
                    onChange={handleChange} 
                    className=''/>
            </Box>
        </Box>
    )
} 

export default Issues;