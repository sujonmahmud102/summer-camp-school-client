import React from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await fetch('http://localhost:5000/classes')
        const data = await res.json();
        return data;
    });


    // handle classes approve
    const handleClassApproval = cls => {
        fetch(`http://localhost:5000/classes/approve/${cls._id}`, {
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
                        title: `Class approved done`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // handle classes denied
    const handleClassDenied = cls => {
        fetch(`http://localhost:5000/classes/deny/${cls._id}`, {
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
                        title: `Class denied`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // handle feedback
    const handleFeedback = (cls) => {
        Swal.fire({
            title: `Class name: ${cls.className}`,
            imageUrl: `${cls.classImage}`,
            imageWidth: 300,
            imageHeight: 150,
            imageAlt: `${cls.className}`,
            input: 'text',
            inputLabel: `Instructor name: ${cls.instructorName}`,
            inputPlaceholder: 'Enter your feedback',
            inputAttributes: {
                required: 'required'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            inputValidator: (value) => {
                if (!value) {
                    return 'Enter feedback';
                }
            }
        }).then((result) => {
            if (result.value) {
                const feedback = result.value;
                console.log(feedback);

                fetch(`http://localhost:5000/classes/feedback/${cls._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        feedback: feedback
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount) {
                            // refetch();
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: `Feedback sent successfully`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='w-full px-16'>
            <h3 className="text-3xl text-center font-semibold my-4">Total Classes: {classes.length}</h3>
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
                                    <img className='w-8 h-8 rounded-md ' src={cls.classImage} alt="" />
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
                                <td className="text-center">
                                    {
                                        (cls?.status === 'approved' || cls?.status === 'denied') ? <button className="btn btn-xs rounded-md btn-ghost bg-error text-white" disabled="disabled">Approve</button>
                                            :
                                            <button onClick={() => handleClassApproval(cls)} className="btn btn-xs rounded-md btn-ghost bg-green-500  text-white">Approve</button>
                                    }
                                    {
                                        (cls?.status === 'approved' || cls?.status === 'denied') ?
                                            <button className="btn btn-xs 
                                        rounded-md btn-ghost bg-red-500 text-white ml-2" disabled="disabled">Deny</button>
                                            :
                                            <button onClick={() => handleClassDenied(cls)} className="btn btn-xs rounded-md btn-ghost bg-red-500 text-white ml-2">Deny</button>
                                    }
                                    <button onClick={() => handleFeedback(cls)} className="btn btn-xs rounded-md btn-ghost bg-gray-600 text-white ml-2">Feedback</button>

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