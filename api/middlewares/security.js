import jwt from "../lib/jwt.js";
import response from "../../network/response.js";

const validToken = (req,res,next) => {
    const authorization = req.headers.authorization;
    if(!authorization){
        return response.success(req,res,401,'Token no enviado.');
    }
    let token = authorization.split(' ')[1];
    let respjwt =  jwt.verifyJwt(token);
    if(!respjwt.success){
        return response.error(req,res,401,respjwt.message);
    }
    req.user = respjwt.data;
    next();
}
const verifyRoles = (...roles) => {
    return (req,res,next) => {
        let myRoles = req.user.roles.split(',');
        let validRoles = myRoles.filter(rol => 
            roles.includes(Number(rol)))
        if(validRoles.length === 0){
            return response.success(req,res,403,'No tiene autorizacion para este recurso.');
        }
        next();
    }
}
export default {
    validToken,
    verifyRoles,
}