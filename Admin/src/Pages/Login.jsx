import Styles from "../Styles/Login.module.css";
import { useState } from "react";
const Login = () => {
  const [credentials, setCredentials] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    setCredentials({ email, password });
    console.log("Admin login submitted", {
      email: credentials.email,
      password: credentials.password,
      status: "pending",
    });
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
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

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
    </main>
  );
};
export default Login;
