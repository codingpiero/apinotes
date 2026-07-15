
import express from "express";
import response from "../../../network/response.js";
import Controller from "./index.js";
import audit from "../../utils/audit.js";

const router = express.Router();

// ROUTER INTERNAL
router.post('/',create);
router.get('/',list);

// FUNCTION INTERNAL
function list (req,res){
    Controller.list()
    .then(resp => {
        response.success(req,res,resp.status,resp.message,resp?.info,resp?.result);
    })
    .catch(err => {
        res.send(err);
    })
}
function create(req,res){
    const created = audit.created_resource(req);
    Controller.create(req.body,created)
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        res.send(err);
    })
}
export default router;
