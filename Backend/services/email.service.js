const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendAdminOtpEmail = async (email, otp) => {
  const { data, error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: email,
    subject: "Your Admin Login OTP",

    html: `
      <!DOCTYPE html>
      <html>
        <body style="
          margin: 0;
          padding: 40px 20px;
          background: #061917;
          font-family: Arial, Helvetica, sans-serif;
          color: #edf8f5;
        ">

          <div style="
            max-width: 500px;
            margin: auto;
            padding: 35px;
            background: #0a2421;
            border: 1px solid rgba(146, 247, 217, 0.15);
            border-radius: 16px;
            text-align: center;
          ">

            <p style="
              color: #92f7d9;
              font-size: 12px;
              letter-spacing: 3px;
              text-transform: uppercase;
            ">
              DAKSH ADMIN
            </p>

            <h1 style="
              color: #edf8f5;
              font-size: 26px;
              font-weight: 500;
            ">
              Verify your identity
            </h1>

            <p style="
              color: #8fa9a4;
              font-size: 14px;
              line-height: 1.6;
            ">
              Use the verification code below to complete
              your admin login.
            </p>

            <div style="
              margin: 30px 0;
              padding: 20px;
              background: #071b19;
              border: 1px solid rgba(146, 247, 217, 0.15);
              border-radius: 12px;
            ">

              <div style="
                color: #92f7d9;
                font-size: 36px;
                font-weight: 600;
                letter-spacing: 8px;
              ">
                ${otp}
              </div>

            </div>

            <p style="
              color: #8fa9a4;
              font-size: 13px;
            ">
              This code will expire in 5 minutes.
            </p>

            <p style="
              margin-top: 25px;
              color: #607a75;
              font-size: 12px;
            ">
              If you did not try to login, you can safely
              ignore this email.
            </p>

          </div>

        </body>
      </html>
    `,
  });

  if (error) {
    throw error;
  }

  return data;
};

module.exports = {
  sendAdminOtpEmail,
};
