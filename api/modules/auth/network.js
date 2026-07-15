import express from "express";
import Controller from "./index.js";

const router = express.Router()

// ROUTER INTERNAL
router.post('/login',login)

// FUNCTION INTERNAL
function login(req,res){
    Controller.login(req.body)
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        res.send(err);
    })
}

export default router;