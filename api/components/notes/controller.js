import key from "../../package/keys.js";

const TABLA = 'note';

const Controller = function (injectedStore){
    let store = injectedStore;
    async function list(){
        const data = await store.list(TABLA);
        if(data.length === 0){
            return {status:200,message:'No se encontraron resultados.'};
        }
        return {status:200,message:'Se encontraron resultados.',data};
    };
    async function get(id){
        const data = await store.get(TABLA,id);
        if(data.length === 0){
            return {status:200,message:'No se encontraron resultados.'};
        }
        return {status:200,message:'Se encontraron resultados.',data};
    };
    async function create(body,audit){
        const data = {
            id:key(10),
            ...body,
            ...audit
        };
        const result = await store.create(TABLA,data);
        if(result.length === 0 ){
            return {status:200,message:'No se ha realizado la operacion.'};
        }
        return {status:201,message:'Operacion realizada correctamente.',data:result};
    };
    async function update(id,body){
        const result = await store.update(TABLA,id,body);
        if(result.length === 0){
            return {status:200,message:'Operacion no realizada.'};
        }
        return {status:201,message:'Operacion realizada correctamente.',data:result};
    }
    async function remove(id){
        const result = await store.remove(TABLA,id);
        console.log(result);
        if(result.length === 0) return {status:200,message:'Operacion no realizada.'};
        return {status:200,message:'Operacion realizada correctamente.'}
    }
    return {
        list,
        get,
        create,
        update,
        remove
    }
}
export default Controller;