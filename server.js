import server from "./app.js";
import config from "./config.js";
import log from "./api/lib/log.js";

server.listen(config.API.PORT,()=>{
    log.info(`SERVER START SUCCESSFULLY [PORT:${config.API.PORT}]::[ENV:${process.env.NODE_ENV}]`);
});