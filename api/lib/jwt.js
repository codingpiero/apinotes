import jwt from "jsonwebtoken";
import config from "../../config.js";

const generatedJwt = (data) => {
    const token = jwt.sign(data,config.JWT.SECRET_KEY,{
        expiresIn:'1h',
    });
    return token;
}

const verifyJwt = (token) => {
    try{
        const decoded = jwt.verify(token,config.JWT.SECRET_KEY);
        return {success:true,data:decoded};
    }catch(err){
        return {success:false,message:'Token invalido o expirado.'};
    }
}


export default {
    generatedJwt,
    verifyJwt,
}