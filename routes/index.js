const { Router } = require("express");
const { store } = require("./firebase-config");
const nodemailer = require("nodemailer");
const router = Router();
const root = require.main.path;
const validator = require("../validator/validator");

router.get("/", (req, res) => {
  res.sendFile("/index.html", { root: root });
});

router.post("/contact-user", async (req, res) => {
  try {
    const isValidated = validator(req.body, res);
    if (isValidated?.status) {
      await store.doc().set(isValidated.body);
      res.send({ message: "ok" });
    }
  } catch (e) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/mail", async (req, res) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,

    auth: {
      user: "a02f093028f93a", // generated ethereal user
      pass: "ea8e2485f3286d", // generated ethereal password
    },
  });
  let info = await transporter
    .sendMail({
      from: `"Talha Baig" <baigtalha7@gmail.com>`, // sender address
      to: "wasiqibnzahid@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    })
    .then(() => {});
  res.send("done");
});

module.exports = router;
