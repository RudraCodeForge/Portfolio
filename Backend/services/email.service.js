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

const sendContactEmail = async ({ name, email, subject, message }) => {
  const { data, error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New Portfolio Message — ${subject}`,

    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>New Portfolio Message</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background: #061917;
          font-family: Arial, Helvetica, sans-serif;
          color: #edf8f5;
        ">

          <div style="
            max-width: 650px;
            margin: 40px auto;
            padding: 0 20px;
          ">

            <!-- Header -->

            <div style="
              padding: 32px;
              background: #081f1c;
              border: 1px solid rgba(146, 247, 217, 0.15);
              border-radius: 18px 18px 0 0;
            ">

              <div style="
                color: #92f7d9;
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 3px;
                text-transform: uppercase;
                margin-bottom: 14px;
              ">
                NEW INQUIRY
              </div>

              <h1 style="
                margin: 0;
                color: #edf8f5;
                font-size: 30px;
                font-weight: 500;
                line-height: 1.3;
              ">
                Someone reached out.
              </h1>

              <p style="
                margin: 12px 0 0;
                color: #8fa9a4;
                font-size: 14px;
                line-height: 1.7;
              ">
                A new message has been submitted through
                your portfolio.
              </p>

            </div>


            <!-- Main Content -->

            <div style="
              padding: 32px;
              background: #0a2421;
              border-left: 1px solid rgba(146, 247, 217, 0.15);
              border-right: 1px solid rgba(146, 247, 217, 0.15);
            ">


              <!-- Contact Card -->

              <div style="
                padding: 22px;
                background: #0d2b27;
                border-radius: 14px;
                margin-bottom: 28px;
              ">

                <div style="
                  color: #607a75;
                  font-size: 10px;
                  font-weight: 600;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                  margin-bottom: 8px;
                ">
                  SENDER
                </div>

                <div style="
                  color: #edf8f5;
                  font-size: 18px;
                  font-weight: 600;
                  margin-bottom: 6px;
                ">
                  ${name}
                </div>

                <a href="mailto:${email}" style="
                  color: #92f7d9;
                  font-size: 14px;
                  text-decoration: none;
                ">
                  ${email}
                </a>

              </div>


              <!-- Subject -->

              <div style="
                margin-bottom: 28px;
              ">

                <div style="
                  color: #607a75;
                  font-size: 10px;
                  font-weight: 600;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                  margin-bottom: 9px;
                ">
                  SUBJECT
                </div>

                <div style="
                  color: #edf8f5;
                  font-size: 19px;
                  line-height: 1.5;
                ">
                  ${subject}
                </div>

              </div>


              <!-- Message -->

              <div>

                <div style="
                  color: #607a75;
                  font-size: 10px;
                  font-weight: 600;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                  margin-bottom: 9px;
                ">
                  MESSAGE
                </div>

                <div style="
                  padding: 20px;
                  background: #071b19;
                  border: 1px solid rgba(146, 247, 217, 0.08);
                  border-left: 3px solid #92f7d9;
                  border-radius: 10px;
                  color: #c9ded9;
                  font-size: 15px;
                  line-height: 1.8;
                  white-space: pre-line;
                ">
                  ${message}
                </div>

              </div>

            </div>


            <!-- Footer -->

            <div style="
              padding: 24px 32px;
              background: #071b19;
              border: 1px solid rgba(146, 247, 217, 0.15);
              border-radius: 0 0 18px 18px;
              text-align: center;
            ">

              <p style="
                margin: 0;
                color: #607a75;
                font-size: 12px;
              ">
                Sent from your personal portfolio
              </p>

              <p style="
                margin: 8px 0 0;
                color: #92f7d9;
                font-size: 11px;
                letter-spacing: 2px;
              ">
                PRINCE DAKSH • PORTFOLIO
              </p>

            </div>

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
  sendContactEmail,
};
