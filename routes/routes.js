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
    user: "artonionro@gmail.com",
    pass: "ttymlfilkpcyozox",
  },
});
router.get("/", (req, res) => {
  res.sendFile("/index.html", { root });
});

router.post("/contact-user", async (req, res) => {
  try {
    const isValidated = validator(req.body, res);
    if (isValidated?.status) {
      await store.doc().set(isValidated.body);
      res.send({ message: "User Added Successfully" });
    }
    const { email, comment } = req.body;
    const tableData = () => {
      let userData = ``
      const keys = Object.keys(req.body);
      for(let i = 0; i < keys.length; i++) {
        userData += `
        <tr style='border: 1px solid black;'>
        <td style='padding: 0.25rem;border: 1px solid black;'>${keys[i]}</td>
        <td style='padding: 0.25rem;border: 1px solid black;'>${req.body[keys[i]]}</td>
        </tr>
        `
      }
      
      return userData;
    }
    authData
      .sendMail({
        from: "artonionro@gmail.com",
        to: "contact@artonion.ro",
        subject: "New User Authenticated",
        text: `
        A new user has joined Artonion. 
        Their email address is ${email}. ${
          comment && comment?.length > 0
            ? `They have left a comment: ${comment}`
            : ""
        }
        `,
        html: `
        <h2>A new user has joined Artonion,</h2>
        <p>Their email address is ${email}</p>
        ${
          comment && comment.length > 0
            ? `
        They have left a comment stating ${comment}
        `
            : ""
        }

      <h4>Their information is as follows</h4>
      <table style='border: 1px solid black; border-collapse: collapse;'>
      <tbody>
      ${tableData()}
      </tbody>
      </table>
        `,
      })
      .then(() => {})
      .catch((e) => {
        console.log("failed sending email", e);
      });
  } catch (e) {
    console.log(e);
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
