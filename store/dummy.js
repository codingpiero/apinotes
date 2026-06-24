const DB = {
    notes:[
        {id_note:1,id_user:1,title:'sistema de papeleta vehicular',description:'realizar una api para el sistema de papelete vehicular de un entidad municipal,provincial o regional.'},
        {id_note:2,id_user:2,title:'sistema de numeracion',description:'realizar una api rest para el sistema numeracion de una entidad municipal, provincial o regional.'},
    ],
    user:[
        {id_user:1,name:'suemi',paternal_surname:'laura',maternal_surname:'chang',nickname:'suemi'},
        {id_user:2,name:'katsumi',paternal_surname:'chavez',maternal_surname:'flores',nickname:'kat'},
    ]
};

async function list(TABLA,id){
    return DB[TABLA].filter(data => data.id_user = id);
}
async function get(){}
async function update(){}
async function remove(){}


export default {
    list,
    get,
    update,
    remove
}