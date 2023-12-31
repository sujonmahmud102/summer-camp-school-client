import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';

const Instructors = () => {
    const { data: users = [] } = useQuery(['users'], async () => {
        const res = await fetch('https://summer-camp-school-a12-server.vercel.app/instructors')
        const data = await res.json();
        return data;
    });

    return (
        <div className=''>
            <Helmet>
                <title>Instructors | Champion Sports School</title>
            </Helmet>

            <div className="hero h-72" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-7xl font-bold uppercase">Instructors</h1>
                        <h4 className='text-2xl font-semibold'>Total Instructors: {users.length}</h4>
                    </div>
                </div>

            </div>

            <div className="overflow-x-auto w-full px-12 my-8">
                <table className="table w-full">
                    {/* head */}
                    <thead className='sticky top-0 bg-error font-bold text-lg'>
                        <tr>
                            <th className=''>#</th>
                            <th className=''>Image</th>
                            <th className=''>Name</th>
                            <th className=''>Email</th>
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
                                    <img className='w-16 rounded-2xl' src={user.image} alt="" />
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Instructors;