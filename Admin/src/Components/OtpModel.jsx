import Styles from "../Styles/OtpModel.module.css";
import { resendOtp, verifyOtp } from "../Services/Login.service";
import toast from "react-hot-toast";
import { useState } from "react";
const OtpModel = ({ email, otpSessionId, onClose }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(otpSessionId);
  const [errorMessage, setErrorMessage] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsVerifying(true);
    setErrorMessage("");
    const otp = new FormData(event.currentTarget).get("otp");

    const otpData = {
      email,
      otpSessionId: currentSessionId,
      otp,
    };
    try {
      const response = await verifyOtp(otpData);
      if (response.success) {
        toast.success("OTP verified successfully!");
        onClose();
      } else {
        setErrorMessage(response.message || "OTP verification failed.");
        if (typeof response.attemptsLeft === "number") {
          setAttemptsLeft(response.attemptsLeft);
        }
      }
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while verifying the OTP.",
      );
      if (typeof error.attemptsLeft === "number") {
        setAttemptsLeft(error.attemptsLeft);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setErrorMessage("");

    try {
      const response = await resendOtp(currentSessionId);
      setCurrentSessionId(response.otpSessionId || currentSessionId);
      setAttemptsLeft(5);
      toast.success("A new OTP has been sent.");
    } catch (error) {
      setErrorMessage(error.message || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
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

        <div className={Styles.status} aria-live="polite">
          <p className={Styles.attempts}>Attempts remaining: {attemptsLeft}</p>
          {errorMessage && (
            <p className={Styles.error} role="alert">
              {errorMessage}
            </p>
          )}
        </div>

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
            disabled={isVerifying || isResending}
            onChange={(event) => {
              event.target.value = event.target.value
                .replace(/\D/g, "")
                .slice(0, 6);
            }}
            required
          />
          <button
            type="submit"
            className={`${Styles.submitButton} ${
              isVerifying ? Styles.loading : ""
            }`}
            disabled={isVerifying || isResending}
            aria-busy={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify code"}
            <span
              className={isVerifying ? Styles.loadingSpinner : undefined}
              aria-hidden="true"
            >
              {isVerifying ? "" : "->"}
            </span>
          </button>
        </form>

        <button
          type="button"
          className={Styles.resendButton}
          onClick={handleResend}
          disabled={isVerifying || isResending}
        >
          {isResending ? "Sending new code..." : "Resend OTP"}
        </button>

        <p className={Styles.sessionNote}>Session: {currentSessionId}</p>
      </section>
    </div>
  );
};
export default OtpModel;
