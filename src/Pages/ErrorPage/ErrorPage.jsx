import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


const ErrorPage = () => {

    return (
        <div className='text-center mb-10'>
            <Helmet>
                <title>Error | Champion Sports School</title>
            </Helmet>
            <img className='md:w-2/5 mx-auto' src='https://img.freepik.com/premium-photo/error-404-solid-text-safety-cone-isolated-white-surface-3d-illustration_339569-412.jpg?w=996' alt="" />
            <Link to='/'> <button className='btn btn-error md:w-1/3'>Back To Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;