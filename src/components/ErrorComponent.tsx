import React from 'react';
import { Link } from 'react-router-dom';

const ErrorComponent = () => {
    return (
        <div>
            <h1 className='text-4xl mb-10 font-bold text-fuchsia-700'>
                We are working really hard to fix 404
            </h1>
            <Link to={'/'}>
                <div className='text-2xl text-blue-500'>
                    Click here to go back to Homepage Homepage
                </div>
            </Link>
        </div>
    )
}

export default ErrorComponent;