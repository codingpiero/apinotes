
import express from "express";
import response from "../../../network/response.js";
import Controller from "./index.js";
import audit from "../../utils/audit.js";

const router = express.Router();

// ROUTER INTERNAL
router.patch('/',updateStatusUser);
router.put('/',update);
router.post('/',create);
router.get('/:nickname',get);
router.get('/',list);

// FUNCTION INTERNAL
function updateStatusUser(req,res){
    Controller.updateStatusUser(req.body)
    .then(resp => {
        response.success(req,res,resp.status,resp.message,resp?.info,resp?.result);
    })
    .catch(err => {
        response.error(req,res,500,'Ocurrio un error al actualizar el estado.')
    });
}
function get(req,res){
    Controller.get(req.params.nickname)
    .then(resp => {
        response.success(req,res,resp.status,resp.message,resp?.info,resp?.result);
    })
    .catch(err => {
        response.error(req,res,500,'Ocurrio un error al obtener informacion del usuario.')
    })
}
function update (req,res){
    Controller.update(req.body)
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        response.error(req,res,500,'Ocurrio un error al actualizar la informacion del usuario.');
    });
}

function list (req,res){
    Controller.list()
    .then(resp => {
        response.success(req,res,resp.status,resp.message,resp?.info,resp?.result);
    })
    .catch(err => {
        response.error(req,res,500,'Ocurrio un error al listar los usuarios.');
    })
}
function create(req,res){
    const created = audit.created_resource(req);
    Controller.create(req.body,created)
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        console.log(err);
        response.error(req,res,500,'Ocurrio un error al registrar el  usuario.');
    })
}
export default router;
