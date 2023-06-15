import React from 'react';
import { FaGoogle } from "react-icons/fa";
import useAuth from '../../../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const { createdByGoogle } = useAuth();
    const registerByGoogle = () => {
        createdByGoogle()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                const saveUser = { name: loggedUser.displayName, email: loggedUser.email, image: loggedUser.photoURL };

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)

                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);

                    })
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'User Login Successful.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });


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