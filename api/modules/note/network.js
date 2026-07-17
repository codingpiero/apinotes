import express from "express";
import Controller from "./index.js";
import response from "../../../network/response.js";
import audit from "../../utils/audit.js";

let router = express.Router()

// ROUTER INTERNAL
router.post('/',create);
router.get('/',list);
// FUNCTION INTERNAL

function list(req,res){
    Controller.list(req.user.id)
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        console.log(err);
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
        console.log(err);
        response.error(req,res,500,'Ocurrio un error al registrar la nota.')
    })
}

export default router;