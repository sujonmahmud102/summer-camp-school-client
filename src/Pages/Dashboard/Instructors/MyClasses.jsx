import React from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';

const MyClasses = () => {
    const { user } = useAuth();

    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await fetch(`http://localhost:5000/classes?instructorEmail=${user?.email}`)
        const data = await res.json();
        return data;
    });

    const handleShowFeedback = (cls) => {
        Swal.fire({
            title: 'Feedback From Admin',
            text: `Message: ${cls?.feedback? cls?.feedback: 'No message from admin'}`,
        })

    }

    return (
        <div className='w-full px-16'>
            <h3 className="text-3xl text-center font-semibold my-4"> My Added Classses : {classes.length}</h3>

            <div className="overflow-x-auto h-[500px] w-full mt-4">
                <table className="table w-full">
                    {/* head */}
                    <thead className='sticky top-0 bg-error font-bold'>
                        <tr>
                            <th className=''>#</th>
                            <th className=''>Class Image</th>
                            <th className=''>Class Name</th>
                            <th className=''>Status</th>
                            <th className=''>Total Enrolled Students</th>
                            <th className=''>Feedback</th>
                            <th className=''>Udate</th>
                            <th className=''>Delete</th>
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
                                    <img className='w-8 h-8 rounded-md ' src={cls.classImage} alt="" />
                                </td>
                                <td>
                                    {cls.className}
                                </td>
                                <td>
                                    {
                                        !cls?.status && <span className='text-yellow-500 font-bold'>
                                            Pending
                                        </span>
                                    }
                                    {
                                        cls?.status == 'approved' && <span className='text-green-500 font-bold'>
                                            Approved
                                        </span>
                                    }
                                    {
                                        cls?.status === 'denied' && <span className='text-red-500 font-bold'>
                                            Denied
                                        </span>
                                    }

                                </td>
                                <td>
                                    {/* todo show enrolled students */}
                                    0
                                </td>
                                <td>
                                    <button onClick={() => handleShowFeedback(cls)} className="btn btn-xs rounded-md btn-ghost bg-black  text-white">Show Detail</button>
                                </td>
                                <td>
                                    <button className="btn btn-xs rounded-md btn-ghost bg-cyan-500 text-white">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-xs rounded-md btn-ghost bg-red-500  text-white">Delete</button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;