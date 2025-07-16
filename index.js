const express = require('express');
const twilio = require('twilio');
const app = express();
app.use(express.json());

// Cargar credenciales desde variables de entorno o usar por defecto (solo para pruebas)
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'TU_ACCOUNT_SID';
const authToken = process.env.AUTH_TOKEN || 'TU_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

// Ruta que Wialon llamará
app.post('/webhook', async (req, res) => {
  const unidad = req.body.unit || 'Vehículo desconocido';
  const velocidad = req.body.speed || 'sin datos';

  const mensaje = `🚨 Alerta de Wialon: ${unidad} superó la velocidad: ${velocidad} km/h`;

  try {
    await client.messages.create({
      from: 'whatsapp:++14155238886', // número sandbox Twilio
      to: 'whatsapp:+543755438595',  // tu número verificado en Twilio
      body: mensaje
    });

    res.status(200).send('✅ Mensaje enviado');
  } catch (error) {
    console.error('❌ Error al enviar mensaje:', error.message);
    res.status(500).send('Error al enviar mensaje');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en http://localhost:${PORT}`);
});
