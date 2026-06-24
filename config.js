import dotenv from "dotenv";


const enviroment = process.env.NODE_ENV ?? 'development';

dotenv.config({
    path: `.env.${enviroment}.local`,
});

const config = {
    API:{
        PORT:process.env.API_PORT
    },
    JWT:{},
    POSTGRESQL:{},
}

export default config;
