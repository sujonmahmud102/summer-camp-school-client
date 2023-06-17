import React from 'react';
import { useQuery } from 'react-query';

const PopularInstrutor = () => {
    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await fetch('https://summer-camp-school-a12-server.vercel.app/instructors')
        const data = await res.json();
        return data;
    });


    return (
        <div className='my-10'>
            <h1 className='text-center text-5xl font-bold'>Popular Instructors</h1>

            <div className='grid lg:grid-cols-3 gap-4 p-12'>
                {
                    instructors.slice(0, 6).map((instructor, index) => (
                        <div key={index} className="card w-full bg-base-100 shadow-xl border hover:border-orange-950">
                            <figure className="px-10 pt-10"><img className='w-36 h-36 rounded-xl' src={instructor.image} alt="" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{instructor.name}</h2>
                                <div className='flex justify-between'>
                                    <p>Email: {instructor.email}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default PopularInstrutor;