import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../Shared/Components/SocialLogin/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createdByEmailPass, updateUserInfo } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState('password');
    const [emailError, setEmailError] = useState('');


    const password = watch('password');
    const confirmPass = watch('confirmPass');

    useEffect(() => {
        register('confirmPass', {
            validate: (value) => value === password || 'Passwords do not match',
        });
    }, [register, password]);


    // handle password type change
    const handlePassType = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
        }
        else {
            setPasswordType('password')
        }
    }



    const onSubmit = data => {
        // console.log(data);

        createdByEmailPass(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                const saveUser = { name: data.name, email: data.email, image: data.photo };

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)

                }).then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {

                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                        console.log(data)
                    })

                // update profile
                updateUserInfo(data.name, data.photo)
                    .then(() => {
                        console.log('profile updated')
                    })
                    .catch(error => {
                        console.log(error)
                    });
                navigate('/');
            })
            .catch(error => {
                console.log(error);

                if (error.message === 'Firebase: Error (auth/invalid-email).') {
                    setEmailError('Please provide valid email format')
                }
                else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setEmailError('Already account created for this email')
                }
                else {
                    setEmailError('');
                }
            })
    };



    return (
        <div className='bg-[rgba(11,6,51,0.18)]'>

            <div className="hero h-72" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-7xl font-bold uppercase">Register</h1>
                        <p><Link className='text-error' to='/'>Home</Link> / Register</p>
                        <p className='mt-5 text-white'>Already have an account? <Link className='text-error' to='/login'>Login</Link></p>
                    </div>
                </div>

            </div>

            <div className="p-4 lg:p-24 rounded-lg">

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* form first row */}
                    <div className="lg:flex justify-between gap-4 mb-8">

                        <div className="form-control  lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", { required: true })} type="text" placeholder="Your full name" className="input input-bordered w-full" />
                            {/* error showing */}
                            {errors.name && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
                        </div>

                        <div className="form-control  lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="text" placeholder="Your email" className="input input-bordered w-full" />
                            {/* error showing */}
                            {errors.email && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
                            {
                                emailError && <span className='text-red-500 text-xs mt-1'>{emailError} </span>
                            }
                        </div>
                    </div>


                    {/* form second row */}
                    <div>
                        <div className="lg:flex justify-between gap-4 mb-8">

                            <div className="form-control relative lg:w-1/2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[@$!%*?&])/ },)} type={passwordType} placeholder="Enter password" className="input input-bordered w-full" />

                                {/* icon for pass showing or not */}
                                <div className="absolute right-1 top-11 p-2 rounded-md" onClick={handlePassType}>
                                    {
                                        passwordType === 'password' ?
                                            <span>  < FaEye ></FaEye></span>
                                            :
                                            <span> <FaEyeSlash></FaEyeSlash></span>
                                    }
                                </div>

                                {/* error showing */}
                                {errors.password?.type === 'required' && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
                                {((errors.password?.type === 'pattern' || errors.password?.type === 'minLength') && (
                                    <span className='text-red-500 text-xs mt-1'>
                                        Password must be longer than 6 characters and must contain at least one capital letter and one special character
                                    </span>
                                ))}

                            </div>

                            <div className="form-control relative lg:w-1/2">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPass", { required: true })} type={passwordType} placeholder="Enter confirm password" className="input input-bordered w-full" />

                                {/* error showing */}
                                {errors.confirmPass && (
                                    <span className="text-red-500 text-xs mt-1">{errors.confirmPass.message}</span>
                                )}
                                {errors.confirmPass?.type === 'required' && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
                            </div>

                        </div>
                    </div>


                    {/* form third row */}
                    <div>
                        <div className="lg:flex justify-between gap-4 mb-8">

                            <div className="form-control  lg:w-1/2">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input {...register("photo", { required: true })} type="text" placeholder="Enter photo URL" className="input input-bordered w-full" />
                                {/* error showing */}
                                {errors.photo && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
                            </div>

                            <div className="form-control  lg:w-1/2">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>

                                <select {...register("gender", { required: true })} className="select select-bordered w-full">
                                    <option value="" disabled selected>Select One</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {/* error showing */}
                                {errors.gender && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
                            </div>

                        </div>
                    </div>


                    {/* form fouth row */}
                    <div>
                        <div className="lg:flex justify-between gap-4 mb-8">

                            <div className="form-control  lg:w-1/2">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input {...register("phone", { required: true })} type="text" placeholder="Enter phone number" className="input input-bordered w-full" />
                                {/* error showing */}
                                {errors.phone && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
                            </div>


                            <div className="form-control  lg:w-1/2">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input {...register("address", { required: true })} type="text" placeholder="Enter your address" className="input input-bordered w-full" />
                                {/* error showing */}
                                {errors.address && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
                            </div>

                        </div>
                    </div>


                    {/* submit button */}
                    <div className="text-center mt-4">
                        <input type="submit" name="" id="" value='Register' className="btn btn-neutral w-1/6  border-none" />
                    </div>

                </form>
                <div className='w-1/6 mx-auto'>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};


export default Register;