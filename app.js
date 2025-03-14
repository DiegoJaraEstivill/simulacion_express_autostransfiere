const express = require('express'); const path = require('path'); const app = express(); const port = process.env.PORT || 7777;
const cors = require("cors");
app.get('/', (req, res) => { res.send('Hello World!Funciona el despliegue 9fj39r') })
app.listen(port, () => { console.log(`Example app listening on port ${port}`) })
// 🔥 Agregar CORS correctamente antes de definir rutas
app.use(cors({ origin: "http://localhost:3001", credentials: true }));

// Middleware para parsear JSON
app.use(express.json());


app.get('/OficinaInternet/servlet/docs', (req, res) => {
  const file = req.query.file; // Se obtiene el archivo de la URL
  const option = req.query.option; // Captura de opciones (solo para log)
  console.log("option zz:", option); // Solo para depuración
  if (!file) {
    return res.status(400).send('Se requiere el nombre del archivo.');
  }
  const filePath = path.join(__dirname, 'OficinaInternet', 'servlet', 'docs', file);
  res.setHeader('Content-Type', 'application/pdf'); // Asegurar que el navegador lo trate como PDF
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error al enviar el archivo:', err);
      res.status(500).send('Error al recuperar el archivo.');
    }
  });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña requeridos" });
  }
  console.log("Usuario:", username);
  console.log("Contraseña:", password);
  // Aquí podrías hacer validaciones con una base de datos en el futuro
  res.json({ message: "Login exitoso", username });
});