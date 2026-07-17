import {Pool} from "pg";
import config from "../../../../config.js";

const pool = new Pool({
    connectionString:config.POSTGRESQL.URI,
});

async function list(id_user){
    const result = await pool.query(`
        SELECT 
        n.id as codigo,
        n.title,
        n.description,
        n.date_start,
        n.active
        FROM 
        notes.note n 
        INNER JOIN 
        notes.user u
        ON 
        n.id_user = u.id
        WHERE
        id_user = $1`,[
            id_user
        ]);
    return {data:result.rows,total:result.rowCount};
}
async function create(data){
    let result = await pool.query(`
    INSERT INTO notes.note
    (id_user,
     title,
     description,
     date_start,
     created_by_user,
     created_at_host,
     created_by_ip)
    VALUES
    ($1,$2,$3,$4,$5,$6,$7)
    `,
    [
     data.id_user,
     data.title,
     data.description,
     data.date_start,
     data.created_by_user,
     data.created_at_host,
     data.created_by_ip   
    ]);
    return {data:result.rows,total:result.rowCount}
}

export default {
    list,
    create,
}