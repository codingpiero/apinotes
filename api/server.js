import server from "./app.js";
import config from "../config.js";
import log from "./package/log.js";

server.listen(config.API.PORT,()=>{
    log.info( `SERVER START [ENV:${process.env.NODE_ENV?? 'unknown'}]::[PORT:${config.API.PORT ?? 'unknown'}]`);
});