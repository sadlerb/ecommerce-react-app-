import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useState } from "react";

import {selectCartTotal} from '../../store/cart/cart.selector';
import {selectCurrentUser} from '../../store/user/user.selector'

import { PaymentFormContainer,FormContainer } from "./payment-form.styles";

import { PaymentButton } from "./payment-form.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

export default function PaymentForm(){
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const user = useSelector(selectCurrentUser);
    const [isProcessingPayment,setIsProcessingPayment] = useState(false)
    console.log(user)


    async function paymentHandler(e)  {
        e.preventDefault();
        
        if (!stripe|| !elements){
            return;
        }

        setIsProcessingPayment(true)
        
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method:'post',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({amount:amount*100})
        }).then(res=> res.json())

        const {paymentIntent:{client_secret}} = response;


        const paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method:{
                card:elements.getElement(CardElement),
                billing_details:{
                    name: user ? user.displayName:'Guest'
                }
            }
        })

        setIsProcessingPayment(false)

        if (paymentResult.error){
            alert(paymentResult.error)
        }else{
            if (paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment Successful')
            }
        }


    }


    return(
        <div>
            <PaymentFormContainer>
                <FormContainer onSubmit={paymentHandler}>
                    <h2>Credit Card Payment</h2>
                    <CardElement/>
                    <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
                        Pay Now
                    </PaymentButton>
                </FormContainer>
            </PaymentFormContainer>
        </div>
    )
}