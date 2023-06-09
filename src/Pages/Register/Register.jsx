import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);



    return (
        <div className='bg-[rgba(11,6,51,0.18)]'>

            <div className="hero h-72" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-7xl font-bold uppercase">Register</h1>
                        <p><Link className='text-error' to='/'>Home</Link> / Register</p>
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
                        </div>
                    </div>


                    {/* form second row */}
                    <div>
                        <div className="lg:flex justify-between gap-4 mb-8">

                            <div className="form-control  lg:w-1/2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type="text" placeholder="Enter password" className="input input-bordered w-full" />
                                {/* error showing */}
                                {errors.password && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
                            </div>

                            <div className="form-control  lg:w-1/2">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPass", { required: true })} type="text" placeholder="Enter confirm password" className="input input-bordered w-full" />
                                {/* error showing */}
                                {errors.confirmPass && <span className='text-red-500 text-xs mt-1'>This field is required</span>}
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
                                    <option disabled selected>Select One</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
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
            </div>
        </div>
    );
};


export default Register;