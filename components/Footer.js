'use client'
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import { FormValidationFooter } from "./FormValidation/FormValidation";
import ButtonLoader from "./ButtonLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

const initialValues = {
    email: ""
}

const Footer = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: FormValidationFooter,
        onSubmit: async function(values, action){
            
            setSuccessMsg("");
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/footer/mail/v1/send`, {
                headers: {"Content-Type":'application/json'},
                method: 'POST',
                body: JSON.stringify(values)
            });
            
            const result = await response.json();
            setIsLoading(false);
            setSuccessMsg("Email Sent Successfully");
            action.resetForm();
        }
    })

  return (
    <>
        <footer className="bg3 p-t-75 p-b-32">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-lg-4 ">
                        <div className="p-2 size-201">
                            <Image width={1000} height={1000} src="/images/KAM-Logo-Footer.png" alt="ICON-PAY" />
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-2 ">
                        <h4 className="stext-301 cl0 p-b-30">
                            Links
                        </h4>
                        <ul>
                            <li className="p-b-10">
                                <Link style={{'color' : '#fff'}} className="stext-107 cl7 hov-cl1 trans-04" href="/">HOME</Link>
                            </li>
                            <li className="p-b-10">
                                <Link style={{'color' : '#fff'}} className="stext-107 cl7 hov-cl1 trans-04" href="/why-ajamsonic">WHY AJAMSONIC</Link>
                            </li>
                            <li className="p-b-10">
                                <Link style={{'color' : '#fff'}} className="stext-107 cl7 hov-cl1 trans-04" href="/products">MUSICAL INSTRUMENTS</Link>
                            </li>
                            <li className="p-b-10">
                                <Link style={{'color' : '#fff'}} className="stext-107 cl7 hov-cl1 trans-04" href="/services">SERVICES</Link>
                            </li>
                            <li className="p-b-10">
                                <Link style={{'color' : '#fff'}} className="stext-107 cl7 hov-cl1 trans-04" href="/styles">STYLES</Link>
                            </li>
                            <li className="p-b-10">
                                <Link style={{'color' : '#fff'}} className="stext-107 cl7 hov-cl1 trans-04" href="/blogs">BLOG</Link>
                            </li>
                            <li className="p-b-10">
                                <Link style={{'color' : '#fff'}} className="stext-107 cl7 hov-cl1 trans-04" href="/about">ABOUT</Link>
                            </li>
                            <li className="p-b-10">
                                <Link style={{'color' : '#fff'}} className="stext-107 cl7 hov-cl1 trans-04" href="/contact">CONTACT</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-lg-3 ">
                        <h4 className="stext-301 cl0 p-b-30">
                            GET IN TOUCH
                        </h4>
                        <p className="stext-107 cl7 size-201">
                            <span style={{'color' : '#fff'}}>Ajam, Inc.<br></br>10 Willow Grove Mill Dr,<br></br> Suite 101 <br></br>Middletown, DE 19709  <br></br>
                            <span style={{'color' : '#fff'}}>Phone:</span> <Link href="tel:2673235005" style={{'color' : '#fff'}} className="hover:no-underline">(267) 323-5005</Link><br></br>
                            Email: <Link href="mailto:ajaminc@gmail.com" style={{'color' : '#fff'}} className="hover:no-underline">ajaminc@gmail.com</Link></span>
                        </p>
                        <div className="flex-w p-t-27">
                            <div className="h-full  p-t-5">
                                <Link href="https://www.facebook.com/KetronUSA/" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 " >
                                        {/* <i className="fa fa-facebook"></i> */}
                                        <Image src="/images/icons/fb.png" alt="fb" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                            <div className="h-full  p-t-5">
                                <Link href="https://www.tiktok.com/@ketronusa" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                    <Image src="/images/icons/tiktok.png" alt="tiktok" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                            <div className="h-full  p-t-5 ">
                                <Link href="https://www.youtube.com/@AjamSonic" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                    <Image src="/images/icons/youtube.png" alt="youtube" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                            <div className="h-full  p-t-5">
                                <Link href="https://www.instagram.com/ajamsonic/" target="_blank">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 ">
                                    <Image src="/images/icons/insta.png" alt="insta" width={30} height={30} priority/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="flex-w p-t-27">
                            <Link href="#" className="m-all-1">
                                <Image width={30} height={30} src="/images/icons/icon-pay-01.png" alt="ICON-PAY" />
                            </Link>
                            <Link href="#" className="m-all-1">
                                <Image width={30} height={30} src="/images/icons/icon-pay-02.png" alt="ICON-PAY" />
                            </Link>
                            <Link href="#" className="m-all-1">
                                <Image width={30} height={30} src="/images/icons/icon-pay-03.png" alt="ICON-PAY" />
                            </Link>
                            <Link href="#" className="m-all-1">
                                <Image width={30} height={30} src="/images/icons/icon-pay-04.png" alt="ICON-PAY" />
                            </Link>
                            <Link href="#" className="m-all-1">
                                <Image width={30} height={30} src="/images/icons/icon-pay-05.png" alt="ICON-PAY" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3 ">
                        <h4 className="stext-301 cl0 p-b-30">
                            Contact Us
                        </h4>
                        <Link href="contact" className="stext-107 cl7 size-201">
                            <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                                Click Here
                            </button>  
                        </Link>
                        <div className="p-t-4 p-t-10">
                            <p style={{'color' : '#fff'}} className="stext-107 cl7 size-201" >©️ 2025 Ketron America and Ajam Inc. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <div className="p-t-30">
                    <p className="stext-107 cl6 txt-center">
                        Copyright © All rights reserved  
                    </p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer
