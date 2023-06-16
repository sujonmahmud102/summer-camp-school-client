import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';



const MySelectedClasses = () => {
    const { user } = useAuth();

    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await fetch(`https://summer-camp-school-a12-server.vercel.app/selectedClasses?studentEmail=${user?.email}`)
        const data = await res.json();
        return data;
    });

    // handle delete
    const handleDeleteItem = id => {

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

                fetch(`https://summer-camp-school-a12-server.vercel.app/selectedClasses/${id}`, {
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
                    })
            }
        })
    }


    return (
        <div className='w-full px-16'>
            <h3 className="text-3xl text-center font-semibold my-4"> My Selected Classses : {classes.length}</h3>

            <div className="overflow-x-auto h-[500px] w-full mt-4">
                <table className="table w-full">
                    {/* head */}
                    <thead className='sticky top-0 bg-error font-bold'>
                        <tr>
                            <th className=''>#</th>
                            <th className=''>Class Image</th>
                            <th className=''>Class Name</th>
                            <th className=''>Price</th>
                            <th className=''>Payment</th>
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
                                    <img className='w-8 h-8 rounded-md ' src={cls.imgae} alt="" />
                                </td>
                                <td>
                                    {cls.name}
                                </td>
                                <td>
                                    ${cls.price}

                                </td>
                                <td>
                                    <Link to={`/dashboard/payment?classId=${cls._id}`}>
                                        <button className="btn btn-xs rounded-md btn-ghost bg-indigo-500 text-white">Pay</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(cls._id)} className="btn btn-xs rounded-md btn-ghost bg-red-500  text-white">Delete</button>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;