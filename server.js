const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const allowedOrigins = [process.env.URL];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request comes from an allowed origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(bodyParser.json());

const port = process.env.port || 3000;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

app.post("/mail", (req, res) => {
  const mailOptions = {
    from: process.env.USER,
    to: process.env.RECEIVER,
    subject: "Feedback",
    text: `From: ${req.body.name} ${req.body.lastname}`,
    html: `Feedback : ${req.body.feedback}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
