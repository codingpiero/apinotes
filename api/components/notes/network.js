
import express from "express";
import response from "../../../network/response.js";


const router = express.Router();
//ROUTER INTERNAL
router.get('/',list);

//FUNCTION INTERNAL
function list(req,res){
    response.success(req,res,200,'mis notes',[]);
}

export default router;