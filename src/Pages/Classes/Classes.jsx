import React from 'react';
import { useQuery } from 'react-query';

const Classes = () => {
    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await fetch('http://localhost:5000/approvedClasses')
        const data = await res.json();
        return data;
    });



    return (
        <div className=''>
             <div className="hero h-72" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-7xl font-bold uppercase">Classes</h1>
                        <h3 className="text-2xl font-semibold">Total Classes: {classes.length}</h3>
                    </div>
                </div>

            </div>

           <div className='grid lg:grid-cols-3 gap-4 p-12'>
           {
                classes.map((cls, index) => <div className="card w-96 bg-base-100 shadow-xl border border-red-500">
                    <figure className="px-10 pt-10"><img className='rounded-xl' src={cls.classImage} alt="" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{cls.className}</h2>
                        <p>Instructor: {cls.instructorName} </p>
                        <div className='flex justify-between'>
                            <p>Seats: {cls.seats}</p>
                            <p>Price: ${cls.price}</p>
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-sm btn-ghost text-white bg-error">Select</button>
                        </div>
                    </div>
                </div>
                )
            }
           </div>


        </div>
    );
};

export default Classes;