import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useEnrolled from '../../../hooks/useEnrolled';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyClasses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [matchedCount, setMatchCount] = useState(0);

    const { data: totalEnrolled = [] } = useQuery(['totalEnrolled'], async () => {
        const res = await axiosSecure.get('/totalEnrolled');
        return res.data;
    });

    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get(`http://localhost:5000/classes?instructorEmail=${user?.email}`);
        return res.data;
    });

    // handle matched count
    // handle matched count
    const handleMatchedCount = (cls) => {
        const matchedCountArray = totalEnrolled.filter(enrollment => enrollment.classItemId === cls._id);
        const trueCount = matchedCountArray.length;
        setMatchCount(trueCount);
        console.log(cls._id, trueCount);
    }



    const handleShowFeedback = (cls) => {
        Swal.fire({
            title: 'Feedback From Admin',
            html: `Message: ${cls.feedback ? `<span style="color: red;">${cls.feedback} </span>` : 'No message from admin'}`,
        });
    };

    // handle delete
    const handleDeleteItem = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/classes/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your class has been deleted.',
                                'success'
                            );
                            refetch();
                        };
                    });
            }
        });
    };

    return (
        <div className='w-full px-16'>
            <h3 className="text-3xl text-center font-semibold my-4"> My Added Classes : {classes.length}</h3>

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
                            <th className=''>Update</th>
                            <th className=''>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((cls, index) => (
                                <tr className='divide-dashed' key={cls._id}>
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
                                        {
                                            !cls?.status && <span className='text-yellow-500 font-bold'>
                                                Pending
                                            </span>
                                        }
                                        {
                                            cls?.status === 'approved' && <span className='text-green-500 font-bold'>
                                                Approved
                                            </span>
                                        }
                                        {
                                            cls?.status === 'denied' && <span className='text-red-500 font-bold'>
                                                Denied
                                            </span>
                                        }
                                    </td>
                                    <td onClick={() => handleMatchedCount(cls)}>
                                        {matchedCount} show
                                    </td>
                                    <td>
                                        <button onClick={() => handleShowFeedback(cls)} className="btn btn-xs rounded-md btn-ghost bg-black text-white">Show Detail</button>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updateClass/${cls._id}`}>
                                            <button className="btn btn-xs rounded-md btn-ghost bg-cyan-500 text-white">Update</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(cls._id)} className="btn btn-xs rounded-md btn-ghost bg-red-500 text-white">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;
