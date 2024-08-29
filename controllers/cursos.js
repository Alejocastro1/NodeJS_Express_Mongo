const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();



ruta.get('/',(req,res)=>{
    res.json('RRespuesta a peticion GET de CURSOS funcionando correctamente...');
});


module.exports = ruta;
//Funcion asincronica para crear cursos
async function crearCurso(body){
    let curso = new Curso({
        titulo        : body.titulo,
        descripcion   : body.descripcion,
        alumnos : body.alumnos,
        calificacion : body.calificacion
   });
   return await curso.save();
}

//endpoint de tipo POST para el recurso de CURSOS
ruta.post('/',  (req, res) => {
    let resultado = crearCurso(req.body);

    resultado.then(curso =>{
        res.json({
            curso
        })
    }).catch(err=>{
        res.status(400).json({
         err
        })
    })
});   

//funcion asincronica para actualizar cursos

async function actualizarCurso(id, body){
    let curso= await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion,
          
        }
    }, {new: true});
    return curso;
}

//endpoint de tipo PUT para el recurso de CURSOS
ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
 })
