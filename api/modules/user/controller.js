import encrypt from "../../lib/encrypt.js";
import audit from "../../utils/audit.js";
import dto from "./dto.js";

function Controller(injectedStore){
    let store = injectedStore;
    async function list(){};
    async function create(body,created){
        let validBody = dto.SchemaCreateUser.safeParse(body);
        if(!validBody.success)
            return {status:400,message:'Informacion Invalida.'};

        const data = {
            ...body,
            password: await encrypt.generatedEncryption(body.password),
            ...created};   
        const response = await store.create(data);
        if(response.length === 0){
            return {status:200,message:`Usuario ${body.nickname} no creado.`}
        }
        return {status:201,message:`Usuario ${body.nickname} creado.`};
    };
    return {
        list,
        create,
    }
}
export default Controller;