const validator = require("validator");
const errorSender = (res) => {
  return (key) => res.status(400).send({ message: `Invalid ${key}` });
};

const validateStrings = (strings, handler) => {
  const list = Object.keys(strings);
  for (var i = 0; i < list.length; i++) {
    if (strings[list[i]] === undefined || typeof strings[list[i]] !== "string") {
      handler(list[i]);
      return;
    }
    return true;
  }
};

function validatePostBody(body, res) {
  const handler = errorSender(res);
  const { email, phoneNumber, company_name, website, comment, country, name } =
    body;
  if (!email || !validator.isEmail(email)) {
    handler("email");
    return;
  }
  if (!phoneNumber || !validator.isMobilePhone(phoneNumber)) {
    handler("Phone Number");
    return;
  }
  if (!website || !validator.isURL(website)) {
    handler("Website Url");
    return;
  }
  const validatedStrings = validateStrings(
    { company_name, comment, country, name },
    handler
  );
  if (validatedStrings) {
    return {
      status: true,
      body: {
        email,
        phoneNumber,
        company_name,
        website,
        comment,
        country,
        name,
      },
    };
  }
}

module.exports = validatePostBody;
