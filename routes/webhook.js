import express from 'express'
const router = express.Router();
import  sendMessage  from '../utils/sendMessage.js';

router.post("/", (req, res) => {
  let body = req.body;

  console.log(req)
return
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
