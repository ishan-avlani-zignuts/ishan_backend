const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
// app.use(cors());

// const transporter = nodemailer.createTransport({
//   host :"sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "25391a83d94fd6",
//     pass: "60624f4a7a7fc9",
//   },
// });

const corsOptions = {
  origin: "https://ishan-avlani-portfolio.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ishan.avlani110648@marwadiuniversity.ac.in",
    pass: "Ecak@369",
  },
});

app.post("/sendEmail", async (req, res) => {
  const { email, message, number, name } = req.body;

  try {
    if (!email || !message || !number || !name) {
      throw new Error("Email, message, name, and number are required.");
    }

    const startTime = Date.now();

    await transporter.sendMail({
      from: "ishan.avlani110648@marwadiuniversity.ac.in",
      to: "ishan.avlani119@gmail.com",
      subject: "New Email from Your Portfolio",
      text: `You received a new email from ${email}.\n\nName: ${name}.\n\nContact Number: ${number}.\n\nMessage: ${message}`,
    });

    const endTime = Date.now();
    const duration = endTime-startTime;
    console.log(`Email sent in ${duration} ms`);

    res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email.",
      error: error.toString(),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


