import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const PolularClasses = () => {
    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await fetch('https://summer-camp-school-a12-server.vercel.app/popularClasses')
        const data = await res.json();
        return data;
    });

    return (
        <div className='my-10'>
            <h1 className='text-center text-5xl font-bold'>Popular Classes</h1>

            <div className='grid lg:grid-cols-3 gap-4 p-12'>
                {
                    classes.map((cls, index) => <div key={index} className="card w-full bg-base-100 shadow-xl border hover:border-red-500">
                        <figure className="px-10 pt-10"><img className='rounded-xl' src={cls.classImage} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{cls.className}</h2>
                            <p>Instructor: {cls.instructorName} </p>
                            <div className='flex justify-between'>
                                <p>Seats: {cls.seats}</p>
                                <p>Price: ${cls.price}</p>
                            </div>
                            <div className="card-actions justify-center">
                                <Link to='/classes'>
                                    <button className="btn btn-sm btn-ghost text-white bg-error">See All Classes</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>


        </div>
    );
};

export default PolularClasses;