
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'michalla37@gmail.com',
        pass: 'kqjf zowc lqej cqbi',
    }
});

export const sendMailOtp = async (params) => {
    try {
        let info = await transporter.sendMail({
            from: " michalla37@gmail.com",
            to: params.to,
            subject: `Hi  ${params.name}✔`,
            html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px;text-align:center"
        >
          <h2>Welcome to the club.</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">Please enter the sign up OTP to get started</p>
          <h1 style="font-size: 30px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
     </div>
      `,
        });
        return info;
    } catch (error) {
        console.log(error);
        return false;
    }
};
