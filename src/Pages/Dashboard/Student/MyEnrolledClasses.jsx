import React from 'react';
import useEnrolled from '../../../hooks/useEnrolled';

const MyEnrolledClasses = () => {
    const [enrolled] = useEnrolled();

    // console.log(enrolled)

    return (
        <div className='w-full px-16'>
        <h3 className="text-3xl text-center font-semibold my-4"> My Enrolled Classses : {enrolled.length}</h3>

        <div className="overflow-x-auto h-[500px] w-full mt-4">
            <table className="table w-full">
                {/* head */}
                <thead className='sticky top-0 bg-error font-bold'>
                    <tr>
                        <th className=''>#</th>
                        <th className=''>Class Image</th>
                        <th className=''>Class Name</th>
                        <th className=''>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        enrolled.map((cls, index) => <tr className='divide-dashed '
                            key={cls._id}
                        >
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <img className='w-8 h-8 rounded-md ' src={cls.claasImage} alt="" />
                            </td>
                            <td>
                                {cls.claasName}
                            </td>
                            <td>
                                ${cls.price}

                            </td>
                         

                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyEnrolledClasses;