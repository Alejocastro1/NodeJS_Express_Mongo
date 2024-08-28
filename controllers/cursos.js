const express = require('express');
const curso = require('../models/curso_model');
const ruta = express.Router();



ruta.get('/',(req,res)=>{
    res.json('RRespuesta a peticion GET de CURSOS funcionando correctamente...');
});


module.exports = ruta;