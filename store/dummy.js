const DB = {};

async function list(TABLA){
    if(!DB[TABLA]){
        DB[TABLA] = [];
    }
    return DB[TABLA];
}
async function get(TABLA,id){
    const tabla = await list(TABLA);
    console.log(tabla);
    console.log(id);
    return tabla.filter(register => register.id === id);
};
async function create(TABLA,data){
    let tabla = await list(TABLA);
    tabla.push(data)
    return [data];
};
async function update(TABLA,id,data){
    const tabla = await list(TABLA);
    const oldData = tabla.find(register => register.id === id);
    const newData = {...oldData,...data};
    const result = [newData];
    return result;
};
async function remove(TABLA,id){
    const tabla = await list(TABLA);
    let index = tabla.findIndex(register => register.id === id);
    if(index === -1) return [];
    return tabla.splice(index,1);
};


export default {
    list,
    get,
    create,
    update,
    remove
}