// // services/MailService.js
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const {
//   EMAIL_HOST,
//   EMAIL_PORT,
//   EMAIL_SECURE,
//   EMAIL_USER,
//   EMAIL_PASS,
//   EMAIL_FROM,
//   EMAIL_TO
// } = process.env;

// // Configure transporter
// const transporter = nodemailer.createTransport({
//   host: EMAIL_HOST,
//   port: parseInt(EMAIL_PORT),
//   secure: EMAIL_SECURE === 'true', // true for 465, false for other ports
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS
//   }
// });

// /**
//  * Sends an email notification when a new Truth Social post is detected.
//  * @param {Object} post - The post data
//  * @param {Object} gptResponse - The GPT analysis result
//  */
// export async function sendNewPostNotification(post, gptResponse) {
//   const subject = `New Post from @${post.username}`;
//   const text = `
// 🔔 New TruthSocial Post Detected!
// -----------------------------------------
// Post URL: ${post.postUrl}
// Posted At: ${post.uploadTime}

// Content:
// ${post.text}

// GPT Analysis:
// ${JSON.stringify(gptResponse, null, 2)}
// `;

//   const mailOptions = {
//     from: EMAIL_FROM,
//     to: EMAIL_TO,
//     subject,
//     text
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`📧 Email notification sent to ${EMAIL_TO}`);
//   } catch (error) {
//     console.error('❌ Failed to send email:', error.message);
//   }
// }


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ with template +++++++++++++++++++++++++++++++++++ //

// services/MailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const PROFILE_HANDLE = process.env.PROFILE_HANDLE || 'realDonaldTrump';

const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM,
    EMAIL_TO
} = process.env;

// Configure transporter
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT),
    secure: EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

/**
 * Sends an email notification when a new Truth Social post is detected.
 * @param {Object} post - The post data
 * @param {Object} gptResponse - The GPT analysis result
 */
export async function sendNewPostNotification(post, gptResponse) {
    const username = PROFILE_HANDLE || "Unknown User";
    const subject = `New Post from @${username}`;

    const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>New TruthSocial Post Notification</title>
  <style type="text/css">
    body, html {
      margin: 0 !important;
      padding: 0 !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      background-color: #f4f7fa;
      color: #333;
      font-family: Arial, sans-serif;
    }
    table {
      border-collapse: collapse !important;
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
      border-spacing: 0 !important;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }
    a {
      text-decoration: none;
    }

    .email-container {
      width: 75vw;
      min-width: 300px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .header {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .content-area {
      padding: 25px 30px;
    }

    .section-title {
      font-size: 18px;
      color: #2c3e50;
      margin-top: 0;
      margin-bottom: 0;
      font-weight: 600;
      text-align: center;
      padding-bottom: 10px;
    }

    .info-text {
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 10px;
    }
    .info-text strong {
      color: #555;
    }

    .post-content, .gpt-analysis {
      background-color: #f8f8f8;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 15px;
      max-height: 250px;
      overflow-y: auto;
      font-family: 'Roboto Mono', 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-wrap: break-word;
      min-height: 300px;
      min-width: 300px;
      -webkit-overflow-scrolling: touch;
    }
    .post-content::-webkit-scrollbar, .gpt-analysis::-webkit-scrollbar {
      display: none;
    }
    .post-content, .gpt-analysis {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .button {
      display: inline-block;
      background-color: #1a73e8;
      color: #ffffff !important;
      padding: 12px 25px;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 20px;
      text-align: center;
    }

    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #888;
      border-top: 1px solid #eee;
      margin-top: 20px;
    }
    .footer a {
      color: #1a73e8;
      text-decoration: none;
    }

    @media only screen and (min-width: 601px) {
      .two-column-wrapper {
        width: 100% !important;
        table-layout: fixed;
      }
      .column {
        width: 50% !important;
        display: table-cell !important;
        vertical-align: top;
        padding-left: 10px;
        padding-right: 10px;
      }
      .column:first-child {
        padding-left: 0;
        padding-right: 10px;
      }
      .column:last-child {
        padding-left: 10px;
        padding-right: 0;
      }
    }

    @media only screen and (max-width: 600px) {
      .email-container {
        border-radius: 0;
        box-shadow: none;
      }
      .content-area {
        padding: 20px;
      }
      .header {
        border-radius: 0;
      }
      .two-column-wrapper, .column {
        width: 100% !important;
        display: block !important;
        padding: 0 !important;
      }
      .column:not(:last-child) {
        margin-bottom: 50px;
      }
      .post-content, .gpt-analysis {
        min-width: unset !important;
      }
    }
  </style>
</head>
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f4f7fa;">
  <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
    New post from @${username}! Check out the latest content and GPT analysis.
  </div>
  <center style="width: 100%; background-color: #f4f7fa;">
    <div style="display: none; max-height: 0px; overflow: hidden;">&nbsp;&zwnj;&nbsp;</div>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" class="email-container">
      <tr>
        <td align="center" class="header">
          <h2>🔔 New TruthSocial Post from @${username}</h2>
        </td>
      </tr>
      <tr>
        <td class="content-area">
          <table role="presentation" width="100%">
            <tr>
              <td style="padding-bottom: 10px;">
                <p class="info-text"><strong>Post URL:</strong> <a href="${post.postUrl}" style="color: #1a73e8; font-size: 14px;">${post.postUrl}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 20px;">
                <p class="info-text"><strong>Posted At:</strong> ${post.uploadTime}</p>
              </td>
            </tr>
          </table>

          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="two-column-wrapper">
            <tr>
              <td class="column" style="padding-right: 10px;">
                <table width="100%">
                  <tr><td><h3 class="section-title">📄 Post Content:</h3></td></tr>
                  <tr>
                    <td>
                      <div class="post-content">
                        ${post.text.replace(/\n/g, "<br>")}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
              <td class="column" style="padding-left: 10px;" , "padding-up: 10px;" >
                <table width="100%">
                  <tr><td><h3 class="section-title">🤖 GPT Analysis:</h3></td></tr>
                  <tr>
                    <td>
                      <div class="gpt-analysis">
                        ${JSON.stringify(gptResponse, null, 2).replace(/\n/g, "<br>").replace(/ /g, '&nbsp;')}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" class="footer">
          Sent by Smart Trader AI • ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
        </td>
      </tr>
    </table>
  </center>
</body>
</html>

  `;

    const recipients = EMAIL_TO.split(',').map(email => email.trim());

    for (const recipient of recipients) {
        const mailOptions = {
            from: EMAIL_FROM,
            to: recipient,
            subject,
            html
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Email sent to ${recipient}`);
        } catch (error) {
            console.error(`❌ Failed to send email to ${recipient}`, error);
        }
    }
}