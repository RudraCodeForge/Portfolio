import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Styles from "../styles/Contact.module.css";

const ContactInfo = ({ email }) => (
  <a className={Styles.emailLink} href={`mailto:${email}`}>
    <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
    <span>{email}</span>
  </a>
);

export default ContactInfo;
