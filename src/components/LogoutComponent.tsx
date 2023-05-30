    
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericButton from "../molecules/GenericButton";

const LogoutComponent = () => {
    const navigate = useNavigate();
    const [redirectCounter, setRedirectCounter] = useState(0);
  
    useEffect(() => {
        let intervalId:any;
        if (redirectCounter > 0) {
          intervalId = setInterval(() => {
            setRedirectCounter(redirectCounter - 1);
          }, 1000);
        }
    
        return () => {
          clearInterval(intervalId);
        };
      }, [redirectCounter]);

      const handleLogoutClick = () => {
        // setRedirectCounter(7);
        // setTimeout(() => {
        //   navigate('/welcome')
        // },7000) 
      };
      useEffect(() => {
        handleLogoutClick(); // Call handleLogoutClick as soon as the component is loaded
      }, []);

    const handleBack = () => {
        navigate('/login')
    }
    return (
        // <div className="text-center mt-20">
        //     <h1 className='text-4xl mb-10 font-bold text-black'>
        //         You are Logged Out.
        //     </h1>
        //     <div className="text-black">Thank you for using our app. Come back soon!</div>
        // </div>
        <div>
            <div className="text-center justify-center mt-20 ">
                <div className="mb-6">Your session is completed.</div>
            {redirectCounter > 0 && (
                <div className="text-2xl font-black"><p>Redirecting in {redirectCounter} seconds...</p></div>
            )}
            </div>
            <br />
            <br />
            <p className="text-center text-2xl">Again want to Login :---  
                <span onClick={handleBack} style={{cursor: 'pointer', marginLeft: '4px'}}> 
                    <GenericButton text="Login"/>
                </span>
            </p>
          </div>
    )
}

export default LogoutComponent;