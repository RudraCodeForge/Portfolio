import Styles from "../Styles/Login.module.css";
import { useState } from "react";
import { login } from "../Services/Login.service";
import {
  requestPasswordReset,
  resetPassword,
  verifyPasswordResetOtp,
} from "../Services/PasswordReset.service";
import OtpModel from "../Components/OtpModel";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpData, setOtpData] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState("email");
  const [resetSessionId, setResetSessionId] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    setIsLoading(true);
    const formData = new FormData(event.target);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const loginData = await login(credentials);
      if (loginData.success) {
        setOtpData({
          email: loginData.email || credentials.email,
          otpSessionId: loginData.otpSessionId,
        });
      }
    } catch (error) {
      setLoginError(error.message || "Email or password is incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotEmail = async (event) => {
    event.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    setIsLoading(true);
    const email = new FormData(event.currentTarget).get("email");

    try {
      const response = await requestPasswordReset(email);
      setResetEmail(email);
      if (response.resetSessionId) {
        setResetSessionId(response.resetSessionId);
        setForgotStep("otp");
      } else {
        setLoginError(response.message);
      }
    } catch (error) {
      setLoginError(error.message || "Unable to request a password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetOtp = async (event) => {
    event.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    setIsLoading(true);
    const otp = new FormData(event.currentTarget).get("otp");

    try {
      const response = await verifyPasswordResetOtp(resetSessionId, otp);
      setResetToken(response.resetToken);
      setForgotStep("password");
    } catch (error) {
      setLoginError(error.message || "Unable to verify the reset code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      await resetPassword(
        resetToken,
        formData.get("password"),
        formData.get("confirmPassword"),
      );
      setIsForgotPassword(false);
      setForgotStep("email");
      setResetSessionId("");
      setResetToken("");
      setLoginSuccess("Password reset successfully. Please sign in again.");
    } catch (error) {
      setLoginError(error.message || "Unable to reset the password.");
    } finally {
      setIsLoading(false);
    }
  };

  const openForgotPassword = () => {
    setLoginError("");
    setLoginSuccess("");
    setIsForgotPassword(true);
    setForgotStep("email");
  };

  const returnToLogin = () => {
    setLoginError("");
    setLoginSuccess("");
    setIsForgotPassword(false);
    setForgotStep("email");
  };

  return (
    <main className={Styles.login}>
      <section className={Styles.visualPanel} aria-label="Portfolio admin">
        <div className={Styles.brandMark}>P</div>
        <div className={Styles.visualCopy}>
          <p className={Styles.eyebrow}>Portfolio control room</p>
          <h1>Shape the work behind the work.</h1>
          <p>
            Keep your projects, experience, and stories moving from one calm,
            focused workspace.
          </p>
        </div>
        <div
          className={Styles.visualMeta}
          aria-label="Portfolio workspace status"
        >
          <div>
            <strong>12</strong>
            <span>Projects</span>
          </div>
          <div>
            <strong>04</strong>
            <span>Sections</span>
          </div>
          <p>
            <span /> Workspace online
          </p>
        </div>
        <div className={Styles.signal} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className={Styles.formPanel}>
        <div className={Styles.formWrap}>
          <p className={Styles.mobileBrand}>PORTFOLIO ADMIN</p>
          <p className={Styles.kicker}>
            {isForgotPassword ? "Account recovery" : "Welcome back"}
          </p>
          <h2>
            {isForgotPassword ? "Reset your password" : "Sign in to continue"}
          </h2>
          <p className={Styles.intro}>
            {isForgotPassword
              ? forgotStep === "email"
                ? "Enter your admin email to receive a verification code."
                : forgotStep === "otp"
                  ? `Enter the code sent to ${resetEmail}.`
                  : "Choose a new password for your admin account."
              : "Use your admin account to manage your portfolio."}
          </p>

          {loginError && (
            <p className={Styles.loginError} role="alert">
              <span aria-hidden="true">!</span>
              {loginError}
            </p>
          )}
          {loginSuccess && (
            <p className={Styles.loginSuccess} role="status">
              {loginSuccess}
            </p>
          )}

          {isForgotPassword ? (
            <>
              {forgotStep === "email" && (
                <form className={Styles.form} onSubmit={handleForgotEmail}>
                  <label htmlFor="reset-email">Email address</label>
                  <input
                    id="reset-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                  <button
                    type="submit"
                    className={Styles.submitButton}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending code..." : "Send verification code"}
                    <span aria-hidden="true">-&gt;</span>
                  </button>
                </form>
              )}

              {forgotStep === "otp" && (
                <form className={Styles.form} onSubmit={handleResetOtp}>
                  <label htmlFor="reset-otp">Verification code</label>
                  <input
                    id="reset-otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    autoComplete="one-time-code"
                    placeholder="000000"
                    required
                  />
                  <button
                    type="submit"
                    className={Styles.submitButton}
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify code"}
                    <span aria-hidden="true">-&gt;</span>
                  </button>
                </form>
              )}

              {forgotStep === "password" && (
                <form className={Styles.form} onSubmit={handlePasswordReset}>
                  <label htmlFor="new-password">New password</label>
                  <input
                    id="new-password"
                    name="password"
                    type="password"
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    required
                  />
                  <label htmlFor="confirm-password">Confirm password</label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Repeat your new password"
                    required
                  />
                  <button
                    type="submit"
                    className={Styles.submitButton}
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating password..." : "Reset password"}
                    <span aria-hidden="true">-&gt;</span>
                  </button>
                </form>
              )}

              <button
                type="button"
                className={Styles.textButton}
                onClick={returnToLogin}
              >
                Back to sign in
              </button>
            </>
          ) : (
            <form className={Styles.form} onSubmit={handleSubmit}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              <div className={Styles.passwordLabel}>
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className={Styles.textButton}
                  onClick={openForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
              <div className={Styles.passwordInputWrap}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className={Styles.passwordToggle}
                  onClick={() => setShowPassword((isVisible) => !isVisible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <span
                    key={showPassword ? "hide" : "show"}
                    className={Styles.toggleText}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                  <span className={Styles.toggleIcon} aria-hidden="true">
                    {showPassword ? "◉" : "◌"}
                  </span>
                </button>
              </div>

              <label className={Styles.remember}>
                <input type="checkbox" name="remember" />
                <span>Remember me on this device</span>
              </label>

              <button
                type="submit"
                className={`${Styles.submitButton} ${isLoading ? Styles.loading : ""}`}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
                <span
                  className={isLoading ? Styles.loadingSpinner : undefined}
                  aria-hidden="true"
                >
                  {isLoading ? "" : "->"}
                </span>
              </button>
            </form>
          )}

          <p className={Styles.footerNote}>
            Protected workspace <span aria-hidden="true">&middot;</span> Admin
            access only
          </p>
        </div>
      </section>
      {otpData && <OtpModel {...otpData} onClose={() => setOtpData(null)} />}
    </main>
  );
};
export default Login;
