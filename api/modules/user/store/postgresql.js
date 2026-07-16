import {Pool} from "pg";
import config from "../../../../config.js";

let pool = new Pool({
    connectionString:config.POSTGRESQL.URI,
});

async function list(){
    const response = await pool.query(`
        SELECT id,name,CONCAT(paternal_surname,' ',maternal_surname) as apellidos ,nickname,active 
        FROM notes.user 
    `);
    return {data:response.rows,total:response.rowCount};
};
async function create(data){
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const user = await client.query(`
            INSERT INTO notes.user
            (name,
            paternal_surname,
            maternal_surname,
            nickname,
            email,
            created_by_user,
            created_at_host,
            created_by_ip)
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,[   
                data.name,
                data.paternal_surname,
                data.maternal_surname,
                data.nickname,
                data.email,
                data.created_by_user,
                data.created_at_host,
                data.created_by_ip
            ]);
        await client.query(` 
            INSERT INTO notes.auth
            (id_user,password)
            VALUES
            ($1,$2)`,[user.rows[0].id,data.password]);
        const DEFAULT_ROLE = 1;
        await client.query(`
            INSERT INTO notes.user_rol
            (id_user,id_rol)
            VALUES
            ($1,$2)`,
            [user.rows[0].id,DEFAULT_ROLE]);
        await client.query('COMMIT');
        return [user.rows[0]];
    }catch(err){
        await client.query('ROLLBACK');
        throw (err);
    }
};
async function toggleStatus(data){
    let result = await pool.query(`
        UPDATE notes.user 
        SET
        active = $1 
        WHERE
        nickname = $2`,[
            data.active,
            data.nickname
        ]);
    return {data:result.rows,total:result.rowCount};
}

async function get(nickname){
    const result = await pool.query(`
        SELECT 
        name,
        paternal_surname,
        maternal_surname,
        nickname,
        active,
        created_by_user,
        created_at 
        FROM 
        notes.user
        WHERE
        nickname = $1`,[nickname]);
    return result.rows
}

async function update(data){
    const result = await pool.query(`
        UPDATE notes.user
        SET
        name = $1,
        paternal_surname = $2,
        maternal_surname = $3,
        email = $4
        WHERE 
        nickname = $5
        `,
        [
            data.name,
            data.paternal_surname,
            data.maternal_surname,
            data.email,
            data.nickname
        ]);
    return result.rowCount;

}

export default {
    list,
    create,
    toggleStatus,
    get,
    update,
}