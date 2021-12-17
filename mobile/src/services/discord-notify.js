export const bots = {
  doguinho: 'https://discord.com/api/webhooks/921380877802549258/GtbblZ4HVU69G3pA0-AAZWJNXknvTdmiPq6JSq4_JKaoESoLtY_qP2AgmGA4vhVvZqJ3',
  gatinho: 'https://discord.com/api/webhooks/921382352272363520/6398OUqtmao6BHH759h56c77lzlfLrOtCbMjP3qkrqSzNmKZFV7_FLdBEyKW1pBO0VQq',
}

// obter o id do usuário caso queira marcar alguem em um futuro próximo
export const colaboradores = {
  filipe: ''
}

export const sendDiscordNotification = async (message, bot) => {
  const requestPayload = {
    content: message,
    allowed_mentions: {
      parse: ['users'],
    },
  }

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(requestPayload),
  }
  const endpoint = bots[bot]

  return new Promise((resolve, reject) => {
    fetch(endpoint, requestOptions)
      .then((resp) => {
        resolve(resp.status)
      })
      .catch(reject)
  })
}