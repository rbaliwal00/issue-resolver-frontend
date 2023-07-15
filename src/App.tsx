import { useState, useEffect } from 'react'
import { BrowserRouter,Routes, Route, Navigate} from 'react-router-dom';

import { auth } from './redux/user/userSlice';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import DrawerAppBar from './components/Header';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import LogoutComponent from './components/LogoutComponent';
import ErrorComponent from './components/ErrorComponent';
import IssueComponent from './components/IssueComponent';
import Issue from './components/Issue';
import Issues from './components/Issues';
import AllIssues from './components/NotLoggedIn/Issues';
import NotLoggedInIssueComponent from './components/NotLoggedIn/IssueComponent';
import HomePage from './components/HomePage';
import AssignedIssues from './components/AssignedIssues';
import './App.css';
import Directory from './components/Directory';
import CommunityComponent from './components/community/CommunityComponent';
import SearchThings from './atoms/SearchThings';
import ManageMembers from './components/community/ManageMembers';
import Community from './components/community/Community';


const AuthenticatedRoutes = ({children}:any) =>{
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'));
  
  const dispatch = useAppDispatch();
  const isAutherised = localStorage.getItem('user-details');
  
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
                        <Route path='/welcome' element={<HomePage/>}/>
                        <Route path='/directory' element={<Directory/>}/>
                        <Route path='/issuecomponent/:id' element={<IssueComponent/>}/>
                        <Route path='/not-logged-in-component/:id' element={<NotLoggedInIssueComponent/>}/>
                        {/* <Route path='/issue/:id' element={<Issue/>}/> */}
                        <Route path='/issues' element={<Issues/>}/>
                        <Route path='/all-issues' element={<AllIssues/>}/>
                        <Route path='/community-component/:id' element={<CommunityComponent/>}/>
                        <Route path='/assigned-issues' element={
                            <AuthenticatedRoutes><AssignedIssues /></AuthenticatedRoutes>
                        }/>
                        <Route path='/community/:id/manage-members' element={
                            <AuthenticatedRoutes><ManageMembers /></AuthenticatedRoutes>
                        }/>
                        <Route path='/logout' element={
                            <LogoutComponent/>}/>
                        <Route path='/issue/:id' element={
                            <AuthenticatedRoutes><Issue/></AuthenticatedRoutes>
                        }/>
                        <Route path='/community/:id' element={
                            <AuthenticatedRoutes><Community/></AuthenticatedRoutes>
                        }/>
                        <Route path='*' element={<ErrorComponent />}/>
                    </Routes>
                </div>
            </BrowserRouter>
    </div>
  )
}

export default App;
