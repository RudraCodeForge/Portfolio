import { FaGithub, FaLinkedin} from "react-icons/fa";
import {useRef} from "react";
import { useSendEmail } from "../store/SendEmail";
const Contact = () => {
  const formRef = useRef();
  const {sendEmail}= useSendEmail();
  const SendEmailHandler = (e) =>{
    e.preventDefault();
    sendEmail(formRef);
  }
  return (
    <div className="container my-5">
      <form 
        className="contact-form shadow p-4 bg-white rounded"
        ref={formRef} onSubmit={(e)=>{SendEmailHandler(e)}}>
        <h3 className="text-center mb-4">Contact Me</h3>
        <input type="hidden" name="to_name" value="PRINCE DAKSH"/>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email_id"
            className="form-control"
            placeholder="Enter your email"
            required
          />
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            rows="4"
            placeholder="Your message..."
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Send Message
        </button>
      </form>
      <div className="text-center mt-5 ConDet">
        <p>jitandradaksh533@gmail.com</p>
        <p>+91 7037042767</p>
      </div>
      <div className="IconCon text-center">
         <a 
           href="https://github.com/RudraCodeForge" 
           className="m-2">
           <FaGithub size={40} color="grey" />
         </a>
         <a 
           href="https://www.linkedin.com/in/prince-daksh-a4a70a2a2" 
           className="m-2">
           <FaLinkedin size={40} color="grey" />
         </a>
      </div>
    </div>
  );
};

export default Contact;