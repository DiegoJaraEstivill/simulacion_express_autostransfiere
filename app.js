const express = require('express'); const path = require('path'); const app = express(); const port = 7777;
app.get('/', (req, res) => { res.send('Hello World!Funciona el despliegue 9fj39r') })
app.listen(port, () => { console.log(`Example app listening on port ${port}`) })

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
