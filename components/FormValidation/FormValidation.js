import * as Yup from "yup";

export const FormValidation = Yup.object({
    name: Yup.string().min(4, "Name must be atleast 4 Characters").required("This field is required!"),
    email: Yup.string().email("Email must be Valid").required("This field is required!"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number field must be of type number and of exactly 10 digits").required("This field is required!"),
    country: Yup.string().required("This field is required!"),
    state: Yup.string().required("This field is required!"),
    subject: Yup.string().min(8, "Subject must be atleast 8 Characters").required("This field is required!"),
    message: Yup.string().min(10, "Message must be atleast 10 Characters").required("This field is required!"),
    agreeToTerms: Yup.boolean().oneOf([true],'To submit, You must agree to our privacy policies above.'),
})

export const FormValidationFooter = Yup.object({
    email: Yup.string().email("Email must be Valid").required("This field is required!")
})