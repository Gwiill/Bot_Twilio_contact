require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar os dados enviados via POST pelo webhook da Twilio
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota de teste para verificar se o servidor está no ar no navegador
app.get('/', (req, res) => {
    const legends = "Bot de Portfólio com Twilio e Node.js está online e a funcionar! 🚀";
    res.send(legends);
});

// Rota principal do Webhook que recebe as mensagens do WhatsApp
app.post('/webhook', (req, res) => {
    const incomingMsg = req.body.Body ? req.body.Body.trim().toLowerCase() : '';
    const senderID = req.body.From;

    console.log(`Mensagem recebida de ${senderID}: "${incomingMsg}"`);

    // Cria o objeto de resposta TwiML exigido pela Twilio
    const twiml = new twilio.twiml.MessagingResponse();

    // Lógica de comandos do portfólio
    if (incomingMsg.includes('/projetos') || incomingMsg.includes('projetos')) {
        twiml.message(
            '🚀 *Meus Principais Projetos:*\n\n' +
            '1️⃣ *Bot de Portfólio WhatsApp* - Node.js, Express e Twilio API.\n' +
            '2️⃣ *Agente Red Team Mobile* - React Native, Expo e Firebase Firestore.\n' +
            '3️⃣ *Lab de Cibersegurança* - Wazuh SIEM, VMs e automação com Python.'
        );
    } else if (incomingMsg === '/curriculo' || incomingMsg === '/cv') {
        twiml.message('📄 Podes consultar e descarregar o meu currículo atualizado através do link abaixo: https://drive.google.com/open?id=1j0KLYdzvsn8rsYPHT0uy1kSAIGuedZKC');
    } else if (incomingMsg.includes('/stack') || incomingMsg.includes('stack') || incomingMsg.includes('tecnologias')) {
        twiml.message(
            '💻 *Minha Stack Tecnológica:*\n\n' +
            '• *Linguagens:* JavaScript (Node.js), Python\n' +
            '• *Mobile/Frontend:* React Native, Expo\n' +
            '• *Banco de Dados & Nuvem:* Firebase Firestore\n' +
            '• *Segurança & Infra:* Cibersegurança, Wazuh SIEM, Redes'
        );
    } else if (incomingMsg.includes('/contato') || incomingMsg.includes('contato')) {
        twiml.message(
            '📬 *Vamos conversar?*\n\n' +
            'Estou sempre aberto a novos desafios e oportunidades na área de desenvolvimento e cibersegurança! Pode responder por aqui ou conectar comigo através do GitHub e LinkedIn.'
        );
    } else {
        twiml.message(
            '👋 Olá! Bem-vindo ao meu bot de portfólio interativo.\n\n' +
            'Escolha um comando abaixo para saber mais:\n' +
            '• */projetos* - Ver projetos em destaque\n' +
            '• */stack* - Conhecer tecnologias e ferramentas\n' +
            '• */contato* - Informações de contacto profissional'
        );
    }

    // Retorna a resposta formatada em XML (TwiML) para a Twilio enviar ao WhatsApp
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

// Inicia o servidor local
app.listen(PORT, () => {
    console.log(`Servidor webhook rodando na porta ${PORT} 🚀`);
});