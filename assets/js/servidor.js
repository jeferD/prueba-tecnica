const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const conexion = mysql.createConnection({
  host: 'prueba-tecnica.coqmo36gmpvw.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'cripto-monedas',
});

// app.use(cors({ origin: 'http://127.0.0.1:5501' }));
app.use(cors({ origin: '*' }));
conexion.connect((error) => {
  if (error) {
    console.log('Error en la conexión', error);
    return;
  }
  console.log('Conexión exitosa --------------------------------------');
});

// Ruta para obtener los datos de la base de datos
app.get('/datos', (req, res) => {
  const consulta = 'SELECT * FROM criptomoneda';
  conexion.query(consulta, (error, rows) => {
    if (error) {
      console.log('Error en la consulta', error);
      return;
    }
    res.json(rows); // Enviamos los datos obtenidos como respuesta
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
