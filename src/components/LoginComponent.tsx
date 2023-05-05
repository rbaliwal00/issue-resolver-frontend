import { useState,useEffect } from 'react';
import { Box, Button, TextField, Alert } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import { useAppDispatch } from '../redux/app/hooks';
import { apiClient, loginApiService } from '../api/AuthenticationApiService';
import { auth, saveRole } from '../redux/user/userSlice';

const LoginComponent = () => {
    const [email, setEmail] = useState<string| null>();
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSumbit = async (event:any) =>{
        event.preventDefault();

        try {

            const res = await loginApiService(email!, password)

            if(res.status==200){
                
                const jwtToken = 'Bearer ' + res.data.token;
                localStorage.setItem('user-details', JSON.stringify({
                    token : res.data.token,
                    accessToken : res.data.accessToken,
                    username : res.data.username,
                  }))

                  localStorage.setItem('user-id', JSON.stringify({
                    id : res.data.id,
                  }))

                  localStorage.setItem('user-email', JSON.stringify({
                    email : res.data.email,
                  }))

                  localStorage.setItem('user-role', JSON.stringify({
                    role : res.data.role,
                  }))

                  localStorage.setItem('username', JSON.stringify({
                    name : res.data.firstName + " " + res.data.lastName,
                  }))

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                ) 
                dispatch(auth(true));
                dispatch(saveRole(res.data.role));
                setSuccess(true);
                setFailed(false);
                navigate(`/welcome`);
            }  
        } catch(error) {
            setSuccess(false);
            dispatch(auth(false));
            setFailed(true);
            console.log(error);
        }
    }

    return (
      <div className='m-auto text-center'>
        <div style={{paddingBottom:'30px', width:'40%', margin: 'auto', borderRadius: '5px'}} className='bg-slate-200 text-center'>
        <h1 className='font-serif text-2xl tracking-wider font-bold pt-8' 
            >Time to Login</h1>
        <form onSubmit={handleSumbit} >
            <Box sx={{mt:'50px', mb:'30px'}} className='px-10'>
                <TextField
                    label="Username"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    type="text"
                    className='w-full  md:w-96 '
                />
            </Box>
            <Box sx={{mt:'50px', mb:'30px'}} className='px-10'>
                <TextField
                    label="Password"
                    type="password"
                    className='w-full md:w-96'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </Box>
            <button 
                    className='bg-cyan-700' 
                    style={{paddingLeft:'50px',paddingTop:'8px', paddingRight: '50px', paddingBottom:'8px',
                     color:'white', borderRadius:'5px',width:'200px' }}
                    >
                    LOGIN
            </button>
        </form>
        <div className='mt-8 text-center'>Don't have a account get started here.</div>
        <Link to="/signup">
            <Box 
                    className='bg-cyan-700' 
                    sx={{px:'50px',py:'8px', color:'white', borderRadius:'5px' }}
                    maxWidth='200px'
                    margin={'auto'}>
                    SIGNUP
            </Box>
        </Link>
        {success &&<Alert severity="success" 
            sx={{position:'absolute', bottom: '10px',width:'100%'}}>
            Login Successful
        </Alert>}
        {failed && <Alert severity="error" 
            sx={{position:'absolute', bottom: '10px',width:'100%'}}>
            Unsuccessful Login Attempt!
        </Alert>}
        </div>
        
      </div>
    )
  }

export default LoginComponent;