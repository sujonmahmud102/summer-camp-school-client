import React from 'react';
import { useQuery } from 'react-query';

const ManageClasses = () => {
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await fetch('http://localhost:5000/classes')
        const data = await res.json();
        return data;
    });

    return (
        <div className='w-full px-16'>
            <h3 className="text-3xl text-center font-semibold my-4">Total classes: {classes.length}</h3>
            <div className="overflow-x-auto h-[500px] w-full mt-4">
                <table className="table w-full">
                    {/* head */}
                    <thead className='sticky top-0 bg-error font-bold'>
                        <tr>
                            <th className=''>#</th>
                            <th className=''>Class Image</th>
                            <th className=''>Class Name</th>
                            <th className=''>Instrustor Name</th>
                            <th className=''>Instrustor Email</th>
                            <th className=''>Seats</th>
                            <th className=''>Price</th>
                            <th className=''>Status</th>
                            <th className='text-center'> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((cls, index) => <tr className='divide-dashed '
                                key={cls._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <img className='w-8 h-8 rounded-md' src={cls.classImage} alt="" />
                                </td>
                                <td>
                                    {cls.className}
                                </td>
                                <td>
                                    {cls.instructorName}
                                </td>
                                <td>
                                    {cls.instructorEmail}
                                </td>
                                <td>
                                    {cls.seats}
                                </td>
                                <td>
                                    ${cls.price}
                                </td>
                                <td className='text-yellow-400'>
                                    {cls.status ? cls.status : "Pending"}
                                </td>
                                <td className="text-center">
                                    {
                                        cls?.role === 'Admin' ? <button className="btn btn-xs rounded-md btn-ghost bg-error text-white" disabled="disabled">Approve</button>
                                            :
                                            <button className="btn btn-xs rounded-md btn-ghost bg-green-500  text-white">Approve</button>
                                    }
                                    {
                                        cls?.role === 'Instructor' ?
                                            <button className="btn btn-xs 
                                        rounded-md btn-ghost bg-red-500 text-white ml-2" disabled="disabled">Deny</button>
                                            :
                                            <button className="btn btn-xs rounded-md btn-ghost bg-red-500 text-white ml-2">Deny</button>
                                    }
                                    {
                                        cls?.role === 'Instructor' ?
                                            <button className="btn btn-xs 
                                        rounded-md btn-ghost bg-gray-600 text-white ml-2" disabled="disabled">Feedback</button>
                                            :
                                            <button className="btn btn-xs rounded-md btn-ghost bg-gray-600 text-white ml-2">Feedback</button>
                                    }

                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;