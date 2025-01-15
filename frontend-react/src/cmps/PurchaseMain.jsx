import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Visa_MasterCard_Discover_American_Express_Icons = `https://res.cloudinary.com/dtffr5wya/image/upload/v1736956851/Visa_MasterCard_Discover_American_Express_Icons_-_1000x1000_bna1qq.png`

const Paypal = `https://res.cloudinary.com/dtffr5wya/image/upload/v1736966484/paypal_m05ffy.png`

export function PurchaseMain({ setFormPaymentData, formPaymentData }) {
    const validationSchema = Yup.object({
        cardNumber: Yup.string()
            .required("Card number is required")
            .matches(/^[0-9]{16}$/, "Card number must be 16 digits"),
        expirationDate: Yup.string()
            .required("Expiration date is required")
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter a valid expiration date (MM/YY)"),
        securityCode: Yup.string()
            .required("Security code is required")
            .matches(/^[0-9]{3,4}$/, "Security code must be 3 or 4 digits"),
        cardholderName: Yup.string()
            .required("Cardholder's name is required")
            .min(2, "Name must be at least 2 characters"),
    })

    const initialValues = {
        cardNumber: formPaymentData.cardNumber || "",
        expirationDate: formPaymentData.expirationDate || "",
        securityCode: formPaymentData.securityCode || "",
        cardholderName: formPaymentData.cardholderName || "",
        saveCard: formPaymentData.saveCard || false,
    }

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(false)
        setFormPaymentData(values)
        console.log("Form Submitted:", values)
    }

    return (
        <div className="payment-form">
            <h2>Payment Options</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="payment-options">
                            <label >
                                <Field
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                />
                                Credit & Debit Cards
                                <img
                                    src={Visa_MasterCard_Discover_American_Express_Icons}
                                    alt="Credit & Debit Cards"
                                    className="payment-icon"
                                />
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cardNumber">Card number</label>
                            <Field
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                            />
                            <ErrorMessage name="cardNumber" component="div" className="error-message" />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expirationDate">Expiration date</label>
                                <Field
                                    type="text"
                                    id="expirationDate"
                                    name="expirationDate"
                                    placeholder="MM/YY"
                                />
                                <ErrorMessage
                                    name="expirationDate"
                                    component="div"
                                    className="error-message"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="securityCode">Security code</label>
                                <Field
                                    type="text"
                                    id="securityCode"
                                    name="securityCode"
                                    placeholder="123"
                                />
                                <ErrorMessage
                                    name="securityCode"
                                    component="div"
                                    className="error-message"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cardholderName">Cardholder's name</label>
                            <Field
                                type="text"
                                id="cardholderName"
                                name="cardholderName"
                                placeholder="John Doe"
                            />
                            <ErrorMessage
                                name="cardholderName"
                                component="div"
                                className="error-message"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Field name="saveCard" type="checkbox" />
                                Save this card for future payments
                            </label>
                        </div>
                        <div className="paypal-section">
                            <label>
                                <Field
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                />
                                <img
                                    src={Paypal}
                                    alt="PayPal"
                                    className="paypal payment-icon"
                                />
                            </label>
                        </div>

                        {/* <button type="submit" disabled={isSubmitting}>
                        </button> */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}