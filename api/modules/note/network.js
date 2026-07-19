import express from "express";
import Controller from "./index.js";
import response from "../../../network/response.js";
import audit from "../../utils/audit.js";

let router = express.Router()

// ROUTER INTERNAL
router.delete('/:id',remove);
router.put('/:id',update);
router.post('/',create);
router.get('/',list);
// FUNCTION INTERNAL

function remove(req,res){
    Controller.remove(req.params.id)
    .then(resp => {
        response.success(req,res,resp.status,resp.message,resp?.info,resp?.data);
    })
    .catch(err => {
        response.error(req,res,500,'Ocurrio un error al eliminar la nota.');
    });
}
function update(req,res){
    let modified = audit.modified_resourse(req);
    Controller.update(req.params.id,req.body,modified)
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        console.log(err);
        response.error(req,res,500,'Ocurrio un error al actualizar la informacion de la nota.');
    })
}
function list(req,res){
    Controller.list(req.user.id)
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        response.error(req,res,500,'Ocurrio un error al mostrar tus notas.');
    })
}
function create(req,res){
    let created = audit.created_resource(req);
    Controller.create(req.body,created,req.user.id ?? 0)
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        response.error(req,res,500,'Ocurrio un error al registrar la nota.')
    })
}

export default router;