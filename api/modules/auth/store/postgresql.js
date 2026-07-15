import {Pool} from "pg";
import config from "../../../../config.js";

let pool = new Pool({
    connectionString:config.POSTGRESQL.URI,
});


async function searchUser(nickname){
    const result = await pool.query(`
        SELECT 
        u.id,
        u.name,
        u.paternal_surname,
        u.maternal_surname,
        u.nickname,
        a.password,
        u.active,
        STRING_AGG(ur.id_rol::text,',' ORDER BY ur.id_rol) as roles  
        FROM 
        notes.user u
        INNER JOIN 
        notes.auth a
        ON
        u.id = a.id_user 
        INNER JOIN 
        notes.user_rol ur
        ON
        u.id = ur.id_user
        WHERE
        nickname = $1
        GROUP BY 
        u.id,
        u.name,
        u.paternal_surname,
        u.maternal_surname,
        u.nickname,
        a.password,
        u.active`,[nickname]);
    return {data: result.rows, total:result.rowCount};
}

export default {
    searchUser,
}