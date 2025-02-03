import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

function Checkout({subtotal}) {

    function tokenHander(token){
        console.log(token)
    }
  return (
    <div>
        <StripeCheckout
            amount = {subtotal*100}
            shippingAddress
            token = {tokenHander}
            currency = "INR"
            >
            <button className='btn'>Pay Now</button>
        </StripeCheckout>
    </div>
  )
}

export default Checkout