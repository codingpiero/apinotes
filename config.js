import dotenv from "dotenv";

let enviroment = process.env.NODE_ENV ?? 'development';


dotenv.config({
    path:`.env.${enviroment}.local`,
});

const config = {
    API:{
        PORT:3000 || process.env.API_PORT,
    },
    POSTGRESQL:{
        URI:process.env.POSTGRES_URL
    },
}
export default config;