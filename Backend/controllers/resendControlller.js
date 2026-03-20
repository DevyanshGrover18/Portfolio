import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["devyansh.grover348@gmail.com"],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #B794F4 0%, #9F7AEA 100%);">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                          New Contact Form Submission
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        
                        <!-- From Section -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 20px; background-color: #f8f9fa; border-left: 4px solid #B794F4; border-radius: 4px;">
                              <p style="margin: 0 0 8px; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                From
                              </p>
                              <p style="margin: 0; color: #212529; font-size: 18px; font-weight: 600;">
                                ${name}
                              </p>
                              <p style="margin: 8px 0 0; color: #6c757d; font-size: 16px;">
                                <a href="mailto:${email}" style="color: #B794F4; text-decoration: none;">
                                  ${email}
                                </a>
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Subject Section -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                          <tr>
                            <td>
                              <p style="margin: 0 0 8px; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                Subject
                              </p>
                              <p style="margin: 0; color: #212529; font-size: 20px; font-weight: 700;">
                                ${subject}
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Message Section -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td>
                              <p style="margin: 0 0 12px; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                Message
                              </p>
                              <div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
                                <p style="margin: 0; color: #212529; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
${message}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </table>
                        
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0; color: #6c757d; font-size: 14px; text-align: center;">
                          This message was sent from your portfolio contact form
                        </p>
                        <p style="margin: 8px 0 0; color: #6c757d; font-size: 12px; text-align: center;">
                          Received on ${new Date().toLocaleString("en-US", {
                            dateStyle: "full",
                            timeStyle: "short",
                          })}
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      id: data.id,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: "Failed to send email. Please try again later.",
    });
  }
};
