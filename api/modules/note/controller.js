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
        return {status:201,message:'Nota creada correctamente.'};
    }
    async function remove(id){
        let codigo = Number(id);
        const validCodigo = dto.schemaCodigoNote.safeParse(codigo);
        if(!validCodigo.success){
            return {status:200,message:'Codigo Invalido.'};
        }
        const response = await store.remove(codigo);
        if(response.total === 0 ){
            return {status:200,message:'Codigo no encontrado.'};
        }
        return {status:200,message:'Nota eliminada correctamente.'};
    }
    async function update(id,body,audit){
        let codigo = Number(id);
        let validCodigo = dto.schemaCodigoNote.safeParse(codigo);
        if(!validCodigo.success){
            return {status:200,message:'Operacion no realizada.'};
        }
        let validBody = dto.schemaUpdateNote.safeParse(body);
        if(!validBody.success){
            return {status:400,message:'Informacion invalida'};
        }
        const data = {
            id:codigo,
            ...body,
            ...audit
        }        
        const response = await store.update(data);
        if(response.total === 0){
            return {status:200,message:'Operacion no realizada.'};
        }
        return {status:201,message:'Operacion realizada correctamente.'};
    }
    return {
        list,
        create,
        remove,
        update,
    }
}

export default Controller;