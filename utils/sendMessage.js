const axios = require("axios").default;
const buttonWelcome = require('./Models/button-wellcome');

const sendMessage = (phone_number_id, from, msg_body, token) => {

  const template =buttonWelcome.template 
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v12.0/" +
      phone_number_id +
      "/messages?access_token=" +
      token,
    data: {
      messaging_product: "whatsapp",
      to: from,
      type: "template",
      template: template
    },
    headers: { "Content-Type": "application/json" },
  });
};

module.exports = { sendMessage };