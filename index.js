const usuarios = require('./controllers/usuarios');
const cursos = require ('./controllers/cursos');

const express   = require('express');
const mongoose = require('mongoose');

//Conexion a la base de datos de mongoDB 
mongoose.connect('mongodb://localhost:27017/usercoursesdb',{useNewUrlParser: true, useUnifiedTopology:true})
   .then(() => console.log('Conectado a MongoDb'))
   .catch(err => console.log('No se pudo conectar con MongoDB..', err));

   
//middleware
const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//end points (recursos)
app.use('/api/usuarios',usuarios);
app.use('/api/cursos',cursos);

   const port=process.env.PORT || 3000;
   app.listen(port,()=>{
     console.log('Api REST Port ok,y ejecutandose...');

   })