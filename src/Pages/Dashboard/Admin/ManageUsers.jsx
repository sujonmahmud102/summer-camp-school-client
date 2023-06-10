import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    // const [users, setUsers] = useState([]);
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        const data = await res.json();
        return data;
    });

    // useEffect(() => {
    //     fetch('http://localhost:5000/users')
    //         .then(res => res.json())
    //         .then(data => setUsers(data))
    // }, [])

    // handle making admin
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
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
    // console.log(users)

    return (
        <div className='w-full px-16'>
            <h3 className="text-3xl text-center font-semibold my-4">Total Users: {users.length}</h3>
            <div className="overflow-x-auto h-[500px] w-full mt-4">
                <table className="table w-full">
                    {/* head */}
                    <thead className='sticky top-0 bg-error font-bold text-lg'>
                        <tr>
                            <th className=''>#</th>
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
                                        user?.role === 'Admin' ? <button className="btn btn-ghost bg-error text-white" disabled="disabled">Make Admin</button>
                                            :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-error  text-white">Make Admin</button>
                                    }
                                    <button onClick={() => handleMakeInstructor(user)} className="btn btn-ghost bg-gray-600 text-white ml-4">Make Instructor</button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;