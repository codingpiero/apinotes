
import express from "express";
import Controller from "./index.js";
import response from "../../../network/response.js";
import audit from "../../utils/audit.js";

const router = express.Router();
//ROUTER INTERNAL
router.delete('/:id',remove);
router.patch('/:id',update);
router.post('/',create);
router.get('/:id',get);
router.get('/',list);

//FUNCTION INTERNAL
function remove(req,res){
    Controller.remove(req.params.id)
    .then(resp => {
        response.success(req,res,resp.status,resp.message,resp?.data);        
    })
    .catch(err => {
        console.log(err);
        response.error(req,res,500,'ERROR INTERNAL.');
    })
}
function update(req,res){
    Controller.update(req.params.id,req.body)
    .then(resp => {
        response.success(req,res,resp.status,resp.message,resp?.data);        
    })
    .catch(err => {
        console.log(err);
        response.error(req,res,500,'ERROR INTERNAL.');
    })
}
function create(req,res){
    const auditCreated = audit.created(req);
    Controller.create(req.body,auditCreated)
    .then((resp)=>{
        response.success(req,res,resp.status,resp.message,resp?.data);
    })
    .catch(err => {
        console.log(err);
        response.error(req,res,500,'ERROR INTERNAL.');
    })
}

function get(req,res){
    Controller.get(req.params.id)
    .then((resp)=>{
        response.success(req,res,resp.status,resp.message,resp?.data);
    })
    .catch(err=>{
        console.log(err);
        response.error(req,res,500,'ERROR INTERNAL.');
    })
}
function list(req,res){
    Controller.list()
    .then((resp)=>{
        response.success(req,res,resp.status,resp.message,resp?.data);
    })
    .catch((err)=>{
        console.log(err);
        response.error(req,res,500,'ERROR INTERNAL.');
    })
}

export default router;