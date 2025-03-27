import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Verificar si ya hay un token en la cookie
    const token = Cookies.get("token");
    console.log("Token en useEffect:", token);
    if (token) {
      console.log("JWT encontrado en cookie:", token);
      navigate("/descarga-certificados");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Iniciando login...");
      const response = await fetch("http://localhost:7777/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Respuesta completa del servidor:", data);

      if (response.ok) {
        // Verificar todas las cookies disponibles
        console.log("Todas las cookies:", document.cookie);
        
        // Verificar la cookie específica
        const token = Cookies.get("token");
        console.log("Token después del login:", token);
        
        if (token) {
          console.log("Login exitoso, navegando a /descarga-certificados");
          navigate("/descarga-certificados");
        } else {
          console.log("No se encontró el token en las cookies");
          setError("Error al establecer la cookie. Por favor, intenta de nuevo.");
        }
      } else {
        setError(data.message || "Error en la autenticación");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Venta de Certificados</h2>
        <h3>Ingreso al Sistema</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Clave de Acceso</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login; 