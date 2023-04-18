import { useState, useEffect } from 'react'
import { BrowserRouter,Routes, Route, Navigate} from 'react-router-dom';

import { auth } from './redux/user/userSlice';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import DrawerAppBar from './components/Header';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import WelcomeComponent from './components/WelcomeComponent';
import LogoutComponent from './components/LogoutComponent';
import ErrorComponent from './components/ErrorComponent';
import IssueComponent from './components/IssueComponent';
import Issue from './components/Issue';
import Issues from './components/Issues';
import AllIssues from './components/NotLoggedIn/Issues';
import NotLoggedInIssueComponent from './components/NotLoggedIn/IssueComponent';


const AuthenticatedRoutes = ({children}:any) =>{
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'));
  
  const dispatch = useAppDispatch();
  const isAutherised = useAppSelector((state) => state.user.auth);
  
  useEffect(() => {

  },[isAutherised]);

  if(isAutherised){
      dispatch(auth(true));
      return children;
  }else{
      dispatch(auth(false));
      return <Navigate to="/" />
  }
}

function App() {

  return (
    <div className="App">
            <BrowserRouter>
                <DrawerAppBar />
                <div className='m-auto'>
                    <Routes>
                        <Route path='/' element={<LoginComponent />}/>
                        <Route path='/login' element={<LoginComponent />}/>
                        <Route path='/signup' element={<SignupComponent />}/>
                        <Route path='/welcome' element={<IssueComponent/>}/>
                        <Route path='/issuecomponent/:id' element={<IssueComponent/>}/>
                        <Route path='/not-logged-in-component/:id' element={<NotLoggedInIssueComponent/>}/>
                        {/* <Route path='/issue/:id' element={<Issue/>}/> */}
                        <Route path='/issues' element={<Issues/>}/>
                        <Route path='/all-issues' element={<AllIssues/>}/>
                        <Route path='/logout' element={
                            <AuthenticatedRoutes><LogoutComponent/></AuthenticatedRoutes>
                        }/>
                        <Route path='/issue/:id' element={
                            <AuthenticatedRoutes><Issue/></AuthenticatedRoutes>
                        }/>
                        <Route path='*' element={<ErrorComponent />}/>
                    </Routes>
                </div>
            </BrowserRouter>
    </div>
  )
}

export default App;
