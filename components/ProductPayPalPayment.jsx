'use client'
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import React, { useState } from 'react';
import PayPalCheckout from './PaypalButton';

const SelectFieldComponent = ({ index, selectField, onSelectFieldChange }) => {
	const [selectedValue, setSelectedValue] = useState('');

	const setSelectedFieldValue = (e) => {
		let value = e.target.value;

		setSelectedValue(value);

		var optionIndex = selectField.field_values.findIndex(function(option) {
			return option.name == value;
		});

		let selectedOption = selectField.field_values[optionIndex];

        onSelectFieldChange(index, selectedOption);
	}

	return (
		<div className="flex-w p-b-10">
			<label htmlFor="countries" className="block mb-2 text-sm font-medium">
				{selectField.field_label}
			</label>
			<select
				id="countries"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				onChange={setSelectedFieldValue}
				value={selectedValue}
			>
				<option value="" disabled={true}>Select an option</option>
				{selectField.field_values.map((variation) => (
					<option key={variation.name} value={variation.name}>
						{variation.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default function ProductPayPalPayment({ productData, singleProductData }) {
    const [{options, isPending}, dispatch] = usePayPalScriptReducer();

    const [selectedFields, setSelectedFields] = useState([]);
    const [paymentPrice, setPaymentPrice] = useState(productData.product_price);

    const [customField1, setCustomField1] = useState('');
    const [customField2, setCustomField2] = useState('');

    async function sendMail(name, email) {
		
        let customField1_session = sessionStorage.getItem("customField1");
        let customField2_session = sessionStorage.getItem("customField2");

        let label1_session = sessionStorage.getItem("label1");
        let label2_session = sessionStorage.getItem("label2");

		var selected_fields = '';

		selectedFields.map((field, index) => {
			selected_fields += field.name;
			if (index !== selectedFields.length - 1) {
				selected_fields += ' | ';
			}
		})

        const formData = {
            customField1: productData.custom_text_field_1 ? customField1_session : '',
            customField2: productData.custom_text_field_2 ? customField2_session : '',
            productTitle: singleProductData.title.rendered,
            selectedOptions: selected_fields,
			label1: productData.custom_text_field_1 ? label1_session+':' : '',
			label2: productData.custom_text_field_2 ? label2_session+':' : '',
			name: name,
			email: email,
			price: paymentPrice
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/paypal/mail/v1/send`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await res.json();
    }
	
	function handleChange1(e, label1) {
		setCustomField1(e.target.value);
		sessionStorage.setItem("customField1", e.target.value);
		sessionStorage.setItem("label1", label1);
	}

	function handleChange2(e, label2) {
		setCustomField2(e.target.value);
		sessionStorage.setItem("customField2", e.target.value);
		sessionStorage.setItem("label2", label2);
	}

    const onCreateOrder = (data, actions) => {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: paymentPrice, // Amount to be paid
					},
				},
			],
		});
	}

	const onCompletedPayment = (data, actions) => {
		let name = '';
		let email = '';
		return actions.order.capture().then((details) => {
			name = details.payer.name.given_name;
			email = details.payer.email_address;
			// console.log(details);
			alert(`Transaction completed by ${details.payer.name.given_name}`);
			sendMail(name, email);
		});
	}

    const reLoadPayPalAmount = () => {
		dispatch({
			type: "resetOptions",
			value: {...options, currency: 'USD'}
		});
	}

    const onSelectFieldChange = (i, option) => {
        selectedFields[i] = option;
        setSelectedFields(selectedFields);

		// console.log(selectedFields);
		

        let total_price = 0;
		selectedFields.map((field) => {
			total_price = total_price + Number(field.price);
		});

        total_price = Number(productData.product_price) + total_price;

        setPaymentPrice(total_price);

        reLoadPayPalAmount();
	}

    return (
        <>
            {productData.custom_fields && productData.custom_fields.map((selectField, index) => (
                <SelectFieldComponent
                    key={selectField.field_label}
                    index={index}
                    selectField={selectField}
                    onSelectFieldChange={onSelectFieldChange}
                />
            ))}
			
				{productData.custom_text_field_1 && (
					<>
						<label htmlFor="customField1" className="block mb-2 text-sm font-medium text-gray-900">{productData.custom_text_field_1}</label>
						<input type="text" id="customField1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" name='customField1' value={customField1} onChange={(e) => handleChange1(e, productData.custom_text_field_1)} placeholder="" />
					</>
				)}

				{productData.custom_text_field_2 && (
					<>
						<label htmlFor="customField2" className="block mb-2 text-sm font-medium text-gray-900">{productData.custom_text_field_2}</label>
						<input type="text" id="customField2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2" value={customField2} onChange={(e) => handleChange2(e, productData.custom_text_field_2)} placeholder="" />
					</>
				)}

            <b>
                <p className='my-2' style={{'fontSize' : '18px'}}>
                    Total Price: ${paymentPrice}
                </p>
            </b>

            <div className="flex-w p-b-10 mt-3">
				
				{productData.coming_soon == true ? <span className="ltext-106 cl2" style={{color:"red"}}>Coming Soon</span> :
					<div className="size-204 flex-w flex-m respon6-next">
						{isPending ? <p>Loading..</p> : (
							<PayPalCheckout onCreateOrder={onCreateOrder} onCompletedPayment={onCompletedPayment} />
						)}
					</div>
				}
            </div>
        </>
    );
}
