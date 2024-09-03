const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Requerir controladores
const usuarios = require('./controllers/usuarios');
const cursos = require('./controllers/cursos');

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb+srv://hearcammanuela:REQXK4hynPH70O4w@laboratorio.iyxky.mongodb.net/?retryWrites=true&w=majority&appName=Laboratorio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log('No se pudo conectar con MongoDB..', err));

// Inicializar Express
const app = express();
const port = process.env.PORT || 3000;

// Configuración básica de Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'API de Cursos y Usuarios',
          version: '1.0.0',
          description: 'Documentación de la API de Cursos y Usuarios'
      },
      servers: [
          {
              url: 'http://localhost:3000',
              description: 'Servidor de desarrollo'
          }
      ],
  },
  apis: ['./controllers/*.js'], // Aquí es donde defines qué archivos contienen anotaciones Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});
// Endpoints
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

