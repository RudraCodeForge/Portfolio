import React, { createContext, useContext } from "react";
import emailjs from "emailjs-com";

const SendEmailContext = createContext();

export const useSendEmail = () => useContext(SendEmailContext);

export const SendEmailProvider = ({ children }) => {
  const sendEmail = async (formRef) => {
    try {
      const response = await emailjs.sendForm(
        "service_81xo1t9",     // Service ID
        "template_od3tksj",   // Template ID
        formRef.current,      // Direct form ref
        "-E5HO-T9pUBXkXIk5"   // Public Key
      );
      console.log("Success!", response.status, response.text);
      alert("Message sent successfully!");
      formRef.current.reset(); // form clear
    } catch (error) {
      console.error("Failed!", error);
      alert("Message failed to send. Please try again later.");
    }
  };

  return (
    <SendEmailContext.Provider value={{ sendEmail }}>
      {children}
    </SendEmailContext.Provider>
  );
};