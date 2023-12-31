import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    });

    // handle making admin
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // handle making instructor
    const handleMakeInstructor = user => {
        axiosSecure.patch(`/users/instructor/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className='w-full px-8 lg:px-16'>
            <h3 className="text-3xl  text-center font-semibold mt-20 lg:mt-2 my-4">Total Users: {users.length}</h3>
            <div className="hidden lg:block overflow-x-auto h-[500px] w-full mt-4">
                <table className="table w-full">
                    {/* head */}
                    <thead className='sticky top-0 bg-error font-bold text-lg'>
                        <tr>
                            <th className=''>#</th>
                            <th className=''>Image</th>
                            <th className=''>Name</th>
                            <th className=''>Email</th>
                            <th className=''>Role</th>
                            <th className='text-center'> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr className='divide-dashed '
                                key={user._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <img className='w-12 h-12 rounded-2xl' src={user.image} alt="" />
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role ? user.role : 'Student'}
                                </td>
                                <td className="text-center">
                                    {
                                        user?.role === 'Admin' ? <button className="btn btn-sm rounded-md btn-ghost bg-error text-white" disabled="disabled">Make Admin</button>
                                            :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm rounded-md btn-ghost bg-error  text-white">Make Admin</button>
                                    }
                                    {
                                        (user?.role === 'Admin' || user?.role === 'Instructor') ?
                                            <button className="btn btn-sm 
                                            rounded-md btn-ghost bg-gray-600 text-white ml-4" disabled="disabled">Make Instructor</button>
                                            :
                                            <button onClick={() => handleMakeInstructor(user)} className="btn btn-sm rounded-md btn-ghost bg-gray-600 text-white ml-4">Make Instructor</button>
                                    }

                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* for mobile devices */}
            <div className='lg:hidden'>
                {
                    users.map((user, index) => <div className='border-b-4 p-4'
                        key={user._id}
                    >
                        <div className='flex items-center text-2xl'>
                            {index + 1}.
                            <span className=' font-medium ml-3'> {user.name}</span>
                            <img className='w-8 h-8 rounded-full ml-6' src={user.image} alt="" />
                        </div>

                        <div className='flex my-1 gap-2'>
                            <span className='font-semibold'>Email:</span> {user.email}
                        </div>
                        <div className='flex my-1 gap-2'>
                            <span className='font-semibold'>Role:</span>  {user.role ? user.role : 'User'}
                        </div>
                        <div className='flex my-1 gap-2'>
                            <span className='font-semibold'>Action:</span>
                            <div>
                                {
                                    user?.role === 'Admin' ? <button className="btn btn-xs rounded-md btn-ghost bg-error text-white" disabled="disabled">Make Admin</button>
                                        :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs rounded-md btn-ghost bg-error  text-white ml-2">Make Admin</button>
                                }
                                {
                                    (user?.role === 'Admin' || user?.role === 'Instructor') ?
                                        <button className="btn btn-xs 
                                            rounded-md btn-ghost bg-gray-600 text-white ml-2" disabled="disabled">Make Instructor</button>
                                        :
                                        <button onClick={() => handleMakeInstructor(user)} className="btn btn-xs rounded-md btn-ghost bg-gray-600 text-white ml-2">Make Instructor</button>
                                }
                            </div>
                        </div>

                    </div>)
                }
            </div >
        </div>
    );
};

export default ManageUsers;