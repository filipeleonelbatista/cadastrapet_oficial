export const bots = {
  doguinho:
    "https://discord.com/api/webhooks/950804714289786920/HJAbJfkT1CsntchiCiZtdULTPOddUxLrVm_DRPas_V3nA1i_M7A2KOCmzWRNz1udSYTf",
  gatinho:
    "https://discord.com/api/webhooks/950805011955347457/twj7N-bhj4H0xCsG0CrbeedEQsvkK9J8aCD77PA6g5GpnzfHwqTZrhh4ZQtPsfEj_uvI",
};

// obter o id do usuário caso queira marcar alguem em um futuro próximo
export const colaboradores = {
  filipe: "",
};

export const sendDiscordNotification = async (message, bot) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Mensagem enviada: ", message, bot);
    return;
  } else {
    const requestPayload = {
      content: message,
      allowed_mentions: {
        parse: ["users"],
      },
    };

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestPayload),
    };
    const endpoint = bots[bot];

    return new Promise((resolve, reject) => {
      fetch(endpoint, requestOptions)
        .then((resp) => {
          resolve(resp.status);
        })
        .catch(reject);
    });
  }
};
