const axios = require("axios").default;
const { ChatGPTAPI } = require('chatgpt')

async function example(msg) {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const res = await api.sendMessage(msg)
  return res.text

}

const sendMessage = (phone_number_id, from, msg_body, token) => {

const sliptMSG = msg_body.split(" ");
const countKeyMSG = sliptMSG.length;

  if (countKeyMSG > 12 ) {
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
        text: { body: "A não essa mensagem é muito grande para eu processar por enquanto 😔, tente diminuir sua pergunta por gentileza"  },
      },
      headers: { "Content-Type": "application/json" },
    });
  }
  else{

  const valueText = example(msg_body)

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
        text: { body: `Chatgpt🤖 \n ${valueText}`  },
      },
      headers: { "Content-Type": "application/json" },
    });
  }
 
};

module.exports = { sendMessage };