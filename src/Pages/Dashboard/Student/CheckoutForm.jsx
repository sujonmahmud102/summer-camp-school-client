import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import './CheckoutForm.css'
import useAuth from '../../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const CheckoutForm = ({ payClass }) => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [axiosSecure] = useAxiosSecure();
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');


    const price = parseFloat(payClass.price);


    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }
        console.log('payment intent', paymentIntent)
        setProcessing(false)

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price: payClass.price,
                claasName: payClass.name,
                claasImage: payClass.imgae,
                date: new Date(),
                cartId: payClass._id,
                classItemId: payClass.id,
                status: 'service pending',

            }
            // console.log(payment)
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.result.insertedId) {
                        // display confirm
                    }
                })
        }
    }

    return (
        <>
            <div className='text-center text-sm my-5'>
                {cardError && <p className="text-red-500 ">{cardError}</p>}
                {transactionId && <p className="text-green-500">Payment completed with transactionId: {transactionId}</p>}
            </div>

            <form className='w-1/2 mx-auto' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-ghost bg-blue-500 text-white w-1/6 mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>

        </>
    );
};

export default CheckoutForm;