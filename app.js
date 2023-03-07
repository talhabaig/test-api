const express = require("express");
const cors = require("cors");
const Routes = require("./routes/routes.js");
const app = express();
const PORT = 3000;
app.use(
  cors({
    allowedHeaders: "*",
  })
);
app.use(express.json())
app.use(Routes);
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));