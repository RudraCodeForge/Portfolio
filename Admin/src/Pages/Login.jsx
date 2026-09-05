import Styles from "../Styles/Login.module.css";
import { useState } from "react";
import { login } from "../Services/Login.service";
import OtpModel from "../Components/OtpModel";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpData, setOtpData] = useState(null);
  const [loginError, setLoginError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError("");
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
    }
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
          <p className={Styles.kicker}>Welcome back</p>
          <h2>Sign in to continue</h2>
          <p className={Styles.intro}>
            Use your admin account to manage your portfolio.
          </p>

          {loginError && (
            <p className={Styles.loginError} role="alert">
              <span aria-hidden="true">!</span>
              {loginError}
            </p>
          )}

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
              <button type="button" className={Styles.textButton}>
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

            <button type="submit" className={Styles.submitButton}>
              Sign in
              <span aria-hidden="true">-&gt;</span>
            </button>
          </form>

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
