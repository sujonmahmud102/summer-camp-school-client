import React from 'react';
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    const registerByGoogle = () => {

    }

    return (
        <div className='mx-auto'>
            <div className="divider ">OR</div>
            <div onClick={registerByGoogle} className='flex justify-center items-center btn btn-outline btn-light'>
                <div>
                    <FaGoogle></FaGoogle>
                </div>
                <button className='ml-4'>
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;