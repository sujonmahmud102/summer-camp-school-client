import React from 'react';
import { FaGoogle } from "react-icons/fa";
import useAuth from '../../../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate();



    const { createdByGoogle } = useAuth();
    const registerByGoogle = () => {
        createdByGoogle()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                Swal.fire(
                    'Good job!',
                    'Successfully login by Google',
                    'success'
                );
                navigate('/');
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='mx-auto'>
            <div className="divider ">OR</div>
            <div onClick={registerByGoogle} className='flex justify-center items-center btn btn-outline btn-light'>
                <div>
                    <FaGoogle></FaGoogle>
                </div>
                <button className='ml-4'>
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;