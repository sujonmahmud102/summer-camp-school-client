import React, { useContext, useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../Shared/Components/SocialLogin/SocialLogin';



const Login = () => {
    const [passwordType, setPasswordType] = useState('password');

    // handle password type change
    const handlePassType = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
        }
        else {
            setPasswordType('password')
        }
    }

    const handleSignIn = () => [

    ]
    return (
        <div>
            <div className="hero h-72" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-7xl font-bold uppercase">Login</h1>
                        <p><Link className='text-error' to='/'>Home</Link> / Login</p>
                        <p className='mt-5 text-white'>Don't have an account? <Link className='text-error' to='/register'>Register Now</Link></p>
                    </div>
                </div>

            </div>

            <div className="m-16 flex items-center justify-center gap-10 ">
                <div className='w-1/2'>
                    <img className='w-[600px]' src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?w=900&t=st=1686304482~exp=1686305082~hmac=491a50e51c6e9afb45da0bd1e3d077745e15f3eabc4ad904b4ab651aed818cff" alt="" />
                </div>

                {/* form */}
                <div className='w-1/2'>
                    <form onSubmit={handleSignIn}>

                        <div className="form-control w-3/4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" required className="input input-bordered" />
                            <p className='text-red-500 text-sm'>
                                <small></small>
                            </p>
                        </div>

                        <div className="form-control w-3/4 relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={passwordType} name='password' placeholder="password" required className="input input-bordered pr-10" />
                            <p className='text-red-500 text-sm'>
                                <small></small>
                            </p>
                            <div className="absolute right-1 top-11 p-2 rounded-md" onClick={handlePassType}>
                                {
                                    passwordType === 'password' ?
                                        <span>  < FaEye ></FaEye></span>
                                        :
                                        <span> <FaEyeSlash></FaEyeSlash></span>
                                }
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control w-3/4 mt-6">
                            <button className="py-2 btn-neutral rounded-lg">Login</button>
                        </div>
                    </form>

                    <div className='w-3/4'>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;