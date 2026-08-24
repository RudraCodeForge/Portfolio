const transporter = require("../services/email.service");

exports.ContactMe = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const MailOptions = {
      from: `"Portfolio Contact" <${process.env.ICLOUD_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Portfolio Message — ${subject}`,

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Portfolio Contact</title>
          </head>

          <body style="
            margin: 0;
            padding: 0;
            background-color: #061917;
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
                padding: 28px 30px;
                background: #081f1c;
                border: 1px solid rgba(146, 247, 217, 0.15);
                border-radius: 16px 16px 0 0;
              ">

                <div style="
                  color: #92f7d9;
                  font-size: 12px;
                  letter-spacing: 3px;
                  text-transform: uppercase;
                  margin-bottom: 12px;
                ">
                  Portfolio Contact
                </div>

                <h1 style="
                  margin: 0;
                  font-size: 28px;
                  font-weight: 500;
                  color: #edf8f5;
                ">
                  New message received.
                </h1>

                <p style="
                  margin: 12px 0 0;
                  color: #8fa9a4;
                  font-size: 14px;
                  line-height: 1.6;
                ">
                  Someone reached out through your portfolio.
                </p>

              </div>

              <!-- Content -->
              <div style="
                padding: 30px;
                background: #0a2421;
                border-left: 1px solid rgba(146, 247, 217, 0.15);
                border-right: 1px solid rgba(146, 247, 217, 0.15);
              ">

                <!-- Sender -->
                <div style="
                  margin-bottom: 24px;
                  padding: 18px;
                  background: #0d2b27;
                  border-radius: 12px;
                ">

                  <div style="
                    color: #92f7d9;
                    font-size: 11px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                  ">
                    From
                  </div>

                  <div style="
                    font-size: 17px;
                    color: #edf8f5;
                    font-weight: 600;
                  ">
                    ${name}
                  </div>

                  <div style="
                    margin-top: 5px;
                    font-size: 14px;
                    color: #8fa9a4;
                  ">
                    ${email}
                  </div>

                </div>

                <!-- Subject -->
                <div style="margin-bottom: 24px;">

                  <div style="
                    color: #92f7d9;
                    font-size: 11px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                  ">
                    Subject
                  </div>

                  <div style="
                    font-size: 18px;
                    color: #edf8f5;
                  ">
                    ${subject}
                  </div>

                </div>

                <!-- Message -->
                <div>

                  <div style="
                    color: #92f7d9;
                    font-size: 11px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                  ">
                    Message
                  </div>

                  <div style="
                    padding: 18px;
                    background: #071b19;
                    border-left: 2px solid #92f7d9;
                    border-radius: 8px;
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
                padding: 22px 30px;
                background: #071b19;
                border: 1px solid rgba(146, 247, 217, 0.15);
                border-radius: 0 0 16px 16px;
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
                  font-size: 12px;
                  letter-spacing: 1px;
                ">
                  DIGITAL • CRAFT • CODE
                </p>

              </div>

            </div>

          </body>
        </html>
      `,
    };

    await transporter.sendMail(MailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};
