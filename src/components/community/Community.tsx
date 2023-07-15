import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { Alert, Snackbar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useAppSelector } from '../../redux/app/hooks';
import { createCommunityApi, retrieveCommuityApi, updateCommunityApi } from '../../api/CommunityApiService';

const Community = () => {
    const username = useAppSelector((state) => state.user.username);
    const { id } = useParams();
    const [value, setValue] = React.useState<Dayjs | null>(null);   
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-id') || 'null'));
    const navigate = useNavigate();

    useEffect(() => {
        retrieveCommunity();
    }, [id]);

    const retrieveCommunity = () =>{
        retrieveCommuityApi(Number(id))
            .then((res) => {
                console.log(res.data)
                setDescription(res.data.description);
                setName(res.data.name);
            }).catch(err => {
                console.log(err)
            });
    }

    const handleSubmit = (event:any) =>{
        event.preventDefault();
        setIsLoading(true);
        if(description.length < 5){
            return setErrorMessage('Enter at least 5 characters for Description')
        }

        const community = {
            name: name,
            description: description
        }

        if(Number(id) === -1){
            createCommunityApi(community)
            .then((res) => {
                console.log(res)
                navigate('/directory');
            })
            .catch(err => console.log(err));

            setIsLoading(false);
        }else{
            updateCommunityApi(Number(id), community)
            .then((res) => {
                console.log(res.data);
                navigate('/directory');
            })
            .catch(err => {
                console.log(err);
            });

            setIsLoading(false);
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <div className='text-center'>
            {isLoading ? <Box className='mt-10 mb-10'><CircularProgress color="success" /></Box> : null}
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <div style={{paddingBottom:'30px', width:'60%', margin: 'auto', borderRadius: '5px'}} className='bg-slate-100'>
            <h1 className='pt-10 text-3xl font-bold'>Enter Issue Details</h1>
            {errorMessage && <div>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className='mt-10 mb-16'>
                    <label className='block text-xl font-black text-left ml-11'>Name</label>
                    <input style={{width: "90%", 
                        margin: "auto", 
                        paddingTop: "10px", 
                        border: '1px solid black',
                        padding: "10px", 
                        borderRadius: "3px"}}
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
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
                     color:'white', borderRadius:'5px',width:'200px' }}>Save

                     </button>
            </form>
            </div>
        </div>
    );
};

export default Community;