import express from 'express'
const router = express.Router();
import  sendMessage  from '../utils/sendMessage.js';

router.post("/", (req, res) => {
  let body = req.body;


  if (req.body.object) {
    console.log(req.body.object)
    
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from;
      let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body;

      sendMessage(phone_number_id, from, msg_body, process.env.WHATSAPP_TOKEN);
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.get("/", (req, res) => {
  const verify_token = process.env.VERIFY_TOKEN;

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === verify_token) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

export default router;
