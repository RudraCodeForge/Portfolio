import Styles from "../Styles/OtpModel.module.css";

const OtpModel = ({ email, otpSessionId, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const otp = new FormData(event.currentTarget).get("otp");

    console.log("OTP submitted", {
      email,
      otpSessionId,
      otp,
      status: "pending-verification",
    });
  };

  return (
    <div className={Styles.overlay} role="presentation" onMouseDown={onClose}>
      <section
        className={Styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="otp-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={Styles.closeButton}
          onClick={onClose}
          aria-label="Close OTP verification"
        >
          &times;
        </button>

        <div className={Styles.icon} aria-hidden="true">
          *
        </div>
        <p className={Styles.kicker}>Security check</p>
        <h2 id="otp-title">Verify your login</h2>
        <p className={Styles.description}>
          Enter the 6-digit code sent to <strong>{email}</strong>.
        </p>

        <form className={Styles.form} onSubmit={handleSubmit}>
          <label htmlFor="otp">Verification code</label>
          <input
            id="otp"
            name="otp"
            className={Styles.otpInput}
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="000000"
            autoComplete="one-time-code"
            onChange={(event) => {
              event.target.value = event.target.value
                .replace(/\D/g, "")
                .slice(0, 6);
            }}
            required
          />
          <button type="submit" className={Styles.submitButton}>
            Verify code
            <span aria-hidden="true">-&gt;</span>
          </button>
        </form>

        <p className={Styles.sessionNote}>Session: {otpSessionId}</p>
      </section>
    </div>
  );
};
export default OtpModel;
