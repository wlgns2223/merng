import nodemailer from "nodemailer";

const sendEmail = async (email: string, url: string) => {
  const account = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const mailOption = {
    from: "kogi@email.com",
    to: email,
    subject: "hello",
    text: "Meow Meow",
    html: `<a href="${url}">${url}</a>`,
  };

  const info = await transporter.sendMail(mailOption);

  console.log(`Message Sent : ${info.messageId}`);
  console.log(`Preview URL : ${nodemailer.getTestMessageUrl(info)}`);
};

export default sendEmail;
