import dotenv from "dotenv";

let enviroment = process.env.NODE_ENV ?? 'development';


dotenv.config({
    path:`.env.${enviroment}.local`,
});

const config = {
    API:{
        PORT: process.env.API_PORT || 3000,
    },
    POSTGRESQL:{
        URI:process.env.POSTGRES_URL
    },
    JWT:{
        SECRET_KEY:process.env.SECRET_KEY
    }
}
export default config;