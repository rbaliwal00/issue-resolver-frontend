import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WelcomeComponent = () => {
    const [email, setEmail] = useState<any>(JSON.parse(localStorage.getItem('user-email') || 'null'));
    return (
        <div>
            <h1 className='text-4xl mb-10 font-bold text-white'>Welcome {email?.email}</h1>
            <div className="text-2xl text-white">Manage your todos - <Link to="/todos">
                    <button className='bg-cyan-700 mt-10' 
                    style={{paddingLeft:'50px',paddingTop:'8px', paddingRight: '50px', paddingBottom:'8px',
                     color:'white', borderRadius:'5px',width:'200px' }}>Go here</button>
                </Link>
            </div>
        </div>
    )
}

export default WelcomeComponent;