import React from 'react';
import useAuth from '../../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2';

const AddClass = () => {
    const { user } = useAuth();

    const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const classImage = form.classImage.value;
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const seats = parseFloat(form.seats.value);
        const price = parseFloat(form.price.value);

        const saveClase = { className, classImage, instructorName, instructorEmail, seats, price }
        console.log(saveClase);

        fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveClase)

        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    form.reset();
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Class added successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log(data)
            })
    }
    return (
        <div className='w-full mx-auto '>
            <h1 className='text-center text-3xl font-bold mt-5'>Add a Class</h1>
            <div className="m-8 p-10 rounded-lg bg-[#f872720a] shadow-2xl ">

                <form onSubmit={handleAddClass}>

                    {/* form first row */}
                    <div className="lg:flex justify-between gap-4 mb-8">

                        <div className="form-control  lg:w-full">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input type="text" name='className' required placeholder="Enter class name" className="input input-bordered w-full" />

                        </div>

                        <div className="form-control lg:w-full">
                            <label className="label">
                                <span className="label-text">Class Image</span>
                            </label>
                            <input name='classImage' required type="text" placeholder="Enter image URL" className="input input-bordered w-full" />

                        </div>
                    </div>


                    {/* form second row */}
                    <div>
                        <div className="lg:flex justify-between gap-4 mb-8">

                            <div className="form-control  lg:w-full">
                                <label className="label">
                                    <span className="label-text">Instructor Name</span>
                                </label>
                                <input defaultValue={user?.displayName} disabled name='instructorName' required type="text" placeholder="Instructor name" className="input input-bordered w-full" />

                            </div>

                            <div className="form-control lg:w-full">
                                <label className="label">
                                    <span className="label-text">Instructor Email</span>
                                </label>
                                <input defaultValue={user?.email} disabled name='instructorEmail' required type="text" placeholder="Instructor email" className="input input-bordered w-full" />

                            </div>


                        </div>
                    </div>


                    {/* form third row */}
                    <div>
                        <div className="lg:flex justify-between gap-4 mb-8">

                            <div className="form-control  lg:w-full">
                                <label className="label">
                                    <span className="label-text">Available Seats</span>
                                </label>
                                <input name='seats' required type="number" placeholder="Enter available class seat" className="input input-bordered w-full" />

                            </div>

                            <div className="form-control lg:w-full">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input name='price' required type="text" placeholder="Enter class price" className="input input-bordered w-full" />

                            </div>

                        </div>
                    </div>


                    {/* submit button */}
                    <div className="text-center mt-4">
                        <input type="submit" name="" id="" value='Add a Class' className="btn btn-neutral border-none" />
                    </div>

                </form>

            </div>
        </div>
    );
};

export default AddClass;