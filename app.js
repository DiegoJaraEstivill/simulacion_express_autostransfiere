const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 7777;
const SECRET_KEY = "tu_secreto_super_seguro"; // Reemplázalo con una clave segura

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World! Funciona el despliegue 9fj39r");
});

// Ruta de login con JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña requeridos" });
  }

  // Validación simulada (reemplazar con base de datos en el futuro de ser necsario no mas
  if (username !== "admin" || password !== "1234") {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Generar JWT
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  // Enviar cookie con el JWT
  res.cookie("token", token, {
    httpOnly: false, // Permite acceso desde JavaScript
    secure: false,
    sameSite: 'lax',
    maxAge: 3600000,
    path: '/'
  });
    
 // Enviar un indicador de éxito sin el token
 res.json({ 
  message: "Login exitoso",
  success: true
});

  console.log("JWT generado y enviado en cookie:", token);
  res.json({ message: "Login exitoso" });
});

// Ruta protegida de ejemplo
app.get("/descarga-certificados", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: "Acceso concedido", user: decoded.username });
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
});






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





app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
