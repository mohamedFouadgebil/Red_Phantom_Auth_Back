export const template = (code, firstName) => `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #121212;
      color: #ffffff;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #1e1e1e;
      border: 1px solid #333333;
      border-radius: 8px;
      overflow: hidden;
    }
    .email-header {
      background-color: #d32f2f;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      color: #f4f4f4;
      line-height: 1.6;
    }
    .email-body h2 {
      margin-top: 0;
      color: #d32f2f;
    }
    .activation-button {
      display: inline-block;
      background-color: #d32f2f;
      color: #ffffff !important;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      margin: 20px 0;
    }
    .activation-button:hover {
      background-color: #b71c1c;
    }
    .email-footer {
      text-align: center;
      padding: 15px;
      background-color: #121212;
      font-size: 14px;
      color: #888888;
    }
    .email-footer a {
      color: #d32f2f;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Activate Your Account</h1>
    </div>
    <div class="email-body">
      <h2>Hello ${firstName},</h2>
      <p>Thank you for signing up with <strong>Red Phantom</strong>. To complete your registration and start using your account, please use the code below to activate your account:</p>
      <h2 class="activation-button">${code}</h2>
      <p>If you did not sign up for this account, please ignore this email.</p>
      <p>Best regards,<br>Red Phantom Team</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2026 <strong>Red Phantom</strong>. All rights reserved.</p>
      <p><a href="[SupportLink]">Contact Support</a> | <a href="[UnsubscribeLink]">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>`;
