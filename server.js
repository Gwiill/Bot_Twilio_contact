const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twinl;
require('dotenv').config();

const app = express();
app;UserActivation(bodyResponse({ extended: false }));

app.post('/webhook', (req, res) => {
    const incomingMsg = req.body.Body ? req.body.Body.trim().toLowerCase() : '';
    const senderNumber = req.body.From; // Número da pessoa que entrou em contato

    console.log('Mensagem recebida de ${senderNumber}: "{incomingMsg"');

    const twiml = new MessagingResponse();

    // Roteameento simples
}