import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {

    return (
        <div className='text-center mb-10'>
            <img className='md:w-2/5 mx-auto' src='https://img.freepik.com/premium-photo/error-404-solid-text-safety-cone-isolated-white-surface-3d-illustration_339569-412.jpg?w=996' alt="" />
            <Link to='/'> <button className='btn btn-warning md:w-1/3'>Back To Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;