import encrypt from "../../lib/encrypt.js";
import audit from "../../utils/audit.js";
import dto from "./dto.js";

function Controller(injectedStore){
    let store = injectedStore;
    async function list(){
        const result =  await store.list();
        if(result.total === 0){
            return {status:200,message:'No se encontraron resultados.'};
        }
        return {status:200,message:'Se encontraron resultados.',info:[{total:result.total}],result:result.data};
    };
    async function create(body,created){
        let validBody = dto.SchemaCreateUser.safeParse(body);
        if(!validBody.success)
            return {status:400,message:'Informacion Invalida.'};

        const data = {
            ...body,
            password: await encrypt.generatedEncryption(body.password),
            ...created};
        console.log(data);  
        const response = await store.create(data);
        if(response.length === 0){
            return {status:200,message:`Usuario ${body.nickname} no creado.`}
        }
        return {status:201,message:`Usuario ${body.nickname} creado.`};
    };
    async function update(body){
        let validBody = dto.SchemaUpdateUser.safeParse(body);
        if(!validBody.success){
            return {status:400,message:'Informacion Invalida.'};
        }
        const result = await store.update(body);
        return {status:201,message:'Operacion realizada.'};
    }
    async function updateStatusUser(body){
        let validBody = dto.SchemaStatusUser.safeParse(body);
        if(!validBody.success){
            return {status:400,message:'Informacion Invalida.'};
        }
        let user = await store.get(body.nickname);
        if(user.length === 0){
            return {status:200,message:`No se encontro ${body.nickname} registrado.`};
        }
        let response = await store.toggleStatus(body);
        console.log(response);
        return {status:202,message:'Operacion realizada.'};
    }
    async function get(nickname){
        let result = await store.get(nickname);
        if(result.length === 0){
            return {status:200,message:'No se encontraron resultados.'};
        }
        return {status:200,message:'Se encontraron resultados.',result};
    }
    return {
        list,
        create,
        update,
        updateStatusUser,
        get
    }
}
export default Controller;