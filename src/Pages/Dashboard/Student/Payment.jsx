import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import useCart from '../../../hooks/useCart';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const classId = params.get('classId');
    const [cart] = useCart();

    // console.log(classId, cart)
    const payClass = cart.find(item => item._id === classId)

    // console.log(payClass)
    return (
        <div className='w-full'>
            <h3 className="text-3xl text-center font-semibold my-4"> Pay Class For: {payClass?.name}</h3>

            <Elements stripe={stripePromise}>
                <CheckoutForm payClass={payClass}> </CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;