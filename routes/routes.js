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
const serviceAccount = {
  type: "service_account",
  project_id: "fir-backend-53936",
  private_key_id: "8f025fff7b7897607e38d4c519d0e4a7125cf374",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNu/XW2k/yO6Ku\nEqfYdrDtzovG7OjnFTr5CslkZdtVBEu4zykhMW2b2dr97+PKJMBh+wsJtr6/uGi9\nGYChZYqECH3y7aJ18z5qqkqwrav4RviCVtiLvRssB4T2NtffUPtr3ggChM4iGBck\nAGFUKvXTNKUlDeSPr9dvs48iDCdUKnSlZFWzYWcS+3y1Ww/ujL2LPUaxmfzsnmmY\nhXLcnkxWS+xTTFiS0KFc2nIOboRwlmqkC0MCx/3VvB8JNuiBGIse4LV2QyHXKnGU\nbhHm6MtSHJo5wI6lYNgxUS21TmdI7WWciTPBuX8yBpzUhoxj34oUl0L0ULjHLBB6\nx8C+mIX7AgMBAAECggEAGmqbC2Zmw4Syw8UzdhDvcOmHexhqY1mPg/DFoTWO7yCp\nFGbNMizllRBpFRgbWJZVeX9BkJK9dWKZWEaRBKhEG+X3Ph0TMi/0gL+y7XKvVSbP\nu/Sow3CZr5KbmP27xDnivpv4zVH+IdSUDBRcavFFNURaPCLHiUeb0wTsSQPkfOLn\nvVlq8zSYLhwoCROLV4hsFra2Wqhx5NfnKSKnFK9KPdPMR+HAbOPXK+tWqMKBJ0LT\nIkra3/NeKKAYmWefdViptzMCXTm2eBy+CREyyOv9UDiHvhpOIyMUT7Qp/YeQM+h7\n9Id0UlJqIExaL7PdF2V+wVc6L9R5B+HbPu9jsp2IQQKBgQDnaukyFoJxNdWGbOHy\nnCW6tM0Ghy/4JKi385OswI0qm80uU/gMGOR06afn95rGPmOQiKvYhkt1rtZS0gM9\nk6FD0jCgmrnZ+6gCiXAqosoviQB5CfW6qDNUVH/b62HJ2v1shwOZmHAMPOK6tudC\n6KAQbgjb1wfn7KLxoTdmHYwTYQKBgQDjlp/CB+ivBTQiW3gZD3tAzYfqswt7LJn4\nzMW3Z9YlYCQU7CHRy7gHV7YBTzlqXE2cd/oqultt9Xwa9m1KdfcUMezJUBxJ1xeG\n3no99voA/iPT1cXFT+suiSxpb5W8/jUYeqG3bxUrsBkwwSssTIhUuTSU1jLqlGqq\nERCAiNsy2wKBgBd/3MRQUtiqLc+juOIJBy/JclRqX+2j01oyqtlNCEi+X3yH3FVm\nJbTVkU5V72qYJUYlCsZHBNyjb3Ijj16uYh7f9j4o2ByRmIMBb9l0hHGFSP4Bi+lz\ncRrsJbuwUFLOIRPnNe9f8mjbue5Z6mv58V8ZvV6NnGjpt7Yvt89vyqyhAoGAVKLL\nPqkaSxwwSyag/xDW0T6d8RYsit4HVJMyZAZliPi78lvuJ8sO4QwpT0tbGsbAxhOI\nISO0pKvKP2ytMCe2fvgiCquUGZG32hwacbjLOFtKj5jMN5iE6YVx0rQAh4wxyqyw\nPzs8MEcI1yy/FXZQrNFDUKZnwPz4vc4iyOocOkkCgYEArZn6Ntq234ot99qMLCig\nnSE/6SqW3kaoafgoIhyNe7j4oTXvmpUytjrdoKuMjXc84L7hugKmlboBcW1X6ffW\n/dStosGTUOZbMVzc3onjclaSd72kgIaO9y6RdWhoWlDd+9zCz3m5oJZAziS7KzvH\nIa1K5mrQUxANtUi7SWbiqVU=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-lw79m@fir-backend-53936.iam.gserviceaccount.com",
  client_id: "118319044809688653051",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lw79m%40fir-backend-53936.iam.gserviceaccount.com",
};

module.exports = router;
