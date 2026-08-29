const nodemailer = require("nodemailer");

const hasSmtpConfig = () => {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_SENDER_EMAIL
  );
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendWelcomeEmail = async ({ toEmail, name, role }) => {
  if (!hasSmtpConfig()) {
    return;
  }

  const transporter = createTransporter();
  const appName = "JK LMS";

  await transporter.sendMail({
    from: process.env.SMTP_SENDER_EMAIL,
    to: toEmail,
    subject: `Welcome to ${appName}`,
    text: `Hi ${name},\n\nYour ${appName} ${role} account is ready.\n\nThanks,\n${appName} Team`,
  });
};

module.exports = {
  sendWelcomeEmail,
};
