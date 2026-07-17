import dto from "./dto.js";

function Controller(injectedStore){
    let store = injectedStore;
    async function list(id_user){
        if(!id_user){
            return {status:400,message:'Codigo de usuario invalido.'};
        }
        const response = await store.list(id_user);
        if(response.total === 0){
            return {status:200,message:'No se encontraron resultados.'};
        }
        return {status:200,message:'Se encontraron resultados.',info:[{total:response.total}],result:response.data};
    }
    async function create(body,audit,id_user){
        let validBody = dto.schemaCreateNote.safeParse(body);
        if(!validBody.success)
            return {status:400,message:'Informacion Invalida'};
        const data = {
            ...body,
            date_start: new Date(body.date_start),
            id_user,
            ...audit
        }
        const result = await store.create(data);
        console.log(result);
        return {status:201,message:'Nota creada correctamente.'};
    }
    return {
        list,
        create
    }
}

export default Controller;