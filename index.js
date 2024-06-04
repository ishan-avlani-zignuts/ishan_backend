// //node mailer code to send the mail to the Ishan Avlani from any user.
// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 3002;

// app.use(bodyParser.json());
// // app.use(cors());
// const corsOptions = {
//   origin: "https://ishan-avlani-portfolio.vercel.app",
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// // const transporter = nodemailer.createTransport({
// //   service: "Gmail",
// //   auth: {
// //     user: "ishan.avlani110648@marwadiuniversity.ac.in",
// //     pass: "Ecak@369",
// //   },
// // });




// // Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Transporter configuration error: ", error);
//   } else {
//     console.log("Server is ready to take our messages:", success);
//   }
// });

// // API endpoint to handle form submission
// app.post("/sendEmail", (req, res) => {
//   const { email, message, number, name } = req.body;

//   if (!email || !message || !number || !email) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Email and message are required." });
//   }

//   const mailOptions = {
//     from: email,
//     to: "ishan.avlani119@gmail.com",
//     subject: "New Email from Your Website",
//     text: `You received a new email from ${email}.\n\nName:\n${name}.\n\nContact Number:\n${number}.\n\nMessage:\n${message}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error occurred while sending email:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to send email.",
//         error: error.toString(),
//       });
//     } else {
//       console.log("Email sent:", info.response);
//       res
//         .status(200)
//         .json({ success: true, message: "Email sent successfully." });
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
//for local
// app.use(cors());

let attempts = 0;
let delay = 1000;
//for live

const corsOptions = {
  origin: "https://ishan-avlani-portfolio.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "ishan.avlani110648@marwadiuniversity.ac.in",
//     pass: "Ecak@369",
//   },
// });

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "25391a83d94fd6",
    pass: "60624f4a7a7fc9",
  },
});

// Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Transporter configuration error: ", error);
//   } else {
//     console.log("Server is ready to take our messages:", success);
//   }
// });

transporter.verify((error, success) => {
  if (error) {
    attempts++;
    console.error(`Transporter configuration error: ${error}`);
    setTimeout(() => {
      transporter.verify((error, success) => {
        //...
      });
    }, delay);
    delay *= 2; // increase delay exponentially
  } else {
    console.log("Server is ready to take our messages:", success);
  }
});

// API endpoint to handle form submission
app.post("/sendEmail", (req, res) => {
  const { email, message, number, name } = req.body;

  if (!email || !message || !number || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Email and message are required." });
  }

  const mailOptions = {
    from: email,
    to: "ishan.avlani119@gmail.com",
    subject: "New Email from Your Website",
    text: `You received a new email from ${email}.\n\nName:\n${name}.\n\nContact Number:\n${number}.\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred while sending email:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send email.",
        error: error.toString(),
      });
    } else {
      console.log("Email sent:", info.response);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully." });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
