const express = require('express');
const logic = require('../logic/curso_logic');
const ruta = express.Router();

//refactorizacion endpoint de tipo GET para el recurso cursos:
ruta.get('/',(req, res) => {
    let resultado = logic.listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
});


module.exports = ruta;


//endpoint de tipo POST para el recurso de CURSOS
ruta.post('/',  (req, res) => {
    let resultado = logic.crearCurso(req.body);

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
//endpoint de tipo PUT para el recurso de CURSOS
ruta.put('/:id', (req, res) => {
    let resultado = logic.actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
 })

 

 //endpoint de tipo DELETE para el recurso de CURSOS
 ruta.delete('/:id', (req, res) => {
    let resultado = logic.desactivarCurso(req.params.id);
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


