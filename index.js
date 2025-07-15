
const express = require('express');
const twilio = require('twilio');
const app = express();
app.use(express.json());

const accountSid = process.env.ACCOUNT_SID || 'TU_ACCOUNT_SID';
const authToken = process.env.AUTH_TOKEN || 'TU_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

app.post('/wialon-event', async (req, res) => {
  const unidad = req.body.unit || 'Vehículo desconocido';
  const velocidad = req.body.speed || 'sin datos';

  const mensaje = `🚨 Alerta de Wialon: ${unidad} superó la velocidad: ${velocidad} km/h`;

  try {
    await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+54911XXXXXXXX',
      body: mensaje
    });

    res.status(200).send('✅ Mensaje enviado');
  } catch (error) {
    console.error('❌ Error al enviar mensaje:', error.message);
    res.status(500).send('Error al enviar mensaje');
  }
});

app.listen(3000, () => {
  console.log('🟢 Servidor escuchando en http://localhost:3000');
});
