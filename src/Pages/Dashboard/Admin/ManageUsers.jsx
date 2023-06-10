import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    console.log(users)
    return (
        <div className='w-full px-16'>
            <h3 className="text-3xl text-center font-semibold my-4">Total Users: {users.length}</h3>
            <div className="overflow-x-auto max-h-96 w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead className='bg-error font-bold text-lg'>
                        <tr>
                            <th className=''>#</th>
                            <th className=''>Name</th>
                            <th className=''>Email</th>
                            <th className='text-center'> Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr
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
                                <td className="text-center">
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-green-500  text-white">Make Admin</button>
                                    <button onClick={() => handleMakeInstructor(user)} className="btn btn-ghost bg-orange-400 text-white ml-4">Make Instructor</button>
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