const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const allowedOrigins = ["https://thriving-meringue-d61910.netlify.app/"];

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
    user: "feedback.lavogiamatta@gmail.com",
    pass: "wjiz kamk uqgy sxaw",
  },
});

app.post("/mail", (req, res) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "grigzaqaryan85@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
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
