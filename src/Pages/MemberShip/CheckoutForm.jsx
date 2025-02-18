import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { ImSpinner9 } from "react-icons/im";
import './CheckoutForm.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../customsHooks/useAxiosSecure';
import useAuth from '../../customsHooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutForm = ({closeModal}) => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const {mutateAsync} = useMutation({
    mutationFn: async (badge) => {
      const {data} = await axiosSecure.put(`/payment/update/${user?.email}`, badge)
      return data;
    }
  })

//   fetch client secret ========
  useEffect(()=> {
    getClientSecret();
  },[])

//   get client secret =====
  const getClientSecret = async () => {
    const {data} = await axiosSecure.post('/create-payment-intent');
    setClientSecret(data.clientSecret)
  }

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message)
      console.log('[error]', error);
      setProcessing(false)
      return
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setCardError('')
    }

    // confirm payment ========
    const {error: confirmError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
            card: card,
            billing_details: {
                email: user?.email,
                name: user?.displayName,
            }
        }
    })
    if(confirmError){
        console.log(confirmError);
        setCardError(confirmError.message)
        setProcessing(false)
        return
    };
    if(paymentIntent.status === 'succeeded'){
        // create payment info object 
        const userInfo = {
            ...user,
            transactionId: paymentIntent.id,

        }

        const badgeUpdate = {
          badge : "Gold"
        }
        try{
          // save payment info from booking collection======
          await axiosSecure.post('/payments', userInfo)
          // change badge in user
          await mutateAsync(badgeUpdate)
          toast.success('Welcome Our membership User!')
          navigate('/');
          closeModal()
        } catch(error){
          console.log(error);
        }
      }

      setProcessing(false)
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
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

      <div className='flex mt-2 justify-around'>
          <button
          disabled={!stripe || !clientSecret || processing}
            type="submit"
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          >
           {
             processing ? <ImSpinner9 className='animate-spin m-auto' size={24}/>
             :
             `Pay $69`
           }
          </button>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
    </form>
    {
        cardError && <p className='text-red-500 mx-auto'>{cardError}</p>
    }

    </>
  );
};

export default CheckoutForm;