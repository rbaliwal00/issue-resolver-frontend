import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createIssueApi, retrieveIssueApi, updateIssueApi } from '../api/IssueApiService';
import { useAppSelector } from '../redux/app/hooks';

import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';  
import { Button } from '@mui/material';
import moment from 'moment';

const Issue = () => {
    const username = useAppSelector((state) => state.user.username);
    const id:any = useParams();
    const [value, setValue] = React.useState<Dayjs | null>(null);   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const navigate = useNavigate();

    useEffect(() => {
        retrieveIssue();
    }, [id]);

    const retrieveIssue = () =>{
        retrieveIssueApi(user.id, id.id)
            .then((res) => {
                console.log(res.data)
                setDescription(res.data.description);
                setTitle(res.data.title);
            }).catch(err => {
                console.log(err)
            });
    }

    const handleSubmit = (event:any) =>{
        event.preventDefault();
        if(description.length < 5){
            return setErrorMessage('Enter at least 5 characters for Description')
        }

        const issue = {
            id: id.id,
            username: username,
            title: title,
            description: description,
            isOpen: true
        }

        if(id !== -1){
            createIssueApi(user.id,issue)
            .then((res) => {
                navigate('/issues');
            })
            .catch(err => console.log(issue));
        }else{
            updateIssueApi(user.id,issue)
            .then((res) => {
                navigate('/issues');
            })
            .catch(err => console.log(issue));
        }
    }

    return (
        <div className='text-center'>
            <div style={{paddingBottom:'30px', width:'60%', margin: 'auto', borderRadius: '5px'}} className='bg-slate-100'>
            <h1 className='pt-10 text-3xl font-bold'>Enter Issue Details</h1>
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className='mt-10 mb-16'>
                    <label className='block text-xl font-black text-left ml-11'>Title</label>
                    <input style={{width: "90%", 
                        margin: "auto", 
                        paddingTop: "10px", 
                        border: '1px solid black',
                        padding: "10px", 
                        borderRadius: "3px"}}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className='mt-10 mb-6'>
                    <label className='block text-xl font-black text-left ml-11'>Description</label>
                    <TextField rows={5} multiline  style={{width: "90%", 
                        background:'white',
                        borderRadius: "3px"}}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <button className='bg-cyan-700' type='submit'
                    style={{paddingLeft:'50px',paddingTop:'8px', paddingRight: '50px', paddingBottom:'8px',
                     color:'white', borderRadius:'5px',width:'200px' }}>Save</button>
            </form>
            </div>
        </div>
    );
};

export default Issue;