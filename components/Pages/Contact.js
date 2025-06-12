'use client'
import { useFormik } from "formik";
import { FormValidation } from "../FormValidation/FormValidation";
import { useState } from "react";
import ButtonLoader from "../ButtonLoader";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  subject: "",
  message: "",
  agreeToTerms: false,
};

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: FormValidation,
    onSubmit: async function (values, action) {
      setSuccessMsg("");
      setErrorMsg("");
      setIsLoading(true);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mail/v1/send`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Failed to send email (API 1)");
        }

        const result = await response.json();

        const responseUser = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/mail/v1/send`, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(values),
        });

        if (!responseUser.ok) {
          throw new Error("Failed to send email (API 2)");
        }

        const resultUser = await responseUser.json();

        setSuccessMsg("Email Sent Successfully");
        action.resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
        setErrorMsg("Failed to send email. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: 'url("images/bg-01.jpg")' }}>
        <h2 className="ltext-105 p-t-50 cl0 txt-center">Contact</h2>
      </section>
      {/* Content page */}
      <section className="bg0 p-t-104 p-b-116">
        <div className="container">
          <div className="flex-w flex-tr">
            <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md m-2 bor8" style={{ backgroundColor: "#E4E4E4" }}>
              <form onSubmit={handleSubmit}>
                <h3 className="mtext-105 cl2 txt-center p-b-20">Send us a message</h3>
                <div className="row">
                  <div className="col-6">
                    <div className="m-b-20 how-pos4-parent">
                      <span>Name</span>
                      <input
                        className="stext-111 cl2 plh3 size-116 p-l-50 p-r-30 bor8"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.name && touched.name && (
                        <p className="focus-border text-danger mt-2">{errors.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="m-b-20 how-pos4-parent">
                      <span>Mobile Number</span>
                      <input
                        className="stext-111 cl2 plh3 size-116 p-l-50 p-r-30 bor8"
                        type="tel"
                        name="phone"
                        placeholder="110-110-1999"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phone && touched.phone && (
                        <p className="focus-border text-danger mt-2">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="m-b-20 how-pos4-parent">
                  <span>Email</span>
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-50 p-r-30 bor8"
                    type="text"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <p className="focus-border text-danger mt-2">{errors.email}</p>
                  )}
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="m-b-20 how-pos4-parent">
                      <span>Country</span>
                      <input
                        className="stext-111 cl2 plh3 size-116 p-l-50 p-r-30 bor8"
                        type="text"
                        name="country"
                        placeholder="USA"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.country && touched.country && (
                        <p className="focus-border text-danger mt-2">{errors.country}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="m-b-20 how-pos4-parent">
                      <span>State</span>
                      <input
                        className="stext-111 cl2 plh3 size-116 p-l-50 p-r-30 bor8"
                        type="text"
                        name="state"
                        placeholder="State/City"
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.state && touched.state && (
                        <p className="focus-border text-danger mt-2">{errors.state}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="m-b-20 how-pos4-parent">
                  <span>Subject</span>
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-50 p-r-30 bor8"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.subject && touched.subject && (
                    <p className="focus-border text-danger mt-2">{errors.subject}</p>
                  )}
                </div>
                <div className="bor8 m-b-10">
                  <textarea
                    className="stext-111 cl2 plh3 size-110 p-lr-28 p-tb-25"
                    name="message"
                    placeholder="How Can We Help?"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="bor8 m-b-10" style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={values.agreeToTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label className="form-check-label ml-2">
                    By checking this box, you agree to our privacy policies and to receive email communications from Ajam Inc.
                  </label>
                </div>
                {errors.agreeToTerms && touched.agreeToTerms && (
                  <p className="focus-border text-danger mt-2">{errors.agreeToTerms}</p>
                )}
                {isLoading ? (
                  <ButtonLoader />
                ) : (
                  <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" type="submit">
                    Submit
                  </button>
                )}
                <p className="mt-2 text-green-700">{successMsg}</p>
              </form>
            </div>
            <div className="size-100 bor10 p-lr-100 p-t-55 p-b-70 p-lr-15-lg w-full-md m-2 bor8">
              <h3 className="mtext-105 cl2 txt-center p-b-5">Contact Us</h3>
              <img src="images/contact.jpg" width={300}/>
              <div className="flex-w w-full p-b-10">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-map-marker" />
                </span>
                <div className="size-212 p-t-2">
                  <h3 className="mtext-103 cl2">Address</h3>
                  <p className="cl1 size-213" style={{fontSize:"15px", lineHeight:"1.5" , fontWeight:"600"}}>
                    Ajam, Inc.<br></br>10 Willow Grove Mill Dr,<br></br> Suite 101 <br></br>Middletown, DE 19709  <br></br>
                  </p>
                </div>
              </div>
              <div className="flex-w w-full p-b-10">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-phone-handset" />
                </span>
                <div className="size-212 p-t-4">
                  <span className="mtext-103 cl2">Lets Talk</span>
                  <p className="cl1 size-213 p-t-5" style={{fontSize:"15px", lineHeight:"1.5" , fontWeight:"600"}} >(267) 323-5005</p>
                </div>
              </div>
              <div className="flex-w w-full">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-envelope" />
                </span>
                <div className="size-212 p-t-4">
                  <span className="mtext-103 cl2">Sales Support</span>
                  <p className="cl1 size-213 p-t-5" style={{fontSize:"15px", lineHeight:"1.5" , fontWeight:"600"}}>ajaminc@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;