import axios from "axios";
import { ChatGPTAPI } from "chatgpt";



const send = async (phone_number_id, from, msg_body, token) => {

  console.log(phone_number_id)

  const sliptMSG = msg_body.split(" ");
  const countKeyMSG = sliptMSG.length;

  if (countKeyMSG > 12) {
    return axios({
      method: "POST",
      url:
        "https://graph.facebook.com/v12.0/" +
        phone_number_id +
        "/messages?access_token=" +
        token,
      data: {
        messaging_product: "whatsapp",
        to: from,
        text: { body: "Ah não! essa mensagem é muito grande para eu processar por enquanto 😔, tente diminuir sua pergunta por gentileza" },
      },
      headers: { "Content-Type": "application/json" },
    });
  }
  else {

    try {
      const api = new ChatGPTAPI({
        apiKey: process.env.OPENAI_API_KEY
      })

      const res = await api.sendMessage(msg_body)

      const valueText = res.text

      return axios({
        method: "POST",
        url:
          "https://graph.facebook.com/v12.0/" +
          phone_number_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: { body: `Chatgpt🤖 \n ${valueText}` },
        },
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }

  }

};

export default send;