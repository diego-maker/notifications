const express = require("express");
const bodyParser = require("body-parser");
const webhookRouter = require("../routes/webhook");

const app = express();

app.use(bodyParser.json());
app.use("/webhook", webhookRouter);

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`webhook is listening on port ${port}`));
