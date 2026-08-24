import { useState } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ContactInfo from "../Components/ContactInfo";
import Styles from "../styles/Contact.module.css";
import { ContactMe } from "../Services/Contact.service";
const initialForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setSubmitted(false);

    try {
      const Data = await ContactMe(formData);

      setMessage(Data.message);
      setSubmitted(true);
      setFormData(initialForm);
    } catch (error) {
      console.error(error);

      setMessage(error?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={Styles.contactSection}>
      <div className={Styles.contactGrid}>
        <div className={Styles.contactIntro}>
          <div className={Styles.sectionLabel}>
            <span>08</span>
            <span className={Styles.labelLine} />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className={Styles.heading}>
            Have a project
            <span>in mind?</span>
          </h2>
          <p className={Styles.introCopy}>
            Tell me a little about what you&apos;re working on. I&apos;ll get
            back to you within 2–3 business days.
          </p>
          <ContactInfo email="hello@princedaksh.dev" />
        </div>

        <form className={Styles.contactForm} onSubmit={handleSubmit}>
          <div className={Styles.formRow}>
            <label>
              <span>NAME</span>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </label>
            <label>
              <span>EMAIL</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
              />
            </label>
          </div>
          <label>
            <span>SUBJECT</span>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What can I help with?"
              required
            />
          </label>
          <label className={Styles.messageField}>
            <span>MESSAGE</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, timeline, and goals..."
              rows="5"
              required
            />
          </label>
          <div className={Styles.formFooter}>
            <button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className={Styles.loader} />
                  Sending...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
                  {submitted ? "Message sent" : "Send message"}
                </>
              )}
            </button>
            {submitted && (
              <span className={Styles.successMessage}>{message}</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
export default Contact;
