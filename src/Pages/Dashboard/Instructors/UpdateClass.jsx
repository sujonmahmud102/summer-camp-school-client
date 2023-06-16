import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateClass = () => {

    const cls = useLoaderData();

    const { _id, className, classImage, seats, price } = cls;

    // handle update class
    const handleUpdateClass = (event) => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const classImage = form.classImage.value;
        const seats = parseFloat(form.seats.value);
        const price = parseFloat(form.price.value);

        const updateClass = { className, classImage, seats, price };

        fetch(`https://summer-camp-school-a12-server.vercel.app/updateClass/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    form.reset();
                    Swal.fire({
                        title: 'Success',
                        text: 'Class updated successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
                if (data.modifiedCount === 0) {
                    Swal.fire({
                        text: 'No changes',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }

            })


        // console.log(updateClass)

    }

    return (
        <div className='w-3/4'>
            <h1 className="text-3xl font-bold mt-5 text-center">Update Class</h1>

            <div className="m-8 p-10 rounded-lg bg-[#f872720a] shadow-2xl ">

                <form onSubmit={handleUpdateClass}>

                    <div className="form-control  lg:w-full">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input type="text" name='className' defaultValue={className} required placeholder="Enter class name" className="input input-bordered w-full" />

                    </div>

                    <div className="form-control lg:w-full">
                        <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input name='classImage' required type="text" defaultValue={classImage} placeholder="Enter image URL" className="input input-bordered w-full" />

                    </div>

                    <div className="form-control  lg:w-full">
                        <label className="label">
                            <span className="label-text">Available Seats</span>
                        </label>
                        <input name='seats' required type="number" defaultValue={seats} placeholder="Enter available class seat" className="input input-bordered w-full" />

                    </div>

                    <div className="form-control lg:w-full">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input name='price' required type="text" defaultValue={price} placeholder="Enter class price" className="input input-bordered w-full" />

                    </div>



                    {/* submit button */}
                    <div className="text-center mt-4">
                        <input type="submit" name="" id="" value='Update Class' className="btn btn-ghost bg-black text-white" />
                    </div>

                </form>

            </div>

        </div>
    );
};

export default UpdateClass;