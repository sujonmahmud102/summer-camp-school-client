import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get('price');
    const name = searchParams.get('name');

    return (
        <div className='w-full'>
            <h3 className="text-3xl text-center font-semibold my-4"> Pay Class For: {name}</h3>

            <Elements stripe={stripePromise}>
                <CheckoutForm price={price}></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;