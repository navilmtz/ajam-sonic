'use client'
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ onCreateOrder, onCompletedPayment }) => {
    
    return (
        <PayPalButtons
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onCompletedPayment(data, actions)}
            onError={(err) => {
                console.error("PayPal Checkout error:", err);
            }}
        />
    );
};

export default PayPalCheckout;