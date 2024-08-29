const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

//refactorizacion endpoint de tipo GET para el recurso cursos:
ruta.get('/',(req, res) => {
    let resultado = listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
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

 //funcion asincronica para eliminar cursos
 async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, {new: true});
    return curso;
 }

 //endpoint de tipo DELETE para el recurso de CURSOS
 ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
 })
 //endpoint de tipo GET para el recurso de CURSOS por ID
 ruta.get('/:id', (req, res) => {
    Curso.findById(req.params.id, (err, curso) => {
        if(err) return res.status(500).send({message: "Error al realizar la peticion"});
        if(!curso) return res.status(404).send({message: "Curso no encontrado"});
        res.json(curso);
    });
});
//Funcion asincronica para listar los cursos activos
async function listarCursosActivos(){
    let cursos = await Curso.find({"estado": true});
    return cursos;
}


