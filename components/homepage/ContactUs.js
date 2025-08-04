"use client";
import React from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toaster";
import Loader from "../Loader";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required field"),
  first_name: Yup.string()
    .required("Required field")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  last_name: Yup.string()
    .required("Required field")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  message: Yup.string().required("Required field"),
  _autoresponse: Yup.string(),
});

const ContactUs = () => {
  const contactInitialValues = {
    first_name: "",
    last_name: "",
    email: "",
    message: "",
    _autoresponse: "Thank you for contacting us!",
    // file: fileToSend,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      axios.defaults.headers.post["Content-Type"] = "application/json";

      const res = await axios.post("api/contact", values);

      if (res.data.success) {
        const response = await axios.post(
          "https://formsubmit.co/ajax/stencllproduct@gmail.com",
          values
        );

        const { data } = response;

        if (data.success === "true") {
          toastSuccess("Form submitted successfully");
          resetForm();
        } else {
          toastError("An error occurred");
        }
      } else {
        toastError(res.data.msg[0]);
      }
    } catch (error) {
      toastError("An error occurred. Please try again");
      console.error(error);
    }
  };
  return (
    <StyledContactUs id="contact-us">
      <div className="contact-container">
        <div className="main-content">
          <h2 className="main-heading font-bold">Contact Us</h2>
          <p className="secondary-heading">
            Please fill the form below to place your request.
          </p>
          <p className="secondary-heading mb-4">
            We will get back to you as quickly as possible to address your
            inquiry.
          </p>
          <Formik
            initialValues={contactInitialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="formik-form">
                <input
                  type="hidden"
                  name="_autoresponse"
                  value="Thank you for your submission!"
                />

                <div className="flex w-full gap-5 justify-between ">
                  <div className="input-container">
                    <p className=" text-[0.8rem] pb-1">
                      First Name <span className="text-[#FF333D]">*</span>{" "}
                    </p>
                    <Field
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="input-field"
                      required
                      placeholder="First Name"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="input-error"
                    />
                  </div>
                  {/*  */}
                  <div className="input-container">
                    <p className=" text-[0.8rem] pb-1">
                      Last Name <span className="text-[#FF333D]">*</span>{" "}
                    </p>
                    <Field
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="input-field"
                      required
                      placeholder="Last Name"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="input-error"
                    />
                  </div>
                </div>

                <div className="input-container">
                  <p className=" text-[0.8rem] pb-1">
                    Email <span className="text-[#FF333D]">*</span>{" "}
                  </p>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="input-field"
                    required
                    placeholder="Enter your Email Address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="input-error"
                  />
                </div>
                {/*  */}
                <div className="input-container">
                  <p className=" text-[0.8rem] pb-1">
                    Message <span className="text-[#FF333D]">*</span>{" "}
                  </p>
                  <Field
                    as="textarea"
                    name="message"
                    id="message"
                    className="input-field max-h-[10rem] h-[10rem] overflow-auto"
                    required
                    placeholder="Enter your message here"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="input-error"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#007bff] hover:bg-[#0068d8] duration-300 ease-in-out w-full text-white rounded-lg px-4 py-2 mt-4"
                >
                  {isSubmitting ? <Loader /> : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </StyledContactUs>
  );
};

const StyledContactUs = styled.section`
  width: 100%;
  height: 100vh;
  padding-bottom: 4rem;
  @media screen and (max-width: 700px) {
    padding-bottom: 0;
  }

  .input-error {
    font-size: 0.9rem;
    color: #ff4d4f;
  }

  .contact-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 7rem;
    /* align-items: center; */
    @media screen and (max-width: 700px) {
      padding-top: 4rem;
    }

    @media screen and (max-width: 700px) {
      flex-direction: column;
      .image-container {
        width: 100%;
        img {
          width: 80%;
        }
      }
    }
  }
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;

    @media screen and (max-width: 700px) {
      width: 95%;
      justify-content: center;
    }

    .main-heading {
      text-align: center;
      font-size: 2rem;
    }
    .secondary-heading {
      color: #9ca3af;
      font-size: 0.95rem;
      text-align: center;
    }
  }

  .formik-form {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 2rem;
    .input-field {
      border: 1px solid #e5e7eb;
      width: 100%;
      padding: 0.4rem 1rem;
      border-radius: 6px;
      font-family: inherit;
      &::placeholder {
        font-size: 0.9rem;
        color: #9ca3af;
      }
    }
    .input-container {
      width: 100%;
      margin-top: 0.75rem;
    }
  }
`;

export default ContactUs;
