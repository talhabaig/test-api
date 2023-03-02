const { Router } = require("express");
const { store } = require("./firebase-config");
const nodemailer = require("nodemailer");
const router = Router();
const root = require.main.path;
const validator = require("../validator/validator");

const authData = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "wasiqibnzahid@gmail.com",
    pass: "ucxgpkuhvkqujurc",
  },
});
router.get("/", (req, res) => {
  res.sendFile("/index.html", { root: root });
});

router.post("/contact-user", async (req, res) => {
  try {
    const isValidated = validator(req.body, res);
    if (isValidated?.status) {
      await store.doc().set(isValidated.body);
      res.send({ message: "User Added Successfully" });
    }
    const { email, comment } = req.body;
    authData
      .sendMail({
        from: "wasiqibnzahid@gmail.com",
        to: email ?? "",
        subject: "Welcome to Artonion",
        text: comment,
        html: comment,
      })
      .then(() => {})
      .catch((e) => {
        console.log("failed sending email", e);
      });
  } catch (e) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
router.get("/contact-user", async (req, res) => {
  try {
    await store.get().then((data) => {
      let arr = [];
      data.forEach((item) => {
        arr.push(item.data());
      });
      res.send(arr);
      return arr;
    });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
