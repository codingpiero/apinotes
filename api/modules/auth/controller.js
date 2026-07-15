import encrypted from "../../lib/encrypt.js";
import jwt from "../../lib/jwt.js";

function Controller(injectedStore){
    let store = injectedStore;
    async function login(body){
        if(!body){
            return {status:200,message:'Ingrese su nickname y/o password.'};
        }
        let {nickname,password } = body;
        if(!nickname ||nickname.length === 0){
            return {status:200,message:'Ingrese su nickname.'};
        }
        if(!password ||password.length === 0){
            return {status:200,message:'Ingrese su password.'};
        }
        const result = await store.searchUser(nickname);
        if(result.total === 0 ){
            return {status:200,message:'No se encontraron resultados'};
        }
        if(!result.data[0].active){
            return {status:200,message:'El usuario se encuentra inactivo.'};
        }
        let {password:userEncryptedPassword,...user} = result.data[0];
        let validPassword = await encrypted.comparedEncryption(password,userEncryptedPassword);
        if(!validPassword){
            return {status:200,message:'Password Incorrecto.'};
        }
        const token = jwt.generatedJwt(user);
        
        return {status:200,message:'Operacion realizada correctamente.',token};
    };
    return {
        login,
    }
}

export default Controller;