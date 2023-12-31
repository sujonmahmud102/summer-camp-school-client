import React, { useState } from 'react';
import { useQuery } from 'react-query';
import useAuth from '../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const Classes = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(isAdmin)

    // carts
    const { data: carts = [], refetch } = useQuery(['carts'], async () => {
        const res = await fetch('https://summer-camp-school-a12-server.vercel.app/carts')
        const data = await res.json();
        return data;
    });


    // approved classes
    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await fetch('https://summer-camp-school-a12-server.vercel.app/approvedClasses')
        const data = await res.json();
        return data;
    });


    // handle add to cart
    const handleAddToCart = (cls) => {


        if (user && user.email) {
            const cartItem = { id: cls._id, name: cls.className, imgae: cls.classImage, price: cls.price, email: user.email };

            // console.log(cartItem);

            fetch('https://summer-camp-school-a12-server.vercel.app/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Class added to cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                })

        }
        else {
            Swal.fire({
                title: 'Please login to select the class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            })
        }

    }



    return (
        <div className=''>
            <Helmet>
                <title>Classes | Champion Sports School</title>
            </Helmet>

            <div className="hero h-72" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-7xl font-bold uppercase">Classes</h1>
                        <h3 className="text-2xl font-semibold">Total Classes: {classes.length}</h3>
                    </div>
                </div>

            </div>

            <div className='grid lg:grid-cols-4 gap-4 p-12'>
                {
                    classes.map((cls, index) => <div key={index}>
                        <div className={`card w-full h-96 bg-base-100 shadow-xl border border-error ${cls.seats === 0 ? 'bg-red-500' : ''}`}>
                            <figure className="px-10 pt-10">
                                <img className="rounded-xl" src={cls.classImage} alt="" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{cls.className}</h2>
                                <p>Instructor: {cls.instructorName}</p>
                                <div className="flex justify-between">
                                    <p>Seats: {cls.seats}</p>
                                    <p>Price: ${cls.price}</p>
                                </div>
                                <div className="card-actions justify-center">
                                    {
                                        (isAdmin || isInstructor || cls.seats === 0) ? (
                                            <button disabled className="btn btn-sm btn-ghost text-white bg-error">
                                                Select
                                            </button>
                                        ) : (
                                            <button onClick={() => handleAddToCart(cls)} className="btn btn-sm btn-ghost text-white bg-error">
                                                Select
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>


        </div>
    );
};

export default Classes;